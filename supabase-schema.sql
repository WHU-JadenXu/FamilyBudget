-- This file is idempotent. Existing users can rerun the whole script to add
-- business-trip support, multi-device version/delete fields, indexes, triggers,
-- and RLS policies without clearing existing ledger data.

create table if not exists public.family_members (
  family_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_name text,
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
);

create table if not exists public.stored_assets (
  id uuid primary key,
  family_id text not null,
  name text not null,
  asset_type text not null check (asset_type in ('membership', 'stored_value', 'digital')),
  owner text not null check (owner in ('李逍宇', '徐佳丹', '共同')),
  balance numeric(12, 2) not null default 0 check (balance >= 0),
  note text not null default '',
  balance_updated_on date not null,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade
);

create table if not exists public.business_trips (
  id uuid primary key,
  family_id text not null,
  trip_no text not null,
  traveler text not null check (traveler in ('李逍宇', '徐佳丹')),
  subject text not null,
  destination text not null,
  start_on date not null,
  end_on date,
  daily_allowance numeric(12, 2) not null default 0 check (daily_allowance >= 0),
  status text not null default 'ongoing' check (status in ('ongoing', 'pending', 'reimbursed')),
  reimbursement_amount numeric(12, 2) not null default 0 check (reimbursement_amount >= 0),
  reimbursed_on date,
  expense_total_at_archive numeric(12, 2) not null default 0 check (expense_total_at_archive >= 0),
  allowance_total_at_archive numeric(12, 2) not null default 0 check (allowance_total_at_archive >= 0),
  surplus_at_archive numeric(12, 2) not null default 0,
  settlement_record_id uuid,
  archived_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade,
  unique (family_id, trip_no),
  check (end_on is null or end_on >= start_on),
  check (archived_at is null or status = 'reimbursed')
);

create table if not exists public.records (
  id uuid primary key,
  family_id text not null,
  type text not null check (type in ('expense', 'income')),
  person text not null check (person in ('李逍宇', '徐佳丹')),
  amount numeric(12, 2) not null check (amount > 0),
  benefit text not null default '',
  major text not null,
  minor text not null,
  note text not null default '',
  spent_on date not null,
  trip_id uuid constraint records_trip_id_fkey references public.business_trips(id) on delete restrict,
  trip_role text constraint records_trip_role_check check (trip_role in ('expense', 'reimbursement', 'settlement')),
  trip_linked_at timestamptz,
  trip_original_major text,
  trip_original_minor text,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade,
  constraint records_trip_link_check check (
    (trip_id is null and trip_role is null)
    or (trip_id is not null and trip_role is not null)
  ),
  constraint records_trip_expense_type_check check (
    trip_role is null
    or trip_role = 'settlement'
    or (trip_role = 'expense' and type = 'expense')
    or (trip_role = 'reimbursement' and type = 'income')
  ),
  constraint records_trip_category_check check (
    trip_role is null or trip_role = 'settlement' or major = '出差'
  )
);

alter table public.business_trips add column if not exists deleted_at timestamptz;
alter table public.business_trips add column if not exists updated_at timestamptz;

update public.business_trips
set updated_at = coalesce(updated_at, created_at, now())
where updated_at is null;

alter table public.business_trips alter column updated_at set default now();
alter table public.business_trips alter column updated_at set not null;

alter table public.records add column if not exists trip_id uuid;
alter table public.records add column if not exists trip_role text;
alter table public.records add column if not exists trip_linked_at timestamptz;
alter table public.records add column if not exists trip_original_major text;
alter table public.records add column if not exists trip_original_minor text;
alter table public.records add column if not exists deleted_at timestamptz;
alter table public.records add column if not exists updated_at timestamptz;

update public.records
set updated_at = coalesce(updated_at, created_at, now())
where updated_at is null;

alter table public.records alter column updated_at set default now();
alter table public.records alter column updated_at set not null;

alter table public.records drop constraint if exists records_trip_role_check;
alter table public.records drop constraint if exists records_trip_expense_type_check;
alter table public.records drop constraint if exists records_trip_category_check;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'records_trip_id_fkey'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_trip_id_fkey
      foreign key (trip_id) references public.business_trips(id) on delete restrict;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'records_trip_role_check'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_trip_role_check
      check (trip_role is null or trip_role in ('expense', 'reimbursement', 'settlement'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'records_trip_link_check'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_trip_link_check
      check (
        (trip_id is null and trip_role is null)
        or (trip_id is not null and trip_role is not null)
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'records_trip_expense_type_check'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_trip_expense_type_check
      check (
        trip_role is null
        or trip_role = 'settlement'
        or (trip_role = 'expense' and type = 'expense')
        or (trip_role = 'reimbursement' and type = 'income')
      );
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'records_trip_category_check'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_trip_category_check
      check (trip_role is null or trip_role = 'settlement' or major = '出差');
  end if;
end
$$;

create index if not exists records_family_created_at_idx
  on public.records (family_id, created_at desc);

create index if not exists records_family_updated_at_idx
  on public.records (family_id, updated_at desc);

create index if not exists records_family_trip_idx
  on public.records (family_id, trip_id);

drop index if exists public.records_trip_settlement_unique_idx;
create unique index records_trip_settlement_unique_idx
  on public.records (trip_id)
  where trip_role = 'settlement' and deleted_at is null;

create index if not exists business_trips_family_start_idx
  on public.business_trips (family_id, start_on desc);

create index if not exists stored_assets_family_balance_date_idx
  on public.stored_assets (family_id, balance_updated_on desc);

create or replace function public.set_family_ledger_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists records_set_updated_at on public.records;
create trigger records_set_updated_at
  before update on public.records
  for each row execute function public.set_family_ledger_updated_at();

drop trigger if exists business_trips_set_updated_at on public.business_trips;
create trigger business_trips_set_updated_at
  before update on public.business_trips
  for each row execute function public.set_family_ledger_updated_at();

drop trigger if exists stored_assets_set_updated_at on public.stored_assets;
create trigger stored_assets_set_updated_at
  before update on public.stored_assets
  for each row execute function public.set_family_ledger_updated_at();

alter table public.family_members enable row level security;
alter table public.business_trips enable row level security;
alter table public.records enable row level security;
alter table public.stored_assets enable row level security;

drop policy if exists "Members can read their family membership" on public.family_members;
drop policy if exists "Family members can read business trips" on public.business_trips;
drop policy if exists "Family members can insert business trips" on public.business_trips;
drop policy if exists "Family members can update business trips" on public.business_trips;
drop policy if exists "Family members can delete business trips" on public.business_trips;
drop policy if exists "Family members can read records" on public.records;
drop policy if exists "Family members can insert records" on public.records;
drop policy if exists "Family members can update records" on public.records;
drop policy if exists "Family members can delete records" on public.records;
drop policy if exists "Family members can read stored assets" on public.stored_assets;
drop policy if exists "Family members can insert stored assets" on public.stored_assets;
drop policy if exists "Family members can update stored assets" on public.stored_assets;
drop policy if exists "Family members can delete stored assets" on public.stored_assets;

create policy "Members can read their family membership"
  on public.family_members
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Family members can read business trips"
  on public.business_trips
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = business_trips.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can insert business trips"
  on public.business_trips
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.family_members
      where family_members.family_id = business_trips.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can update business trips"
  on public.business_trips
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = business_trips.family_id
        and family_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = business_trips.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can delete business trips"
  on public.business_trips
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = business_trips.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can read records"
  on public.records
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = records.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can insert records"
  on public.records
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.family_members
      where family_members.family_id = records.family_id
        and family_members.user_id = auth.uid()
    )
    and (
      records.trip_id is null
      or exists (
        select 1
        from public.business_trips
        where business_trips.id = records.trip_id
          and business_trips.family_id = records.family_id
      )
    )
  );

create policy "Family members can update records"
  on public.records
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = records.family_id
        and family_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = records.family_id
        and family_members.user_id = auth.uid()
    )
    and (
      records.trip_id is null
      or exists (
        select 1
        from public.business_trips
        where business_trips.id = records.trip_id
          and business_trips.family_id = records.family_id
      )
    )
  );

create policy "Family members can delete records"
  on public.records
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = records.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can read stored assets"
  on public.stored_assets
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = stored_assets.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can insert stored assets"
  on public.stored_assets
  for insert
  to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1
      from public.family_members
      where family_members.family_id = stored_assets.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can update stored assets"
  on public.stored_assets
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = stored_assets.family_id
        and family_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = stored_assets.family_id
        and family_members.user_id = auth.uid()
    )
  );

create policy "Family members can delete stored assets"
  on public.stored_assets
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.family_members
      where family_members.family_id = stored_assets.family_id
        and family_members.user_id = auth.uid()
    )
  );

-- After each person logs in once, add their user id here.
-- Find user ids in Supabase Dashboard > Authentication > Users.
--
-- insert into public.family_members (family_id, user_id, member_name)
-- values
--   ('li-xu-family', 'PASTE_LI_USER_ID_HERE', '李逍宇'),
--   ('li-xu-family', 'PASTE_XU_USER_ID_HERE', '徐佳丹')
-- on conflict (family_id, user_id) do update
-- set member_name = excluded.member_name;
