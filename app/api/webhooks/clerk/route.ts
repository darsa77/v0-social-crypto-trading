import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'No user' }, { status: 401 })

  const email = user.emailAddresses[0].emailAddress
  const username = email.split('@')[0]

  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!existing) {
    await supabase.from('profiles').insert({
      id: crypto.randomUUID(),
      clerk_id: userId,
      username,
      display_name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || username,
      avatar_url: user.imageUrl,
    })
  }

  return NextResponse.json({ success: true })
}