import {writable} from "svelte/store";

const createTime = () => {
    const { subscribe, set } = writable(Date.now());

    const interval = setInterval(() => set(Date.now()), 1e3);

    return {
        subscribe,
    }
}

export const time = createTime();
