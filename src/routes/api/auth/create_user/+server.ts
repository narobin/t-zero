import type {RequestHandler} from "@sveltejs/kit";

const POST = (async ({ platform, request }) => {
    const {
        publicKey,
        userID
    } = request.json();

    platform.env.tzero.put()

}) satisfies RequestHandler;
