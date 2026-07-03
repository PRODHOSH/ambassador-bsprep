-- Seed data for the 50-Day Ambassador Bounties
-- Run this in your Supabase SQL Editor to populate the bounties table!

INSERT INTO public.bounties (title, description, reward_points, active)
VALUES 
(
  'Follow on X (Twitter)', 
  'Follow @BSPrep on X. Paste the URL to your Twitter profile below so we can verify.', 
  50, 
  true
),
(
  'Follow on Instagram', 
  'Follow @bsprep.in on Instagram. Enter your exact Instagram handle below so our team can verify your follow.', 
  50, 
  true
),
(
  'Subscribe to YouTube', 
  'Subscribe to our DataScienceIITMTamil YouTube channel. Paste the URL to your YouTube channel below.', 
  100, 
  true
),
(
  'Share on LinkedIn', 
  'Post about joining the BSPrep Ambassador program with your offer letter. Mention your referral code. Paste your published post URL below.', 
  150, 
  true
),
(
  'The "Guest Author" (Content Creation)', 
  'Write a high-quality, 800+ word article about your exam preparation journey. Submit the draft link (Google Doc). If published, you earn the points!', 
  300, 
  true
),
(
  'The "Meme Lord" (Viral Marketing)', 
  'Create 3 highly relatable, funny memes about studying for exams, subtly featuring BSPrep. Submit a link to a Google Drive folder or Imgur link with your memes.', 
  100, 
  true
),
(
  'The "Campus Workshop" (Mass Conversion)', 
  'Organize and host a 30-minute session for your college peers. Submit a link to a photo/screenshot showing at least 15 students attending.', 
  500, 
  true
);
