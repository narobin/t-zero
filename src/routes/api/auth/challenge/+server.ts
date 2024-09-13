import type {RequestHandler} from "@sveltejs/kit";

export const GET = (async ({ platform }) => {
    const challenge = new Uint8Array(128);
    crypto.getRandomValues(challenge);

    const body = await request.json();

    const email = body?.email;

    const userID = crypto.randomUUID();

    await platform.env.tzero.put(
        `challenge:${userID}`,
        JSON.stringify({
            challenge,
            email,
        }),
        {
            expirationTtl: 1800
        }
    );

    return new Response(JSON.stringify({
        challenge,
        userID
    }), {
        status: 200,
        headers: {
            contentType: "application/json",
        }
    });
}) satisfies RequestHandler;
