-- Profiles: one row per user, linked to Supabase Auth by id
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  category text not null default 'frontend'
    check (category in ('frontend', 'backend', 'fullstack')),
  status text default '',
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Logged in users can see profiles"
  on profiles for select
  to authenticated
  using (true);

create policy "Users can create their own profile"
  on profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using ((select auth.uid()) = id);

-- Messages between two users
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  text text not null check (char_length(text) between 1 and 1000),
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

create policy "Users can read their own messages"
  on messages for select
  to authenticated
  using ((select auth.uid()) in (sender_id, receiver_id));

create policy "Users can send messages as themselves"
  on messages for insert
  to authenticated
  with check ((select auth.uid()) = sender_id);

-- Send realtime notifications about new messages
alter publication supabase_realtime add table messages;
