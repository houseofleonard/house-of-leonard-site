import { NextRequest, NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;

const KLAVIYO_HEADERS = {
  'accept': 'application/json',
  'revision': '2024-02-15',
  'content-type': 'application/json',
  'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
};

export async function POST(req: NextRequest) {
  const { email, consent, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ error: 'Consent required' }, { status: 400 });
  }

  try {
    // Step 1 — Create or update profile
    const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: KLAVIYO_HEADERS,
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            properties: {
              ...(utm_source   && { utm_source }),
              ...(utm_medium   && { utm_medium }),
              ...(utm_campaign && { utm_campaign }),
              ...(utm_content  && { utm_content }),
              ...(utm_term     && { utm_term }),
              signup_source: utm_source || 'direct',
              marketing_consent: true,
              consented_at: new Date().toISOString(),
            },
          },
        },
      }),
    });

    let profileId: string;

    if (profileRes.status === 409) {
      const conflict = await profileRes.json();
      profileId = conflict.errors[0].meta.duplicate_profile_id;
    } else if (profileRes.ok) {
      const profile = await profileRes.json();
      profileId = profile.data.id;
    } else {
      const err = await profileRes.json();
      console.error('Klaviyo profile error:', JSON.stringify(err));
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    // Step 2 — Add profile to list
    const listRes = await fetch(`https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`, {
      method: 'POST',
      headers: KLAVIYO_HEADERS,
      body: JSON.stringify({
        data: [{ type: 'profile', id: profileId }],
      }),
    });

    if (!listRes.ok && listRes.status !== 204) {
      const err = await listRes.json();
      console.error('Klaviyo list error:', JSON.stringify(err));
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
