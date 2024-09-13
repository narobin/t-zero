import type {Load} from "@sveltejs/kit";
import jsonResponse from "$lib/helpers/jsonResponse";

export const load = (async ({ params, fetch }) => {

    const response = await fetch(`/api/timer/${params.id}`);

    const body = await response.json();
    
    return {
        name: body.name,
        date: body.date,
    };

}) satisfies Load;