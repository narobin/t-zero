
const sec = 1e3;
const min = 60*sec;
const hour = 60*min;
const day = 24*hour;

export const getSeconds = (duration: number) => Math.floor(duration % (min) / sec);

export const getMinutes = (duration: number) => Math.floor(duration % (hour) / min);

export const getHours = (duration: number) => Math.floor(duration % (day) / hour);

export const getDays = (duration: number) => Math.floor(duration / day);

export const getTimer = (duration: number) => ({
    seconds: getSeconds(duration),
    minutes: getMinutes(duration),
    hours: getHours(duration),
    days: getDays(duration),
});
