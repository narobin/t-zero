import {error, type RequestHandler} from "@sveltejs/kit";
import {generateToken} from "$lib/helpers/generateToken";

export const POST = (async ({ request, platform, params, cookies }) => {

    const email = params.email;
    const publicKey = await request.arrayBuffer();

    if (!email || !publicKey)
        throw error(400);

    // verify user doesn't already exist
    // const testUser = await platform.env.tzero.get(``)

    await platform.env.tzero.put(
        `user:${email}`,
        JSON.stringify({ publicKey }),
    )

    const token = generateToken();

    await platform.env.tzero.put(`session:${email}`, token.toString(), {
        expirationTtl: 3600
    })

    cookies.set("session-token", token.toString(), {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24
    })
    cookies.set("logged-in", "true", {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24
    })

    return new Response();

}) satisfies RequestHandler;
