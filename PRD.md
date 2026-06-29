# Product Requirements Document (PRD): BSPrep Ambassador Portal

## 1. Overview
The BSPrep Ambassador Portal is a private, exclusive dashboard designed for "Growth Fellows" (student ambassadors) to track their referrals, submit promotional bounties (tasks), and monitor their leaderboard tier.

## 2. Tech Stack & Infrastructure
- **Framework:** Next.js 14 (App Router)
- **Database:** Neon DB (Serverless Postgres) + Prisma ORM
- **Authentication:** NextAuth.js (Auth.js) - Google Provider (already configured in `.env.local`)
- **Deployment:** Vercel

## 3. Design & UI Specifications
- **Theme:** Beige, Blue, and Black.
- **Vibe:** Exclusive, premium, clean.

## 4. Authentication Flow (Strict Gating)
- **Login Page Structure:** Split-screen layout.
  - *Left Side:* High-quality brand image/design graphic.
  - *Right Side:* Minimalist login box featuring only a "Continue with Google" button.
- **Authorization Logic:** 
  - The portal is strictly invite-only. 
  - In the database, there must be an `ApprovedAmbassadors` table (or an `isApproved` flag on the `User` model).
  - During the NextAuth callback, the backend MUST verify that the Google Email exists in the approved list. If it does not, throw an "Unauthorized Email" error and deny entry.

## 5. Core Features

### A. The Referral Engine
- Every approved ambassador gets a unique referral link (e.g., `bsprep.in/?ref=ambassador_id`).
- The dashboard must display this link with a 1-click "Copy" button.

### B. Bounty Tasks & Tracking
Ambassadors earn points by completing specific tasks. The system must support two verification methods:

#### Automated / API-Verified Tasks (Tier 1)
Users submit a URL, and the backend verifies the content via API/Scraping before instantly awarding points.
- **X (Twitter) Post:** Tweet about BSPrep and tag the official handle.
- **LinkedIn Post:** Share a milestone or learning and tag the BSPrep page.
- **Reddit Post:** Create a helpful post in relevant subreddits (e.g., r/developersIndia, r/BTechtards).
- **GitHub Star:** Star the official BSPrep GitHub repository.

#### Manually Verified Tasks (Tier 2 & 3)
Users submit proof (URL or screenshot). The status is set to `PENDING` until an Admin manually approves it via an Admin Panel.
- **WhatsApp Promo:** Share announcements in college WhatsApp groups (Requires screenshot upload; Admin must check to prevent spam).
- **Technical Blogging:** Write and submit a draft for `blogs.bsprep.in`.
- **Host a Tech Session:** Host a Google Meet / LinkedIn Audio event teaching a technical topic (e.g., Compilers) under the BSPrep banner.
- **Quora Answers:** Answer relevant questions on Quora mentioning BSPrep.
- **Feature Requests / Bug Bounties:** Submit a valid, reproducible bug or highly-requested feature.

### C. Rewards & Awards System (Zero-Cost Focus)
Instead of a rigid tier system, the platform uses a points-based economy where ambassadors unlock high-leverage digital and experiential rewards:
- **Digital Badges (Holopin-style):** Earn specific digital badges for different categories of work (e.g., "Community Builder" badge for Discord help, "Tech Evangelist" for writing blogs).
- **The "Growth Fellow" Store:** Points act as currency to redeem career-accelerating, zero-cost perks:
  - *Status Perks:* "Beta Tester" role for early access to new BSPrep features, or an exclusive Discord/WhatsApp role color.
  - *Visibility Perks:* A spot on the public `bsprep.in/hall-of-fame` page (great for their personal SEO) or a "Social Media Takeover" day on official BSPrep channels.
  - *Career Perks:* 1-on-1 Resume Roasts, Mock Technical Interviews with the core team, or free lifetime access to premium BSPrep resources.
- **Top Performers Leaderboard:** A dynamic leaderboard tracking all-time points. The top 3 performers at the end of the term receive personalized Letters of Recommendation and LinkedIn Endorsements.

## 6. Database Schema Requirements (Prisma)
At a minimum, the schema must include:
- `User` / `Ambassador`: (id, email, name, points, referralCode, role: AMBASSADOR | ADMIN)
- `ApprovedEmails`: (email) - *Checked during login.*
- `BountyTask`: (id, title, description, points, verificationType: API | MANUAL)
- `TaskSubmission`: (id, ambassadorId, taskId, proofUrl, status: PENDING | APPROVED | REJECTED)
