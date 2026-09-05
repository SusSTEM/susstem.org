create extension if not exists pgcrypto;

do $$ begin create type public.admin_role as enum ('owner', 'editor'); exception when duplicate_object then null; end $$;
do $$ begin create type public.media_type as enum ('image', 'video'); exception when duplicate_object then null; end $$;
do $$ begin create type public.media_placement as enum ('hero', 'gallery', 'both', 'library'); exception when duplicate_object then null; end $$;
do $$ begin create type public.media_fit as enum ('auto', 'cover', 'contain', 'original'); exception when duplicate_object then null; end $$;
do $$ begin create type public.newsletter_status as enum ('draft', 'scheduled', 'published', 'archived'); exception when duplicate_object then null; end $$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.admin_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql
as $$ begin new.updated_at = now(); return new; end; $$;

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_bucket text not null default 'media',
  storage_path text not null unique,
  public_url text not null,
  media_type public.media_type not null,
  title text not null default '',
  alt_text text not null default '',
  native_width integer not null default 0 check (native_width >= 0),
  native_height integer not null default 0 check (native_height >= 0),
  placement public.media_placement not null default 'library',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  zoom numeric not null default 1 check (zoom between 0.25 and 4),
  focal_point_x numeric not null default 50 check (focal_point_x between 0 and 100),
  focal_point_y numeric not null default 50 check (focal_point_y between 0 and 100),
  object_fit public.media_fit not null default 'auto',
  brightness numeric not null default 100 check (brightness between 0 and 200),
  contrast numeric not null default 100 check (contrast between 0 and 200),
  saturation numeric not null default 100 check (saturation between 0 and 200),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists one_published_hero on public.media_assets (placement) where placement = 'hero' and is_published = true;
create index if not exists media_gallery_order on public.media_assets (is_published, placement, sort_order);

create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  cover_image_id uuid references public.media_assets(id) on delete set null,
  content_json jsonb not null default '{}'::jsonb,
  content_html text not null default '',
  status public.newsletter_status not null default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists published_newsletters on public.newsletters (status, published_at desc);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (length(email) <= 320),
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  subject text not null default '', message text not null, created_at timestamptz not null default now()
);
create table if not exists public.volunteer_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  country text not null, other_country text, applicant_type text not null,
  interests text[] not null default '{}', message text not null default '', created_at timestamptz not null default now()
);
create table if not exists public.partner_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  country text not null, other_country text, applicant_type text not null,
  interests text[] not null default '{}', message text not null default '', created_at timestamptz not null default now()
);

drop trigger if exists touch_media_assets on public.media_assets;
create trigger touch_media_assets before update on public.media_assets for each row execute function public.touch_updated_at();
drop trigger if exists touch_newsletters on public.newsletters;
create trigger touch_newsletters before update on public.newsletters for each row execute function public.touch_updated_at();

alter table public.admin_users enable row level security;
alter table public.media_assets enable row level security;
alter table public.newsletters enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.volunteer_submissions enable row level security;
alter table public.partner_submissions enable row level security;

drop policy if exists "Public can read published media" on public.media_assets;
create policy "Public can read published media" on public.media_assets for select to anon, authenticated using (is_published = true);
drop policy if exists "Admins can manage media" on public.media_assets;
create policy "Admins can manage media" on public.media_assets for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Public can read published newsletters" on public.newsletters;
create policy "Public can read published newsletters" on public.newsletters for select to anon, authenticated using (status = 'published' and published_at <= now());
drop policy if exists "Admins can manage newsletters" on public.newsletters;
create policy "Admins can manage newsletters" on public.newsletters for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Public can subscribe" on public.newsletter_subscribers;
create policy "Public can subscribe" on public.newsletter_subscribers for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read subscribers" on public.newsletter_subscribers;
create policy "Admins can read subscribers" on public.newsletter_subscribers for select to authenticated using (public.is_admin());

drop policy if exists "Public can submit contact forms" on public.contact_submissions;
create policy "Public can submit contact forms" on public.contact_submissions for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read contact forms" on public.contact_submissions;
create policy "Admins can read contact forms" on public.contact_submissions for select to authenticated using (public.is_admin());
drop policy if exists "Public can submit volunteer forms" on public.volunteer_submissions;
create policy "Public can submit volunteer forms" on public.volunteer_submissions for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read volunteer forms" on public.volunteer_submissions;
create policy "Admins can read volunteer forms" on public.volunteer_submissions for select to authenticated using (public.is_admin());
drop policy if exists "Public can submit partner forms" on public.partner_submissions;
create policy "Public can submit partner forms" on public.partner_submissions for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read partner forms" on public.partner_submissions;
create policy "Admins can read partner forms" on public.partner_submissions for select to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public) values ('media', 'media', true), ('newsletter-assets', 'newsletter-assets', true) on conflict (id) do update set public = excluded.public;
drop policy if exists "Public can read media files" on storage.objects;
create policy "Public can read media files" on storage.objects for select to anon, authenticated using (bucket_id in ('media', 'newsletter-assets'));
drop policy if exists "Admins can upload media files" on storage.objects;
create policy "Admins can upload media files" on storage.objects for insert to authenticated with check (bucket_id in ('media', 'newsletter-assets') and public.is_admin());
drop policy if exists "Admins can update media files" on storage.objects;
create policy "Admins can update media files" on storage.objects for update to authenticated using (bucket_id in ('media', 'newsletter-assets') and public.is_admin()) with check (bucket_id in ('media', 'newsletter-assets') and public.is_admin());
drop policy if exists "Admins can delete media files" on storage.objects;
create policy "Admins can delete media files" on storage.objects for delete to authenticated using (bucket_id in ('media', 'newsletter-assets') and public.is_admin());
