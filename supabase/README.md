# Supabase schema

## Create all tables

1. Open **[Supabase Dashboard](https://supabase.com/dashboard)** → your project.
2. In the left sidebar click **SQL Editor**.
3. Click **New query**.
4. Open `schema.sql` in this folder, copy its full contents, and paste into the query box.
5. Click **Run** (or Ctrl/Cmd + Enter).

You should see success messages and the tables under **Table Editor**.

## Give yourself admin access

After tables exist and you have a user in **Authentication → Users**:

1. Go to **Table Editor** → **profiles**.
2. Find your row (same `id` as in Authentication → Users, or add a row with that `id`).
3. Set **role** to `admin` or `super_admin` (so Studio login works).

Or run in SQL Editor (replace with your email):

```sql
update profiles set role = 'admin' where email = 'your@email.com';
```

New signups get a profile row automatically (trigger) with `role = 'client'`; change it to `admin` in Table Editor or with the SQL above.

## Studio page team photos

The public **/studio** page shows profile photos for studio members (admin/super_admin) from `profiles.avatar`. If you ran an older schema, add this policy so unauthenticated visitors can read studio team names/avatars:

```sql
create policy "Public read studio team" on profiles for select using (lower(trim(role)) in ('admin', 'super_admin'));
```
