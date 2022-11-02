import { readable } from "svelte/store";

export const time = readable(Date.now(), function start(set) {
	const interval = setInterval(() => {
		set(Date.now());
	}, 1e3);

	return function stop() {
		clearInterval(interval);
	};
});