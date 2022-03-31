import { LiveTimer, NewTimer, Timer, TimerValidationErrors } from "$lib/models/Timer";

import { Subscriber, writable } from "svelte/store";
import { browser } from "$app/env";

const defaultValue = [];
const initialValue: Timer[] = browser ? JSON.parse(localStorage.getItem('timers')) ?? defaultValue : defaultValue;

// TODO: Create custom store
// TODO: Function to subscribe to specific timer
// TODO: Implement timer IDs

export const { subscribe, update, set } = writable<LiveTimer[]>(initialValue.map(({name, date}) => ({ name: name, date: date, remaining: date - Date.now()})));

setInterval(() => update(timers => {
  timers.forEach(({ date, remaining }) => remaining = date - Date.now())
  return timers;
}), 1e3);

if (browser)
  subscribe(timers => localStorage.setItem('timers', JSON.stringify(timers.map(({name, date}) => ({ name, date })))));

export const validate = (value: NewTimer): TimerValidationErrors => {
  if (!value?.name)
    return TimerValidationErrors.NoName;
  if (!value?.date)
    return TimerValidationErrors.NoDate;
  if (!new Date(value.date))
    return TimerValidationErrors.InvalidDate;
  if (new Date(value.date).getTime() < Date.now())
    return TimerValidationErrors.DateInPast;
  if (value.name.length > 30)
    return TimerValidationErrors.NameTooLong;

  return null;
}

// TODO: Implement function to check timers for ID
// use in validation when subscribing, updating
export const hasID = () => null;

export const timers = {
  subscribe,
  subscribeTimer: (id: string, run: Subscriber<LiveTimer>) => {
    subscribe(timers => run(timers.find(timer => timer.id === id)))
  },
  update: (id: string, value: NewTimer): TimerValidationErrors => {
    const errors = validate(value);
  
    if (!errors)
      update(timers => {
        const timer = timers.find(timer => timer.id === id);
  
        timer.name = value.name ?? timer.name;
        timer.date = value.date ?? timer.date;
  
        return timers;
      });
  
    return errors;
  },
  add: (value: NewTimer): TimerValidationErrors => {
    const errors = validate(value);
  
    if (!errors)
      update(timers => {
        timers.push({
          remaining: 0,
          ...value
        })
        return timers;
      });
  
    return errors;
  },
  // TODO: Implement remove function
  remove: (id: string) => {

  }
}