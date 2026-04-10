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
    // Step 1 — Create or update the profile (no subscriptions here)
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

    // Step 2 — Subscribe the profile to the list with explicit consent
    const subRes = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: KLAVIYO_HEADERS,
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [{
                type: 'profile',
                id: profileId,
                attributes: {
                  email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: 'SUBSCRIBED',
                      },
                    },
                  },
                },
              }],
            },
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: KLAVIYO_LIST_ID,
              },
            },
          },
        },
      }),
    });

    if (!subRes.ok && subRes.status !== 202) {
      const err = await subRes.json();
      console.error('Klaviyo subscription error:', JSON.stringify(err));
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
