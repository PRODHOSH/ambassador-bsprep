-- Create the announcements_ambassador table
create table IF NOT EXISTS public.announcements_ambassador (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text not null,
    active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.announcements_ambassador enable row level security;

-- Policies for announcements_ambassador
-- Anyone can read active announcements
create policy "Anyone can view active announcements"
    on public.announcements_ambassador for select
    using (active = true);

-- Only authenticated admins can insert
create policy "Admins can insert announcements"
    on public.announcements_ambassador for insert
    with check (
        exists (SELECT 1 FROM public.ambassadors WHERE id = auth.uid() AND is_admin = true)
    );

-- Only authenticated admins can update
create policy "Admins can update announcements"
    on public.announcements_ambassador for update
    using (
        exists (SELECT 1 FROM public.ambassadors WHERE id = auth.uid() AND is_admin = true)
    );

-- Only authenticated admins can delete
create policy "Admins can delete announcements"
    on public.announcements_ambassador for delete
    using (
        exists (SELECT 1 FROM public.ambassadors WHERE id = auth.uid() AND is_admin = true)
    );
