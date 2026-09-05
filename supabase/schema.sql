create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  title text not null default '',
  alt_text text not null default '',
  native_width integer not null default 0,
  native_height integer not null default 0,
  placement text not null default 'gallery' check (placement in ('gallery', 'hero', 'both')),
  zoom numeric not null default 1,
  focal_point_x numeric not null default 50,
  focal_point_y numeric not null default 50,
  object_fit text not null default 'auto' check (object_fit in ('auto', 'cover', 'contain', 'original')),
  brightness numeric not null default 100,
  contrast numeric not null default 100,
  saturation numeric not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.volunteer_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country text not null,
  other_country text,
  applicant_type text not null,
  interests text[] not null default '{}',
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.partner_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country text not null,
  other_country text,
  applicant_type text not null,
  interests text[] not null default '{}',
  message text not null default '',
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.volunteer_submissions enable row level security;
alter table public.partner_submissions enable row level security;

create policy "Public can read published media"
  on public.media_assets for select
  to anon, authenticated
  using (true);

create policy "Admins can manage media"
  on public.media_assets for all
  to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Public can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create policy "Public can submit contact forms"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Public can submit volunteer forms"
  on public.volunteer_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Public can submit partner forms"
  on public.partner_submissions for insert
  to anon, authenticated
  with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

create policy "Public can read media files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "Admins can upload media files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can update media files"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  )
  with check (
    bucket_id = 'media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can delete media files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'media'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  );
