insert into storage.buckets (id, name, public) values ('files','files',false), ('app','app',true) on conflict (id) do nothing;
create table if not exists public.admin_config (id text not null, value text not null, updated_at timestamp with time zone default now(), constraint admin_config_pkey PRIMARY KEY (id));
create table if not exists public.app_files (path text not null, content_type text not null, data text not null, size integer not null default 0, build text, updated_at timestamp with time zone default now(), constraint app_files_pkey PRIMARY KEY (path));
create table if not exists public.app_stage (path text not null, build text not null, seq integer not null, chunk text not null, created_at timestamp with time zone not null default now(), constraint app_stage_pkey PRIMARY KEY (path, build, seq));
create table if not exists public.backups (id bigserial not null, slot text not null, taken_at timestamp with time zone not null default now(), docs_count integer not null default 0, note text, data jsonb not null, constraint backups_pkey PRIMARY KEY (id));
create table if not exists public.docs (col text not null, id text not null, data jsonb not null default '{}'::jsonb, month text generated always as (data ->> 'month'::text) stored, updated_at timestamp with time zone not null default now(), updated_by uuid, constraint docs_pkey PRIMARY KEY (col, id));
create table if not exists public.gps_config (id text not null, account text not null, password text not null, api_base text default 'http://api.etrack.vip/api'::text, bridge_key text not null, access_token text, token_expires_at timestamp with time zone, updated_at timestamp with time zone default now(), constraint gps_config_pkey PRIMARY KEY (id));
create table if not exists public.nf_flags (key text not null, value jsonb not null default '{}'::jsonb, updated_at timestamp with time zone not null default now(), constraint nf_flags_pkey PRIMARY KEY (key));
create table if not exists public.profiles (uid uuid not null, role text not null default 'employee'::text, person_id text, dept_id text, login text, name text, created_at timestamp with time zone not null default now(), constraint profiles_pkey PRIMARY KEY (uid));
create table if not exists public.vehicle_positions (id bigserial not null, imei text not null, lat double precision not null, lng double precision not null, speed real, course real, gps_at timestamp with time zone, fetched_at timestamp with time zone default now(), raw jsonb, constraint vehicle_positions_pkey PRIMARY KEY (id));
alter table profiles add constraint profiles_uid_fkey FOREIGN KEY (uid) REFERENCES auth.users(id) ON DELETE CASCADE;
CREATE INDEX docs_col_month_idx ON public.docs USING btree (col, month);
CREATE UNIQUE INDEX vehicle_positions_imei_gps_at ON public.vehicle_positions USING btree (imei, gps_at);
create or replace view public.docs_safe as  SELECT col,
    id,
    (((((((((((((((((data - 'dailyWage'::text) - 'basic'::text) - 'allowances'::text) - 'healthIns'::text) - 'salt'::text) - 'passHash'::text) - 'pinHash'::text) - 'actCodeHash'::text) - 'actCodeExp'::text) - 'face'::text) - 'deviceCred'::text) - 'nationalId'::text) - 'phone'::text) - 'workPhone'::text) - 'bankAccount'::text) - 'notes'::text) || jsonb_build_object('safe', true)) AS data
   FROM docs
  WHERE ((col = 'workers'::text) AND (COALESCE((data ->> 'status'::text), 'active'::text) <> 'inactive'::text));
CREATE OR REPLACE FUNCTION public.nf_brand_ok(p_col text, p_data jsonb)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select case
    when public.nf_crm_brands() is null then true
    when p_col in ('leads', 'quotations', 'invoices') then coalesce(p_data->>'brandId', 'lof') = any(public.nf_crm_brands())
    when p_col = 'orders' then (public.nf_role() <> 'bdd') or coalesce(p_data->>'brandId', '') = any(public.nf_crm_brands())
    when p_col = 'clients' then (p_data->>'brandId') is null or (p_data->>'brandId') = any(public.nf_crm_brands())
    when p_col = 'products' then (public.nf_role() <> 'bdd') or coalesce(p_data->>'brandId', '') = any(public.nf_crm_brands())
    else true end
$function$
;
CREATE OR REPLACE FUNCTION public.nf_can_write(p_col text, p_id text, p_data jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r text; me text; wid text; party boolean;
begin
  r := public.nf_role(); me := public.nf_person_id(); wid := public.nf_worker_id();
  if r is null or r = 'none' then return false; end if;
  if r = 'admin' then return true; end if;
  if p_col in ('changes', 'trash') then return true; end if;
  if p_col in ('leads', 'quotations', 'invoices', 'orders', 'clients') and not public.nf_brand_ok(p_col, p_data) then return false; end if;
  if p_col = 'workers' and wid is not null and p_id = wid then return true; end if;
  if p_col = 'attendance' and wid is not null and coalesce(p_data->>'deptId', '') = coalesce(public.nf_dept(), '') then return true; end if;
  party := p_col = 'tasks' and (
      p_data->>'assigneeId' = wid or p_data->>'createdBy' = me or p_data->>'assigneeId' = me
      or exists (select 1 from jsonb_array_elements(coalesce(p_data->'participants', '[]'::jsonb)) x where x->>'id' in (wid, me))
      or exists (select 1 from jsonb_array_elements(coalesce(p_data->'thread', '[]'::jsonb)) x where x->>'by' in (wid, me)));
  if party then return true; end if;
  if r = 'hr' then return p_col not in ('quotations'); end if;
  if r = 'office' then return p_col not in ('payrolls', 'advances', 'settings'); end if;
  if r = 'bdd' then return p_col in ('leads', 'clients', 'quotations', 'invoices', 'orders', 'tasks', 'requests', 'files'); end if;
  if r = 'manager' then return p_col in ('orders', 'attendance', 'requests', 'tasks', 'movements', 'materials', 'trips', 'vehicles', 'purchases', 'suppliers', 'extorders', 'files', 'penalties', 'sites', 'workers'); end if;
  if r = 'vice' then return p_col in ('tasks', 'requests', 'files'); end if;
  if r = 'acc' then return p_col in ('quotations', 'invoices', 'orders', 'requests', 'expenses', 'purchases', 'suppliers', 'extorders', 'tasks', 'files', 'clients', 'advances', 'leads'); end if;
  if r = 'purch' then return p_col in ('purchases', 'suppliers', 'materials', 'movements', 'extorders', 'servfactories', 'tasks', 'requests', 'files', 'trips'); end if;
  if r = 'store' then return p_col in ('movements', 'materials', 'purchases', 'tasks', 'requests', 'files'); end if;
  if r = 'tech' then return p_col in ('products', 'files', 'tasks', 'orders', 'requests'); end if;
  if r = 'head' then return p_col in ('orders', 'attendance', 'requests', 'penalties', 'tasks', 'movements', 'materials', 'workers', 'files', 'purchases'); end if;
  if r = 'fleet' then return p_col in ('trips', 'vehicles', 'tasks', 'requests', 'files'); end if;
  if r = 'driver' then
    return (p_col = 'trips' and p_data->>'driverId' = wid)
        or (p_col = 'requests' and p_data->>'workerId' = wid)
        or (p_col = 'files' and coalesce(p_data->>'byId', '') = me);
  end if;
  if r = 'kiosk' then return p_col in ('attendance', 'requests'); end if;
  return (p_col = 'requests' and (p_data->>'workerId' = wid or p_data->>'requesterId' in (wid, me)))
      or (p_col = 'files' and coalesce(p_data->>'byId', '') = me);
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_check_code(p_login text, p_code text)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r record; v_role text;
begin
  select * into r from public.nf_find_person(p_login);
  if r is null then return 'not_found'; end if;
  v_role := coalesce(r.data->>'role', case when r.col = 'staff' then 'viewer' else 'none' end);
  if r.col = 'workers' and (v_role = '' or v_role = 'none') then return 'no_access'; end if;
  if not public.nf_code_ok(r.id, p_code, r.data) then return 'bad_code'; end if;
  if exists (select 1 from public.profiles p where p.person_id = case when r.col = 'workers' then 'w:' || r.id else r.id end) then return 'reset'; end if;
  return 'ok';
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_client_confirm(p_token text, p_result text, p_note text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare o record;
begin
  if p_result not in ('ok', 'install', 'product') then return false; end if;
  select id, data into o from public.docs where col = 'orders' and data->>'confirmToken' = p_token and data->>'status' = 'delivered' and data->'clientConfirm' is null limit 1;
  if not found then return false; end if;
  update public.docs set data = data || jsonb_build_object('clientConfirm', jsonb_build_object('result', p_result, 'note', left(coalesce(p_note, ''), 500), 'at', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 'via', 'رابط واتساب', 'by', 'العميل')) where col = 'orders' and id = o.id;
  insert into public.docs (col, id, data) values ('tasks', 'cc_' || o.id, jsonb_build_object('id', 'cc_' || o.id, 'title', case when p_result = 'install' then 'شكوى عميل — مشكلة من فريق التركيب: ' else 'شكوى عميل — مشكلة في المنتج: ' end || (o.data->>'code'), 'desc', coalesce(p_note, ''), 'deptId', case when p_result = 'install' then null else 'tech' end, 'toRole', case when p_result = 'product' then 'tech' else 'manager' end, 'orderId', o.id, 'priority', 'urgent', 'status', 'open', 'kind', 'task', 'source', 'clientconfirm', 'createdByName', 'العميل — تأكيد الاستلام', 'createdAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')))
    on conflict (col, id) do nothing;
  return true;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_code_ok(p_id text, p_code text, p_data jsonb)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public', 'extensions'
AS $function$
  select coalesce(p_data->>'actCodeHash', '') <> ''
     and p_data->>'actCodeHash' = encode(digest('nf:' || p_id || ':' || p_code, 'sha256'), 'hex')
     and (coalesce(p_data->>'actCodeExp', '') = '' or (p_data->>'actCodeExp')::timestamptz > now())
$function$
;
CREATE OR REPLACE FUNCTION public.nf_crm_brands()
 RETURNS text[]
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r text; pid text; rec jsonb; arr text[]; d text;
begin
  r := public.nf_role(); if r is null or r = 'admin' then return null; end if;
  select person_id into pid from public.profiles where uid = auth.uid();
  if pid is null then return null; end if;
  if pid like 'w:%' then select data into rec from public.docs where col = 'workers' and id = substr(pid, 3);
  else select data into rec from public.docs where col = 'staff' and id = pid; end if;
  if rec is not null and jsonb_typeof(rec->'crmBrands') = 'array' and jsonb_array_length(rec->'crmBrands') > 0 then
    select array_agg(x) into arr from jsonb_array_elements_text(rec->'crmBrands') x; return arr;
  end if;
  if r = 'bdd' then
    select coalesce(data->'crm'->>'brandId', 'lof') into d from public.docs where col = 'settings' and id = 'general';
    return array[coalesce(d, 'lof')];
  end if;
  return null;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_dept()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select dept_id from public.profiles where uid = auth.uid()
$function$
;
CREATE OR REPLACE FUNCTION public.nf_docs_touch()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_find_person(p_login text)
 RETURNS TABLE(col text, id text, data jsonb)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select d.col, d.id, d.data from public.docs d
  where d.col in ('workers', 'staff')
    and (
      lower(d.data->>'username') = lower(p_login)
      or (length(regexp_replace(p_login, '\D', '', 'g')) >= 8 and (
            public.nf_norm_phone(d.data->>'phone') = public.nf_norm_phone(p_login)
         or public.nf_norm_phone(d.data->>'workPhone') = public.nf_norm_phone(p_login)))
    )
    and coalesce(d.data->>'status', 'active') not in ('inactive', 'suspended')
    and coalesce(d.data->>'active', 'true') <> 'false'
  order by case when d.col = 'staff' then 0 else 1 end
  limit 1
$function$
;
CREATE OR REPLACE FUNCTION public.nf_freeze_info()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce((select value - 'hash' - 'code' from public.nf_flags where key = 'freeze'), '{"on":false}'::jsonb)
$function$
;
CREATE OR REPLACE FUNCTION public.nf_frozen()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select coalesce((select (value->>'on')::boolean from public.nf_flags where key = 'freeze'), false)
$function$
;
CREATE OR REPLACE FUNCTION public.nf_guard_attendance()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r text; wid text; d text; k text; oldrows jsonb; newrows jsonb;
begin
  if new.col <> 'attendance' or auth.uid() is null then return new; end if;
  r := coalesce(public.nf_role(), '');
  if r in ('admin', 'hr', 'office', 'head', 'manager', 'kiosk') then return new; end if;
  wid := public.nf_worker_id(); if wid is null then raise exception 'not allowed' using errcode = '42501'; end if;
  oldrows := coalesce(case when tg_op = 'UPDATE' then old.data->'rows' end, '{}'::jsonb); newrows := coalesce(new.data->'rows', '{}'::jsonb);
  for d in select jsonb_object_keys(newrows) union select jsonb_object_keys(oldrows) loop
    for k in select jsonb_object_keys(coalesce(newrows->d, '{}'::jsonb)) union select jsonb_object_keys(coalesce(oldrows->d, '{}'::jsonb)) loop
      if k <> wid and (coalesce(newrows->d->k, 'null'::jsonb) is distinct from coalesce(oldrows->d->k, 'null'::jsonb)) then
        raise exception 'not allowed: attendance of another worker' using errcode = '42501';
      end if;
    end loop;
  end loop;
  return new;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_guard_worker_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare k text; r text;
begin
  if new.col <> 'workers' or auth.uid() is null then return new; end if;
  r := coalesce(public.nf_role(), '');
  if r in ('admin', 'hr', 'office') then return new; end if;
  foreach k in array array['role', 'status', 'deptId', 'deptIds', 'managerId', 'dailyWage', 'salary', 'wage', 'code', 'phone', 'workPhone', 'username', 'jobId', 'trade', 'joined', 'contract', 'perms', 'permissions', 'kpi', 'evals', 'sbUid', 'actCodeHash', 'actCodeExp', 'passHash', 'salt', 'pinHash', 'brands', 'punchAt', 'siteIds'] loop
    if coalesce(old.data->k, 'null'::jsonb) is distinct from coalesce(new.data->k, 'null'::jsonb) then
      if r in ('head', 'manager') and k in ('deptId', 'managerId', 'trade', 'jobId', 'status', 'evals', 'kpi') then continue; end if;
      raise exception 'not allowed: field % is protected', k using errcode = '42501';
    end if;
  end loop;
  return new;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_login text; v_code text; r record; v_role text; v_person text; v_boot boolean;
begin
  v_login := lower(coalesce(new.raw_user_meta_data->>'login', split_part(coalesce(new.email, ''), '@', 1)));
  v_code := coalesce(new.raw_user_meta_data->>'code', '');
  v_boot := not exists (select 1 from public.profiles);
  if v_boot then
    insert into public.profiles (uid, role, person_id, dept_id, login, name) values (new.id, 'admin', null, null, v_login, coalesce(new.raw_user_meta_data->>'name', 'المدير'));
    return new;
  end if;
  select * into r from public.nf_find_person(v_login);
  if r is null then raise exception 'NF_NOT_FOUND'; end if;
  if not public.nf_code_ok(r.id, v_code, r.data) then raise exception 'NF_BAD_CODE'; end if;
  v_role := coalesce(nullif(r.data->>'role', ''), case when r.col = 'staff' then 'viewer' else 'none' end);
  if r.col = 'workers' and v_role = 'none' then raise exception 'NF_NO_ACCESS'; end if;
  v_person := case when r.col = 'workers' then 'w:' || r.id else r.id end;
  delete from public.profiles where person_id = v_person;
  insert into public.profiles (uid, role, person_id, dept_id, login, name) values (new.id, v_role, v_person, r.data->>'deptId', v_login, r.data->>'name');
  update public.docs set data = (data - 'actCodeHash' - 'actCodeExp' - 'passHash' - 'salt' - 'pinHash') || jsonb_build_object('sbUid', new.id::text, 'activatedAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 'activatedBy', 'code', 'passSetAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'))
    where col = r.col and id = r.id;
  return new;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_jsonb_deep_merge(a jsonb, b jsonb)
 RETURNS jsonb
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select case
    when jsonb_typeof(a) = 'object' and jsonb_typeof(b) = 'object' then
      (select coalesce(jsonb_object_agg(k, case when (a ? k) and (b ? k) then public.nf_jsonb_deep_merge(a->k, b->k) when b ? k then b->k else a->k end), '{}'::jsonb)
         from (select jsonb_object_keys(a) as k union select jsonb_object_keys(b)) ks)
    else coalesce(b, a) end
$function$
;
CREATE OR REPLACE FUNCTION public.nf_needs_bootstrap()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select not exists (select 1 from public.profiles)
$function$
;
CREATE OR REPLACE FUNCTION public.nf_norm_phone(p text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
declare d text;
begin
  d := regexp_replace(coalesce(p, ''), '\D', '', 'g');
  if d = '' then return ''; end if;
  if d like '0020%' then d := '0' || substr(d, 5);
  elsif d like '20%' and length(d) >= 12 then d := '0' || substr(d, 3);
  end if;
  return d;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_patch_doc(p_col text, p_id text, p_patch jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare cur jsonb; merged jsonb;
begin
  if auth.uid() is null or public.nf_role() is null then raise exception 'forbidden' using errcode = '42501'; end if;
  select data into cur from public.docs where col = p_col and id = p_id for update;
  merged := public.nf_jsonb_deep_merge(coalesce(cur, jsonb_build_object('id', p_id)), p_patch);
  if not public.nf_can_write(p_col, p_id, merged) then raise exception 'forbidden' using errcode = '42501'; end if;
  if cur is null then insert into public.docs (col, id, data) values (p_col, p_id, merged);
  else update public.docs set data = merged where col = p_col and id = p_id; end if;
  return merged;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_person_id()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select person_id from public.profiles where uid = auth.uid()
$function$
;
CREATE OR REPLACE FUNCTION public.nf_request_reset(p_login text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare r record; v_id text;
begin
  select * into r from public.nf_find_person(p_login);
  if r is null then return 'not_found'; end if;
  if r.col <> 'workers' then return 'ok'; end if;
  if exists (select 1 from public.docs d where d.col = 'requests' and d.data->>'type' = 'password' and d.data->>'workerId' = r.id and d.data->>'status' = 'pending') then return 'ok'; end if;
  v_id := 'pwreq_' || r.id || '_' || to_char(now(), 'YYYYMMDDHH24MISS');
  insert into public.docs (col, id, data) values ('requests', v_id, jsonb_build_object(
    'id', v_id, 'type', 'password', 'workerId', r.id, 'deptId', r.data->>'deptId', 'status', 'pending', 'verified', 'none', 'channel', 'app',
    'reason', 'طلب إعادة ضبط كلمة السر من شاشة الدخول', 'createdBy', 'w:' || r.id, 'createdByName', coalesce(r.data->>'name', ''), 'createdAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')));
  return 'ok';
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_reset_password(p_login text, p_code text, p_password text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions', 'auth'
AS $function$
declare r record; v_person text; v_uid uuid;
begin
  select * into r from public.nf_find_person(p_login);
  if r is null then return 'not_found'; end if;
  if not public.nf_code_ok(r.id, p_code, r.data) then return 'bad_code'; end if;
  if length(coalesce(p_password, '')) < 6 then return 'bad_password'; end if;
  v_person := case when r.col = 'workers' then 'w:' || r.id else r.id end;
  select uid into v_uid from public.profiles where person_id = v_person limit 1;
  if v_uid is null then return 'signup'; end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where id = v_uid;
  update public.docs set data = (data - 'actCodeHash' - 'actCodeExp') || jsonb_build_object('passSetAt', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')) where col = r.col and id = r.id;
  return 'ok';
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_restore_backup(p_id bigint)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare n int := 0; r record;
begin
  if coalesce(public.nf_role(), '') <> 'admin' then raise exception 'not allowed'; end if;
  perform public.nf_take_backup('pre-restore', 'قبل الاستعادة من #' || p_id);
  for r in select e->>'col' as col, e->>'id' as id, e->'data' as data from public.backups b, jsonb_array_elements(b.data) e where b.id = p_id loop
    insert into public.docs (col, id, data) values (r.col, r.id, r.data) on conflict (col, id) do update set data = excluded.data;
    n := n + 1;
  end loop;
  return n;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_revoke_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
declare v_person text;
begin
  if old.col not in ('workers', 'staff') then return old; end if;
  v_person := case when old.col = 'workers' then 'w:' || old.id else old.id end;
  update auth.users u set banned_until = '2999-12-31 00:00:00+00'::timestamptz, updated_at = now() from public.profiles p where p.uid = u.id and p.person_id = v_person;
  delete from public.profiles where person_id = v_person;
  return old;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_role()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select case when public.nf_frozen() then null else public.nf_role_raw() end
$function$
;
CREATE OR REPLACE FUNCTION public.nf_role_raw()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select case
    when p.person_id is null then p.role
    when p.role is null or p.role = 'none' then null
    when p.person_id like 'w:%' then (
      select case when coalesce(d.data->>'status', 'active') not in ('inactive', 'suspended') and coalesce(nullif(d.data->>'role', ''), 'none') <> 'none' then p.role else null end
      from public.docs d where d.col = 'workers' and d.id = substr(p.person_id, 3) limit 1)
    else (
      select case when coalesce(d.data->>'active', 'true') <> 'false' then p.role else null end
      from public.docs d where d.col = 'staff' and d.id = p.person_id limit 1)
  end
  from public.profiles p where p.uid = auth.uid()
$function$
;
CREATE OR REPLACE FUNCTION public.nf_set_cctv_key(p_key text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if nf_role() is distinct from 'admin' then raise exception 'admin only'; end if;
  if p_key is null or length(p_key) < 24 then raise exception 'weak key'; end if;
  insert into admin_config(id, value) values ('cctv_key', p_key) on conflict (id) do update set value = excluded.value;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_sync_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
declare v_person text; v_role text; v_live boolean;
begin
  if new.col not in ('workers', 'staff') then return new; end if;
  v_person := case when new.col = 'workers' then 'w:' || new.id else new.id end;
  v_role := coalesce(nullif(new.data->>'role', ''), case when new.col = 'staff' then 'viewer' else 'none' end);
  v_live := case when new.col = 'workers' then coalesce(new.data->>'status', 'active') not in ('inactive', 'suspended') and v_role <> 'none' else coalesce(new.data->>'active', 'true') <> 'false' end;
  update public.profiles set role = v_role, dept_id = new.data->>'deptId', name = new.data->>'name' where person_id = v_person;
  update auth.users u set banned_until = case when v_live then null else '2999-12-31 00:00:00+00'::timestamptz end, updated_at = now()
    from public.profiles p where p.uid = u.id and p.person_id = v_person
      and (u.banned_until is null or u.banned_until < now()) <> v_live;
  return new;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_take_backup(p_slot text DEFAULT 'manual'::text, p_note text DEFAULT NULL::text)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare v_id bigint;
begin
  if current_user <> 'postgres' and coalesce(public.nf_role(), '') not in ('admin', 'hr') then raise exception 'not allowed'; end if;
  insert into public.backups (slot, note, docs_count, data)
    select p_slot, p_note, count(*), coalesce(jsonb_agg(jsonb_build_object('col', col, 'id', id, 'data', data)), '[]'::jsonb) from public.docs
    returning id into v_id;
  delete from public.backups where id not in (select id from public.backups order by taken_at desc limit 90);
  return v_id;
end $function$
;
CREATE OR REPLACE FUNCTION public.nf_worker_id()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select case when person_id like 'w:%' then substr(person_id, 3) else null end from public.profiles where uid = auth.uid()
$function$
;
CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;
CREATE TRIGGER docs_guard_attendance BEFORE INSERT OR UPDATE ON public.docs FOR EACH ROW EXECUTE FUNCTION nf_guard_attendance();
CREATE TRIGGER docs_guard_worker BEFORE UPDATE ON public.docs FOR EACH ROW EXECUTE FUNCTION nf_guard_worker_fields();
CREATE TRIGGER docs_revoke_profile AFTER DELETE ON public.docs FOR EACH ROW EXECUTE FUNCTION nf_revoke_profile();
CREATE TRIGGER docs_sync_profile AFTER INSERT OR UPDATE ON public.docs FOR EACH ROW EXECUTE FUNCTION nf_sync_profile();
CREATE TRIGGER docs_touch BEFORE INSERT OR UPDATE ON public.docs FOR EACH ROW EXECUTE FUNCTION nf_docs_touch();
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION nf_handle_new_user();
alter table public.admin_config enable row level security;
alter table public.app_files enable row level security;
alter table public.app_stage enable row level security;
alter table public.backups enable row level security;
alter table public.docs enable row level security;
alter table public.gps_config enable row level security;
alter table public.nf_flags enable row level security;
alter table public.profiles enable row level security;
alter table public.vehicle_positions enable row level security;
create policy backups_read on public.backups as permissive for SELECT to authenticated using ((nf_role() = ANY (ARRAY['admin'::text, 'hr'::text])));
create policy docs_delete on public.docs as permissive for DELETE to authenticated using (nf_can_write(col, id, data));
create policy docs_insert on public.docs as permissive for INSERT to authenticated with check (nf_can_write(col, id, data));
create policy docs_select on public.docs as permissive for SELECT to authenticated using (((nf_role() IS NOT NULL) AND nf_brand_ok(col, data) AND
CASE col
    WHEN 'payrolls'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text]))
    WHEN 'advances'::text THEN ((nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'acc'::text])) OR ((data ->> 'workerId'::text) = nf_worker_id()))
    WHEN 'penalties'::text THEN ((nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'acc'::text, 'head'::text, 'manager'::text, 'vice'::text])) OR ((data ->> 'workerId'::text) = nf_worker_id()))
    WHEN 'expenses'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'acc'::text, 'office'::text]))
    WHEN 'airuns'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'office'::text, 'manager'::text, 'vice'::text, 'head'::text]))
    WHEN 'quotations'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'viewer'::text, 'hr'::text, 'acc'::text, 'bdd'::text]))
    WHEN 'invoices'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'hr'::text, 'acc'::text, 'bdd'::text, 'vice'::text]))
    WHEN 'leads'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'hr'::text, 'vice'::text, 'bdd'::text, 'acc'::text]))
    WHEN 'workers'::text THEN ((nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'office'::text, 'kiosk'::text])) OR (id = nf_worker_id()))
    WHEN 'backups'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text]))
    WHEN 'pushsubs'::text THEN false
    WHEN 'cctv'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'manager'::text, 'vice'::text, 'head'::text]))
    WHEN 'cctvday'::text THEN (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'manager'::text, 'vice'::text, 'head'::text]))
    ELSE true
END));
create policy docs_update on public.docs as permissive for UPDATE to authenticated using (nf_can_write(col, id, data)) with check (nf_can_write(col, id, data));
create policy files_delete on storage.objects as permissive for DELETE to authenticated using (((bucket_id = 'files'::text) AND (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'tech'::text]))));
create policy files_read on storage.objects as permissive for SELECT to authenticated using (((bucket_id = 'files'::text) AND (nf_role() IS NOT NULL) AND ((name !~~ 'cad/%'::text) OR (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'tech'::text])))));
create policy files_update on storage.objects as permissive for UPDATE to authenticated using (((bucket_id = 'files'::text) AND (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text, 'office'::text, 'head'::text, 'tech'::text, 'manager'::text])) AND ((name !~~ 'cad/%'::text) OR (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'tech'::text]))))) with check (((bucket_id = 'files'::text) AND ((name !~~ 'cad/%'::text) OR (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'tech'::text])))));
create policy files_write on storage.objects as permissive for INSERT to authenticated with check (((bucket_id = 'files'::text) AND (COALESCE(nf_role(), ''::text) <> ALL (ARRAY['viewer'::text, 'kiosk'::text, ''::text])) AND ((name !~~ 'cad/%'::text) OR (nf_role() = ANY (ARRAY['admin'::text, 'office'::text, 'tech'::text])))));
create policy profiles_self on public.profiles as permissive for SELECT to authenticated using (((nf_role() IS NOT NULL) AND ((uid = auth.uid()) OR (nf_role() = ANY (ARRAY['admin'::text, 'hr'::text])))));
create policy "authenticated read positions" on public.vehicle_positions as permissive for SELECT to authenticated using (true);
grant TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES on public.admin_config to anon;
grant TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES on public.admin_config to authenticated;
grant TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT, INSERT on public.admin_config to service_role;
grant INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT on public.app_files to anon;
grant TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT, INSERT on public.app_files to authenticated;
grant TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT, INSERT on public.app_files to service_role;
grant TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT, INSERT on public.app_stage to service_role;
grant TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES on public.backups to anon;
grant INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on public.backups to authenticated;
grant TRIGGER, REFERENCES, INSERT, SELECT, UPDATE, DELETE, TRUNCATE on public.backups to service_role;
grant INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on public.docs to anon;
grant INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on public.docs to authenticated;
grant INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT on public.docs to service_role;
grant INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT on public.docs_safe to anon;
grant TRIGGER, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, INSERT on public.docs_safe to authenticated;
grant SELECT, INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE on public.docs_safe to service_role;
grant INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER on public.gps_config to anon;
grant INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT on public.gps_config to authenticated;
grant REFERENCES, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, TRIGGER on public.gps_config to service_role;
grant INSERT, TRIGGER, REFERENCES, TRUNCATE, DELETE, UPDATE, SELECT on public.nf_flags to service_role;
grant TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES on public.profiles to anon;
grant TRUNCATE, TRIGGER, INSERT, SELECT, UPDATE, DELETE, REFERENCES on public.profiles to authenticated;
grant REFERENCES, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, TRIGGER on public.profiles to service_role;
grant REFERENCES, TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE on public.vehicle_positions to anon;
grant TRIGGER, INSERT, SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES on public.vehicle_positions to authenticated;
grant TRIGGER, REFERENCES, TRUNCATE, INSERT, DELETE, UPDATE, SELECT on public.vehicle_positions to service_role;