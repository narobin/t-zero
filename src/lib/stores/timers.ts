import { writable } from "svelte/store";
import type { Timer } from "$lib/models/Timer";
import { browser } from "$app/env";

const defaultValue = [];
const initialValue: Timer[] = browser ? JSON.parse(localStorage.getItem('timers')) ?? defaultValue : defaultValue;

export const timers = writable(initialValue.map(({name, date}) => ({ name: name, date: date, remaining: date - Date.now()})));

setInterval(() => timers.update(timers => {
  timers.forEach(({ date, remaining }) => remaining = date - Date.now())
  return timers;
}), 1e3);

if (browser)
  timers.subscribe(timers => localStorage.setItem('timers', JSON.stringify(timers.map(({name, date}) => ({ name, date })))));
