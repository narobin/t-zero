import { writable } from "svelte/store";
import type { Timer } from "$lib/models/Timer";

const createTimers = () => {
  const timers: Timer[] = JSON.parse(localStorage.getItem('timers'));

  const timersRemaining = timers.map(timer => timer.date -= Date.now());

  const { subscribe, set, update } = writable(timersRemaining);

  return {
    subscribe,
    delete: (id) => {

    },
    edit: (id) => {

    },
    create: () => {

    },
  }
}

export const timers = createTimers();