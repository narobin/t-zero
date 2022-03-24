import type { TimeRemaining } from "$lib/models/TimeRemaining";

const timeLeft = (date: Date): TimeRemaining => {
  const ms = date.getTime() - Date.now();

  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms % 864e5 / 36e5),
    minutes: Math.floor((ms % 36e5) / 6e4),
    seconds: Math.floor(ms % 6e4 / 1e3),
  }
}