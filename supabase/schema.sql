create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('creator','brand')),
  full_name text,
  email text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  handle text, category text, youtube_url text, instagram_url text,
  x_url text, portfolio_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.brand_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  company_name text not null, website_url text, industry text,
  logo_url text, description text,
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.profiles(id) on delete cascade,
  title text not null, description text, budget numeric(12,2) default 0,
  category text, platform text, location text, requirements text,
  deadline date,
  status text not null default 'open' check (status in ('draft','open','closed','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaign_applications (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  pitch text,
  status text not null default 'pending'
    check (status in ('pending','accepted','rejected','withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(campaign_id, creator_id)
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  creator_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (campaign_id is not null or creator_id is not null)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null, message text, read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists campaigns_brand_id_idx on public.campaigns(brand_id);
create index if not exists campaigns_status_idx on public.campaigns(status);
create index if not exists applications_campaign_id_idx on public.campaign_applications(campaign_id);
create index if not exists applications_creator_id_idx on public.campaign_applications(creator_id);

alter table public.profiles enable row level security;
alter table public.creator_profiles enable row level security;
alter table public.brand_profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_applications enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (auth.uid()=id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert to authenticated with check (auth.uid()=id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);

drop policy if exists creator_profiles_select_authenticated on public.creator_profiles;
create policy creator_profiles_select_authenticated on public.creator_profiles for select to authenticated using (true);
drop policy if exists creator_profiles_insert_own on public.creator_profiles;
create policy creator_profiles_insert_own on public.creator_profiles for insert to authenticated with check (auth.uid()=id);
drop policy if exists creator_profiles_update_own on public.creator_profiles;
create policy creator_profiles_update_own on public.creator_profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);

drop policy if exists brand_profiles_select_authenticated on public.brand_profiles;
create policy brand_profiles_select_authenticated on public.brand_profiles for select to authenticated using (true);
drop policy if exists brand_profiles_insert_own on public.brand_profiles;
create policy brand_profiles_insert_own on public.brand_profiles for insert to authenticated with check (auth.uid()=id);
drop policy if exists brand_profiles_update_own on public.brand_profiles;
create policy brand_profiles_update_own on public.brand_profiles for update to authenticated using (auth.uid()=id) with check (auth.uid()=id);

drop policy if exists campaigns_select_open on public.campaigns;
create policy campaigns_select_open on public.campaigns for select to authenticated using (status='open' or auth.uid()=brand_id);
drop policy if exists campaigns_insert_brand on public.campaigns;
create policy campaigns_insert_brand on public.campaigns for insert to authenticated with check (
  auth.uid()=brand_id and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='brand')
);
drop policy if exists campaigns_update_brand on public.campaigns;
create policy campaigns_update_brand on public.campaigns for update to authenticated using (auth.uid()=brand_id) with check (auth.uid()=brand_id);
drop policy if exists campaigns_delete_brand on public.campaigns;
create policy campaigns_delete_brand on public.campaigns for delete to authenticated using (auth.uid()=brand_id);

drop policy if exists applications_insert_creator on public.campaign_applications;
create policy applications_insert_creator on public.campaign_applications for insert to authenticated with check (
  auth.uid()=creator_id and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='creator')
);
drop policy if exists applications_select_participants on public.campaign_applications;
create policy applications_select_participants on public.campaign_applications for select to authenticated using (
  auth.uid()=creator_id or exists(select 1 from public.campaigns c where c.id=campaign_id and c.brand_id=auth.uid())
);
drop policy if exists applications_update_participants on public.campaign_applications;
create policy applications_update_participants on public.campaign_applications for update to authenticated using (
  auth.uid()=creator_id or exists(select 1 from public.campaigns c where c.id=campaign_id and c.brand_id=auth.uid())
) with check (
  auth.uid()=creator_id or exists(select 1 from public.campaigns c where c.id=campaign_id and c.brand_id=auth.uid())
);

drop policy if exists favorites_own on public.favorites;
create policy favorites_own on public.favorites for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
drop policy if exists notifications_own on public.notifications;
create policy notifications_own on public.notifications for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,role,full_name,email)
  values(new.id,coalesce(new.raw_user_meta_data->>'role','creator'),
         coalesce(new.raw_user_meta_data->>'full_name',''),new.email)
  on conflict(id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
