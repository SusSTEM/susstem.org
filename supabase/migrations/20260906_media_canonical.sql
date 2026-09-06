create extension if not exists pgcrypto;

drop index if exists public.one_published_hero;

with ranked as (
  select id, row_number() over (partition by public_url order by created_at asc, id asc) as duplicate_rank
  from public.media_assets
)
delete from public.media_assets
where id in (select id from ranked where duplicate_rank > 1);

create unique index if not exists media_assets_unique_public_url on public.media_assets (public_url);
create index if not exists media_gallery_order on public.media_assets (is_published, placement, sort_order);

drop policy if exists "Admins can manage media" on public.media_assets;
drop policy if exists "Signed-in users can manage media" on public.media_assets;
create policy "Signed-in users can manage media"
on public.media_assets for all to authenticated
using (true) with check (true);

drop policy if exists "Admins can upload media files" on storage.objects;
drop policy if exists "Signed-in users can upload media files" on storage.objects;
create policy "Signed-in users can upload media files"
on storage.objects for insert to authenticated
with check (bucket_id = 'media');

drop policy if exists "Admins can update media files" on storage.objects;
drop policy if exists "Signed-in users can update media files" on storage.objects;
create policy "Signed-in users can update media files"
on storage.objects for update to authenticated
using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "Admins can delete media files" on storage.objects;
drop policy if exists "Signed-in users can delete media files" on storage.objects;
create policy "Signed-in users can delete media files"
on storage.objects for delete to authenticated
using (bucket_id = 'media');
