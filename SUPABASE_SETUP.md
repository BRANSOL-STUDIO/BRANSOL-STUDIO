# Supabase setup guide — BRANSOL

You’ll do everything in the [Supabase Dashboard](https://supabase.com/dashboard). If you don’t have an account, sign up at [supabase.com](https://supabase.com) (free tier is enough to start).

---

## 1. Create a project

1. Go to **https://supabase.com/dashboard** and sign in.
2. Click **New project**.
3. Choose your **Organization** (or create one).
4. Fill in:
   - **Name:** e.g. `bransol` or `BRANSOL-STUDIO`
   - **Database password:** choose a strong password and **save it somewhere safe** (you need it for direct DB access).
   - **Region:** pick the closest to your users.
5. Click **Create new project** and wait a minute until it’s ready.

---

## 2. Get your Project URL and API keys

1. In the left sidebar click **Project Settings** (gear icon).
2. Open the **API** tab.
3. You’ll see:
   - **Project URL** — e.g. `https://abcdefghijk.supabase.co`  
     → This is your **Supabase URL**.
   - **Project API keys:**
     - **anon public** — safe to use in the browser (Next.js client).  
     → Use this as **NEXT_PUBLIC_SUPABASE_ANON_KEY**.
     - **service_role** — full access, **never** use in the browser.  
     → Use this as **SUPABASE_SERVICE_ROLE_KEY** (only in server code / env).

Copy these three values; you’ll put them in `.env.local` in step 5.

---

## 3. Create the database tables

1. In the left sidebar open **SQL Editor**.
2. Click **New query**.
3. Paste the SQL below (this matches the BRANSOL schema from your project spec).
4. Click **Run** (or Ctrl/Cmd + Enter).

```sql
-- Organisations (clients)
create table organisations (
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
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  role text not null default 'client',
  organisation_id uuid references organisations,
  avatar text,
  created_at timestamptz default now()
);

-- Projects
create table projects (
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

create table project_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade,
  label text not null,
  phase_date text,
  done boolean default false,
  active boolean default false,
  sort_order int default 0
);

create table project_team (
  project_id uuid references projects on delete cascade,
  profile_id uuid references profiles on delete cascade,
  primary key (project_id, profile_id)
);

-- Deliverables
create table deliverables (
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

create table deliverable_comments (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid references deliverables on delete cascade,
  author_id uuid references profiles,
  text text not null,
  created_at timestamptz default now()
);

-- Invoices
create table invoices (
  id text primary key,
  organisation_id uuid references organisations,
  status text default 'pending',
  date date,
  due_date date,
  notes text,
  created_by uuid references profiles,
  created_at timestamptz default now()
);

create table invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id text references invoices on delete cascade,
  name text not null,
  description text,
  quantity int default 1,
  rate numeric not null,
  sort_order int default 0
);

-- Quotes
create table quotes (
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

create table quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id text references quotes on delete cascade,
  name text not null,
  description text,
  quantity int default 1,
  rate numeric not null,
  optional boolean default false,
  sort_order int default 0
);

create table quote_scope (
  id uuid primary key default gen_random_uuid(),
  quote_id text references quotes on delete cascade,
  type text not null,
  text text not null,
  sort_order int default 0
);

-- Files (client uploads)
create table files (
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
create table activity (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  text text not null,
  actor_id uuid references profiles,
  created_at timestamptz default now()
);

-- Internal notes
create table notes (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references organisations,
  author_id uuid references profiles,
  text text not null,
  created_at timestamptz default now()
);
```

After it runs, you should see the new tables under **Table Editor**.

---

## 4. (Optional) Row Level Security (RLS)

RLS makes sure clients only see their own data and admins can see everything. You can add it later; for local development you can leave it off.

1. In **SQL Editor**, run policies per table. Example for `organisations`:

```sql
alter table organisations enable row level security;
alter table profiles enable row level security;
alter table projects enable row level security;
alter table deliverables enable row level security;
-- (repeat for other tables as needed)

-- Example: clients see only their org
create policy "Users see own org" on organisations
  for select using (id in (select organisation_id from profiles where id = auth.uid()));
```

You can refine policies later; the app will work without them if you’re using the service role in server code.

---

## 5. Put the keys in your Next.js app

1. In your project folder open **`.env.local`** (create it if it doesn’t exist).
2. Set these from step 2 (use your real Project URL and keys):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...your_service_role_key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the **anon public** key for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and the **service_role** key for `SUPABASE_SERVICE_ROLE_KEY`. Never commit `.env.local` (it’s in `.gitignore`).

---

## 6. Enable Auth (for login)

1. In the dashboard go to **Authentication** → **Providers**.
2. **Email** is usually on by default. You can leave “Confirm email” off for local testing.
3. To create a test user: **Authentication** → **Users** → **Add user** → create with email/password.
4. To give that user a role, add a row in the `profiles` table (Table Editor or SQL), e.g.:

```sql
insert into profiles (id, email, role)
values ('the-user-uuid-from-auth-users', 'you@example.com', 'client');
```

The user UUID is in **Authentication** → **Users** (copy the UID).

---

## 7. (Optional) Storage buckets

For file uploads (deliverables, client files):

1. Go to **Storage** in the sidebar.
2. **New bucket** → name: `deliverables` → **Private** → Create.
3. **New bucket** → name: `client-files` → **Private** → Create.
4. In **Policies** for each bucket, add policies so your app (using the service role or a secure backend) can upload/list/read; you can do this after the app is working.

---

## Quick checklist

- [ ] Project created in Supabase.
- [ ] Project URL and anon + service_role keys copied.
- [ ] SQL schema run in SQL Editor (all tables created).
- [ ] `.env.local` has `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] (Optional) One test user in Authentication + matching row in `profiles`.
- [ ] Restart dev server (`npm run dev`) after changing `.env.local`.

---

## Where to find things in the dashboard

| What you need        | Where in Supabase                    |
|----------------------|--------------------------------------|
| Project URL & keys   | Project Settings → API               |
| Run SQL / create tables | SQL Editor                        |
| View/edit data       | Table Editor                         |
| Users (auth)         | Authentication → Users               |
| File storage         | Storage                              |
| Logs                 | Logs (API, Auth, etc.)               |

If you tell me which step you’re on (e.g. “I created the project, what next?”), I can give you the exact clicks and values to use next.
