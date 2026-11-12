-- Cơ sở dữ liệu cho chế độ chơi theo phòng.
-- Chạy một lần trong Supabase: Dashboard → SQL Editor → New query → dán toàn bộ file này → Run.

create table if not exists rooms (
  code       text primary key check (code ~ '^[0-9]{6}$'),
  seed       integer not null,
  created_at timestamptz not null default now()
);

create table if not exists players (
  id         uuid primary key default gen_random_uuid(),
  room_code  text not null references rooms(code) on delete cascade,
  name       text not null check (char_length(name) between 1 and 24),
  status     text not null default 'playing' check (status in ('playing', 'done')),
  cards      integer not null default 0,
  total      double precision not null default 0,
  ending     text,
  won        boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_code, name)
);
create index if not exists players_room_idx on players (room_code);

-- Phòng chờ: người chơi đợi đến khi giáo viên bấm "Bắt đầu" (started_at được ghi)
alter table rooms add column if not exists started_at timestamptz;

-- Chơi trong lớp, không chống gian lận: ai có khóa công khai đều được đọc/ghi.
alter table rooms   enable row level security;
alter table players enable row level security;

drop policy if exists "rooms read"     on rooms;
drop policy if exists "rooms create"   on rooms;
drop policy if exists "players read"   on players;
drop policy if exists "players join"   on players;
drop policy if exists "players update" on players;
drop policy if exists "rooms delete"   on rooms;
drop policy if exists "rooms start"    on rooms;
drop policy if exists "players leave"  on players;

create policy "rooms read"     on rooms   for select to anon using (true);
create policy "rooms create"   on rooms   for insert to anon with check (true);
create policy "players read"   on players for select to anon using (true);
create policy "players join"   on players for insert to anon with check (true);
create policy "players update" on players for update to anon using (true) with check (true);
create policy "rooms start"    on rooms   for update to anon using (true) with check (true);  -- giáo viên bấm Bắt đầu
create policy "rooms delete"   on rooms   for delete to anon using (true);  -- giáo viên xóa phòng (xóa kèm người chơi)
create policy "players leave"  on players for delete to anon using (true);  -- người chơi thoát khỏi phòng

grant select, insert, update, delete on rooms   to anon;
grant select, insert, update, delete on players to anon;

-- Dọn dữ liệu (chạy riêng khi cần):
--   delete from rooms;                                                -- xóa mọi phòng và kết quả
--   delete from rooms where created_at < now() - interval '1 day';    -- chỉ xóa phòng cũ hơn 1 ngày
