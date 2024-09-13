import type {RequestHandler} from "@sveltejs/kit";

export const POST = (async ({ platform }) => {
    try {

    } catch (e) {
        return new Response("Error", {
            status: 500
        });
    }

    return new Response();
}) satisfies RequestHandler;


