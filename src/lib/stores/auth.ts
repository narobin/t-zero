import {writable} from "svelte/store";
import {error} from "@sveltejs/kit";
import {generateToken} from "$lib/helpers/generateToken";
import Cookies from "$lib/types/Cookies";

interface Auth {
    isLoggedIn: boolean;
    email: string;
}

const algIDs: Record<number, string> = {
    [-7]: "ES256",
    [-8]: "ED25519",
    [-257]: "RS256",
}

const pubKeyCredParams: PublicKeyCredentialParameters[] = [
    { alg: -7, type: "public-key" },
    { alg: -8, type: "public-key" },
    { alg: -257, type: "public-key" },
];

const createCredentials = async (email: string, challenge: ArrayBuffer): Promise<ArrayBuffer> => {

    const domain = window.location.hostname;

    const userID = generateToken();

    const credential = await navigator.credentials.create({
        publicKey: {
            challenge,
            pubKeyCredParams,
            user: {
                name: email,
                displayName: email,
                id: userID,
            },
            rp: { name: "narobin", id: domain },
        }
    }) as PublicKeyCredential|null

    if (!credential?.response)
        throw error(400, "Failed to generate credential");

    return credential.response.getPublicKey();
}

const registerUser = async (email: string, publicKey: ArrayBuffer): Promise<boolean> => {
    const response = await fetch(`/api/user/${email}`, {
        body: publicKey,
        method: "POST",
    })

    return response.ok;
}

const getChallenge = async (email: string): Promise<ArrayBuffer> => {
    const response = await fetch('/api/auth', {
        headers: {
            "email": email,
        }
    })

    return response.arrayBuffer();
}

const signChallenge = async (challenge: ArrayBuffer): Promise<ArrayBuffer> => {
    const { signature } = await navigator.credentials.get({
        publicKey: {
            challenge,
        },
    })

    return signature;
}

const authUser = async (signature: ArrayBuffer): Promise<boolean> => {
    const response = await fetch('api/auth', {
        method: 'POST',
        body: signature,
    })

    return response.ok;
}

const createAuth = () => {

    const { subscribe, set } = writable<Auth>({
        isLoggedIn: Cookies.exists("logged-in"),
        email: Cookies.get("email"),
    })

    const setLoggedIn = async (success: boolean, email: string) => {
        set({
            isLoggedIn: success,
            email,
        });
        return success;
    }

    const register = async (email: string) => {
        const challenge = await getChallenge(email);
        const publicKey = await createCredentials(email, challenge);
        const success = await registerUser(email, publicKey);
        return setLoggedIn(success, email);
    }

    const login = async (email: string) => {
        const challenge = await getChallenge(email);
        const signature = await signChallenge(challenge);
        const success = await authUser(signature);
        return setLoggedIn(success, email);
    }

    return {
        login,
        register,
        subscribe,
    }
};

export const auth = createAuth();
