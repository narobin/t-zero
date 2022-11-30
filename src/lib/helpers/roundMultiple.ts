const roundMultiple = (num: number, multiple: number): number => {
  return Math.round(num / multiple) * multiple;
};

const floorMultiple = (num: number, multiple: number): number => {
  return Math.floor(num / multiple) * multiple;
};

const ceilMultiple = (num: number, multiple: number): number => {
  return Math.ceil(num / multiple) * multiple;
};

export {
  roundMultiple,
  floorMultiple,
  ceilMultiple,
};