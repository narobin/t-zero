export const handle = async ({ event, resolve }) => {

    if (event.isDataRequest)
        return await resolve(event);

    const sessionToken = event.cookies.get("session-token")
    const email = event.cookies.get("email")

    const session = await event.platform.env.tzero?.get(`session:${email}`);

    const isLoggedIn: boolean = !!email && session === sessionToken;

    return await resolve({
        user: { email, isLoggedIn },
        ...event
    });

}
