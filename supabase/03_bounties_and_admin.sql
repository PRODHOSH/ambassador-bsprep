-- 1. Add admin role to ambassadors table
ALTER TABLE public.ambassadors 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Create the bounties table
CREATE TABLE public.bounties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reward_points INT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the bounty_submissions table
CREATE TABLE public.bounty_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ambassador_id UUID REFERENCES public.ambassadors(id) ON DELETE CASCADE,
  bounty_id UUID REFERENCES public.bounties(id) ON DELETE CASCADE,
  proof_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create trigger to automatically add points when a bounty is approved
CREATE OR REPLACE FUNCTION process_bounty_approval()
RETURNS TRIGGER AS $$
DECLARE
  bounty_reward INT;
BEGIN
  -- Only trigger if the status just changed to 'approved'
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Get the reward points for this bounty
    SELECT reward_points INTO bounty_reward FROM public.bounties WHERE id = NEW.bounty_id;
    
    -- Add points to the ambassador
    UPDATE public.ambassadors
    SET points = points + bounty_reward
    WHERE id = NEW.ambassador_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_bounty_approved
AFTER UPDATE ON public.bounty_submissions
FOR EACH ROW EXECUTE FUNCTION process_bounty_approval();

-- 5. Set up Row Level Security (RLS)
ALTER TABLE public.bounties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bounty_submissions ENABLE ROW LEVEL SECURITY;

-- Bounties: Anyone can read active bounties
CREATE POLICY "Allow public read of active bounties" ON public.bounties
  FOR SELECT USING (active = true);

-- Bounties: Admins can do everything
CREATE POLICY "Allow admins to manage bounties" ON public.bounties
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.ambassadors WHERE id = auth.uid() AND is_admin = true)
  );

-- Submissions: Ambassadors can read their own
CREATE POLICY "Allow ambassadors to read their own submissions" ON public.bounty_submissions
  FOR SELECT USING (auth.uid() = ambassador_id);

-- Submissions: Ambassadors can insert their own
CREATE POLICY "Allow ambassadors to create submissions" ON public.bounty_submissions
  FOR INSERT WITH CHECK (auth.uid() = ambassador_id);

-- Submissions: Admins can do everything
CREATE POLICY "Allow admins to manage submissions" ON public.bounty_submissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.ambassadors WHERE id = auth.uid() AND is_admin = true)
  );
