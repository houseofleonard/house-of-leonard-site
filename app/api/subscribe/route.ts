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
    // Step 1 — Subscribe via bulk-create-jobs (email only, no profile ID)
    // This records consent + adds to list in one operation
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

    // Step 2 — Store UTM data as custom properties if present (best-effort, non-blocking)
    const hasUtm = utm_source || utm_medium || utm_campaign || utm_content || utm_term;
    if (hasUtm) {
      try {
        // Look up profile by email to get ID for property update
        const lookupRes = await fetch(
          `https://a.klaviyo.com/api/profiles/?filter=equals(email,"${encodeURIComponent(email)}")`,
          { headers: KLAVIYO_HEADERS }
        );
        if (lookupRes.ok) {
          const lookup = await lookupRes.json();
          const profileId = lookup?.data?.[0]?.id;
          if (profileId) {
            await fetch(`https://a.klaviyo.com/api/profiles/${profileId}/`, {
              method: 'PATCH',
              headers: KLAVIYO_HEADERS,
              body: JSON.stringify({
                data: {
                  type: 'profile',
                  id: profileId,
                  attributes: {
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
          }
        }
      } catch (utmErr) {
        // Non-fatal — log but don't fail the subscription
        console.error('UTM property update failed:', utmErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
