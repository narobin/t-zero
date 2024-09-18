import {error, type Load} from "@sveltejs/kit";

export const load = (async ({ params, fetch }) => {

    const response = await fetch(`/api/timer/${params.id}`);

    const body = await response.json();

    if (!response.ok)
        return error(response.status, body.message);

    return {
        name: body.name,
        date: body.date,
    };

}) satisfies Load;