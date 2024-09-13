
const jsonResponse = (a: any, options?: ResponseInit) => {
    return new Response(JSON.stringify(a), {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });
};

export default jsonResponse;
