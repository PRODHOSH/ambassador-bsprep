-- Run this in your Supabase SQL Editor to add the missing column for the Referrals page

ALTER TABLE public.referrals 
DROP COLUMN IF EXISTS referred_user_name;

ALTER TABLE public.referrals 
ADD COLUMN IF NOT EXISTS referred_user_email TEXT;
