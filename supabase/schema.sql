-- ==============================================================================
-- Apex PLATFORM SCHEMA
-- ==============================================================================

-- 1. Subscriptions table
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  stripe_subscription_id text,
  status text not null default 'inactive',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.subscriptions enable row level security;

drop policy if exists "Users can view own subscription" on public.subscriptions;
create policy "Users can view own subscription"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- 2. Projects / Workspaces table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  status text not null default 'active', -- active, draft, archived
  environment text not null default 'production',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.projects enable row level security;

drop policy if exists "Users can manage own projects" on public.projects;
create policy "Users can manage own projects"
  on public.projects
  for all
  using (auth.uid() = user_id);

-- 3. Team Memberships table
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users(id) on delete cascade not null,
  member_email text not null,
  role text not null default 'member', -- owner, admin, member, viewer
  status text not null default 'active', -- active, invited, suspended
  invited_at timestamptz default now() not null
);

alter table public.team_members enable row level security;

drop policy if exists "Users can manage team members" on public.team_members;
create policy "Users can manage team members"
  on public.team_members
  for all
  using (auth.uid() = owner_id);

-- 4. In-App Notifications table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null default 'info', -- info, success, warning, alert
  read boolean not null default false,
  created_at timestamptz default now() not null
);

alter table public.notifications enable row level security;

drop policy if exists "Users can manage own notifications" on public.notifications;
create policy "Users can manage own notifications"
  on public.notifications
  for all
  using (auth.uid() = user_id);

-- 5. Audit Logs table (Security & Actions)
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  category text not null default 'auth', -- auth, billing, project, team, admin
  ip_address text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now() not null
);

alter table public.audit_logs enable row level security;

drop policy if exists "Users can view own audit logs" on public.audit_logs;
create policy "Users can view own audit logs"
  on public.audit_logs
  for select
  using (auth.uid() = user_id);

-- 6. Automated timestamp trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.subscriptions;
create trigger set_updated_at before update on public.subscriptions
for each row execute function update_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects
for each row execute function update_updated_at();
