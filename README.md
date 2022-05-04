### Project quick start
~~~
npx create-next-app realtime-app --ts
~~~
~~~
yarn add -D tailwindcss postcss autoprefixer
yarn add -D prettier prettier-plugin-tailwindcss
npx tailwindcss init -p
~~~
~~~
yarn add @supabase/supabase-js react-query@4.0.0-beta.7 zustand @heroicons/react react-error-boundary date-fns
~~~
https://tailwindcss.com/docs/guides/nextjs

#### SQL Query
~~~
-- CASCADE Delete setup !
alter table public.comments
add constraint comments_post_id_fkey
 foreign key (post_id)
 references posts(id)
 on delete cascade;
-- Enable automatic update_at update
create trigger handle_updated_at before update on profiles
for each row execute procedure moddatetime (updated_at);
-- Enable row level subscrition for comments table
alter table "comments" replica identity full;
~~~