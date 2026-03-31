import { NextRequest, NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    // Add profile to Klaviyo
    const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'revision': '2024-02-15',
        'content-type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: { email },
        },
      }),
    });

    let profileId: string;

    if (profileRes.status === 409) {
      // Profile already exists — extract id from conflict response
      const conflict = await profileRes.json();
      profileId = conflict.errors[0].meta.duplicate_profile_id;
    } else if (profileRes.ok) {
      const profile = await profileRes.json();
      profileId = profile.data.id;
    } else {
      const err = await profileRes.json();
      console.error('Klaviyo profile error:', err);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    // Add profile to list
    await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'revision': '2024-02-15',
        'content-type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
      },
      body: JSON.stringify({
        data: [{ type: 'profile', id: profileId }],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
