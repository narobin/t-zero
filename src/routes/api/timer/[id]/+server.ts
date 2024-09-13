import type {RequestHandler} from "@sveltejs/kit";
import jsonResponse from "$lib/helpers/jsonResponse";
import type {Timer} from "$lib/types/timer";

export const GET = (async ({ platform, params }) => {

    if (!platform || !params.id)
        throw new Error();

    const timer = await platform.env.tzero.get(`timer:${params.id}`);

    if (!timer)
        throw new Error();

    console.info(timer);

    return new Response(timer, {
        headers: {
            "Content-Type": "application/json",
        }
    });

}) satisfies RequestHandler;

export const PUT = (async ({ platform, params, request }) => {

    if (!platform || !params.id)
        throw new Error();

    const body: Timer = await request.json();

    if (!body?.name || !body?.date)
        throw new Error();

    await platform.env.tzero.put(`timer:${params.id}`, JSON.stringify({
        name: body.name,
        date: body.date,
    }));

    return new Response();

}) satisfies RequestHandler;
