-- Digital-asset top-ups and spend-downs.
-- Additive and idempotent: safe to run more than once in the Supabase SQL editor.
-- Does not drop tables, columns, policies, or existing rows.
--
-- How balances work after this migration
--   stored_assets.balance stays the registered opening balance (登记余额).
--   Existing assets have no linked records, so their current balance does not change.
--   A record may point at an asset with records.asset_flow:
--     topup = a real cash expense. It counts in cash totals and increases the balance.
--     spend = a purchase paid from the asset. It keeps its real category (for example 餐饮),
--             decreases the balance, and is excluded from cash totals.
--   Current balance = opening balance
--                   + sum(topup amounts where deleted_at is null)
--                   - sum(spend amounts where deleted_at is null).
--   Soft-deleted records (deleted_at set) drop out of that sum, which is how edits and
--   deletes give the balance back.

alter table public.records add column if not exists asset_id uuid;
alter table public.records add column if not exists asset_flow text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'records_asset_id_fkey'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_asset_id_fkey
      foreign key (asset_id) references public.stored_assets(id) on delete restrict;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'records_asset_flow_check'
      and conrelid = 'public.records'::regclass
  ) then
    alter table public.records
      add constraint records_asset_flow_check
      check (
        (asset_id is null and asset_flow is null)
        or (
          asset_id is not null
          and asset_flow in ('topup', 'spend')
          and type = 'expense'
        )
      );
  end if;
end
$$;

create index if not exists records_family_asset_idx
  on public.records (family_id, asset_id)
  where asset_id is not null;

comment on column public.stored_assets.balance is
  '登记余额（基数）。当前余额 = 登记余额 + 未删除充值 − 未删除扣款。没有充值/扣款记录时，它仍然就是当前余额。';

comment on column public.records.asset_id is
  '关联的储值/数字资产。为空表示普通现金账。';

comment on column public.records.asset_flow is
  'topup=现金充值，计入现金支出并增加余额；spend=从资产扣款，减少余额且不计入现金支出。';

-- Keep a top-up or deduction inside the same family as the asset.
-- Normal cash records (asset_id is null) are unchanged.
create or replace function public.records_asset_same_family()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.asset_id is null then
    return new;
  end if;

  if not exists (
    select 1
    from public.stored_assets
    where stored_assets.id = new.asset_id
      and stored_assets.family_id = new.family_id
  ) then
    raise exception '充值或扣款必须选择同一个家庭里的数字资产';
  end if;

  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'records_asset_same_family'
      and tgrelid = 'public.records'::regclass
  ) then
    create trigger records_asset_same_family
      before insert or update on public.records
      for each row
      execute function public.records_asset_same_family();
  end if;
end
$$;

-- RLS
-- asset_id and asset_flow live on public.records. RLS is already enabled, and the
-- existing policies already cover every column on that table. This script does not
-- drop or replace them:
--   "Family members can read records"
--   "Family members can insert records"      (created_by = auth.uid(), family member)
--   "Family members can update records"
--   "Family members can delete records"
-- They match the stored_assets policies: the signed-in user must have a
-- family_members row for the record's family_id. Inserts still require
-- created_by = auth.uid(). No new table is created, so no new policy is required.
-- stored_assets policies are unchanged; correcting the opening balance uses the
-- existing "Family members can update stored assets" policy.

notify pgrst, 'reload schema';
