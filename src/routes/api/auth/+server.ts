import {error, type RequestHandler} from "@sveltejs/kit";
import {generateToken} from "$lib/helpers/generateToken";

export const GET = (async ({ platform, request, cookies }) => {

    const challenge = generateToken();

    const email = request.headers.get("email");

    if (!email)
        throw error(400, "Please provide an email");

    await platform.env.tzero.put(
        `challenge:${email}`,
        challenge,
        {
            expirationTtl: 1800,
        }
    );

    cookies.set("email", email, {
        path: "/",
        httpOnly: false,
    });

    return new Response(challenge);

}) satisfies RequestHandler;

export const POST = (async ({ platform, request, cookies, user }) => {

    const signature = request.arrayBuffer();
    const email = user.email;

    const { publicKey, alg } = await platform.env.tzero.get(`user:${email}`, { type: "json" });

    const algorithm = { name: alg }

    const challenge = await platform.env.tzero.get(`challenge:${email}`, { type: "arrayBuffer" });

    const key = crypto.subtle.importKey(
        "raw",
        new Uint8Array(publicKey),
        algorithm,
        false,
        [ "sign" ]
    )

    const isVerified = await crypto.subtle.verify(algorithm, key, signature, challenge);

    if (!isVerified)
        throw error(401, "Invalid signature");

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
        maxAge: 60 * 60 * 24,
        httpOnly: false,
    })

    return new Response();

}) satisfies RequestHandler;
