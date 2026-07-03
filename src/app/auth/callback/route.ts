import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error, data: sessionData } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && sessionData?.user) {
      const user = sessionData.user;
      
      // 1. Check if they are approved
      const { data: isApproved } = await supabase
        .from('approved_ambassadors')
        .select('email')
        .eq('email', user.email)
        .single();
        
      if (isApproved) {
        // 2. Check if they already have an ambassador profile
        const { data: profile } = await supabase
          .from('ambassadors')
          .select('id')
          .eq('id', user.id)
          .single();
          
        if (!profile) {
          // 3. Generate a simple 6-character referral code (e.g. from their name or random)
          const namePart = (user.user_metadata?.full_name || user.email || 'AMB').substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
          const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
          const refCode = `${namePart}${randomPart}`;
          
          await supabase.from('ambassadors').insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || "Unknown",
            referral_code: refCode,
            points: 0
          });
        } else {
          // If they exist but might not have a name (legacy users), update their name
          if (user.user_metadata?.full_name) {
            await supabase.from('ambassadors').update({
              name: user.user_metadata.full_name
            }).eq('id', user.id);
          }
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/dashboard/login?error=auth`)
}
