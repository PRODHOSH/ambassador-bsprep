-- 1. Add the name column to the ambassadors table
ALTER TABLE public.ambassadors 
ADD COLUMN IF NOT EXISTS name TEXT;

-- 2. Backfill existing ambassadors with their name from their Google account
UPDATE public.ambassadors a
SET name = (
  SELECT raw_user_meta_data->>'full_name'
  FROM auth.users u
  WHERE u.id = a.id
)
WHERE name IS NULL;
