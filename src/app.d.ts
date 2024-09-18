// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {

        interface Platform {
            env: {
                tzero: KVNamespace
            }
            cf: CfProperties
            ctx: ExecutionContext
        }

        type RequestEvent = RequestEvent & {
            platform: Readonly<Platform>
            user: {
                email?: string;
                isLoggedIn: boolean;
            }
        }

    }
}

export {};