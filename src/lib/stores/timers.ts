import { writable } from "svelte/store";
import type { Timer } from "$lib/models/Timer";
import { browser } from "$app/env";

// const initialValue: Timer[] = JSON.parse(window.localStorage.getItem('timers'));
const defaultValue = [];
const initialValue = browser ? JSON.parse(window.localStorage.getItem('theme')) ?? defaultValue : defaultValue;

const createTimers = () => {
  const { subscribe, set, update } = writable(initialValue.map(({name, date}) => ({ name: name, date: date, remaining: date - Date.now()})));

  setInterval(() => update(timers => {
    timers.forEach(({ date, remaining }) => remaining = date - Date.now())
    return timers;
  }), 1e3);

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