-- BRANSOL — Run this in Supabase SQL Editor to create all tables
-- Dashboard → SQL Editor → New query → Paste → Run

-- Organisations (clients)
create table if not exists organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  email text,
  sector text,
  status text default 'pending',
  tier text,
  mrr numeric,
  vat_number text,
  address text,
  renewal_date date,
  joined_date date,
  created_at timestamptz default now()
);

-- Users (linked to Supabase Auth)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  role text not null default 'client',
  organisation_id uuid references organisations,
  avatar text,
  created_at timestamptz default now()
);

-- Auto-create profile when someone signs up (so you get a row and can set role to admin later)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'client'
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(profiles.name, excluded.name);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: create profiles for any existing auth users that don't have one
insert into public.profiles (id, email, name, role)
select id, email, coalesce(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), 'client'
from auth.users
on conflict (id) do nothing;

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  title text not null,
  scope text,
  status text default 'active',
  progress int default 0,
  milestone text,
  due_date date,
  started_date date,
  color text default 'var(--iris)',
  created_at timestamptz default now()
);

create table if not exists project_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  label text not null,
  phase_date text,
  done boolean default false,
  active boolean default false,
  sort_order int default 0
);

create table if not exists project_team (
  project_id uuid references projects on delete cascade,
  profile_id uuid references profiles on delete cascade,
  primary key (project_id, profile_id)
);

-- Deliverables
create table if not exists deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  organisation_id uuid references organisations,
  name text not null,
  file_type text,
  file_size text,
  file_url text,
  version text default 'v1.0',
  uploaded_by uuid references profiles,
  note text,
  status text default 'review',
  approved_date date,
  created_at timestamptz default now()
);

create table if not exists deliverable_comments (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid references deliverables on delete cascade,
  author_id uuid references profiles,
  text text not null,
  created_at timestamptz default now()
);

-- Invoices
create table if not exists invoices (
  id text primary key,
  organisation_id uuid references organisations,
  status text default 'pending',
  date date,
  due_date date,
  notes text,
  created_by uuid references profiles,
  created_at timestamptz default now()
);

create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id text references invoices on delete cascade,
  name text not null,
  description text,
  quantity int default 1,
  rate numeric not null,
  sort_order int default 0
);

-- Quotes
create table if not exists quotes (
  id text primary key,
  organisation_id uuid references organisations,
  status text default 'open',
  date date,
  valid_until date,
  estimated_start text,
  estimated_duration text,
  scope_title text,
  scope_description text,
  notes text,
  accepted_by text,
  accepted_at timestamptz,
  created_by uuid references profiles,
  created_at timestamptz default now()
);

create table if not exists quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id text references quotes on delete cascade,
  name text not null,
  description text,
  quantity int default 1,
  rate numeric not null,
  optional boolean default false,
  sort_order int default 0
);

create table if not exists quote_scope (
  id uuid primary key default gen_random_uuid(),
  quote_id text references quotes on delete cascade,
  type text not null,
  text text not null,
  sort_order int default 0
);

-- Files (client uploads)
create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  project_id uuid references projects,
  name text not null,
  file_type text,
  file_size text,
  file_url text,
  uploaded_by uuid references profiles,
  created_at timestamptz default now()
);

-- Activity feed
create table if not exists activity (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  text text not null,
  actor_id uuid references profiles,
  created_at timestamptz default now()
);

-- Internal notes
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  author_id uuid references profiles,
  text text not null,
  created_at timestamptz default now()
);

-- RLS (optional but recommended): allow users to read their own profile
alter table profiles enable row level security;
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
-- Public studio page: anyone can read name/avatar of studio members (admin/super_admin) for /studio
create policy "Public read studio team" on profiles for select using (lower(trim(role)) in ('admin', 'super_admin'));

-- After running this, give a user admin access in Table Editor → profiles → set role to 'admin' or 'super_admin'
-- Or run: update profiles set role = 'admin' where email = 'your@email.com';
