create table if not exists public.family_members (
  family_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_name text,
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
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
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade
);

create index if not exists records_family_created_at_idx
  on public.records (family_id, created_at desc);

alter table public.family_members enable row level security;
alter table public.records enable row level security;

drop policy if exists "Members can read their family membership" on public.family_members;
drop policy if exists "Family members can read records" on public.records;
drop policy if exists "Family members can insert records" on public.records;
drop policy if exists "Family members can update records" on public.records;
drop policy if exists "Family members can delete records" on public.records;

create policy "Members can read their family membership"
  on public.family_members
  for select
  to authenticated
  using (user_id = auth.uid());

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

-- After each person logs in once, add their user id here.
-- Find user ids in Supabase Dashboard > Authentication > Users.
--
-- insert into public.family_members (family_id, user_id, member_name)
-- values
--   ('li-xu-family', 'PASTE_LI_USER_ID_HERE', '李逍宇'),
--   ('li-xu-family', 'PASTE_XU_USER_ID_HERE', '徐佳丹')
-- on conflict (family_id, user_id) do update
-- set member_name = excluded.member_name;
