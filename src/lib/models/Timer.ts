export interface Timer {
  // TODO: Make ID not optional after implementation
  // TODO: Convert date property to Date
  id?: string;
  name: string;
  date: number;
}

export interface NewTimer {
  name: string;
  date: number;
}

export interface LiveTimer extends Timer {
  remaining: number;
}

export enum TimerValidationErrors {
  NoName,
  NoDate,
  InvalidDate,
  DateInPast,
  NameTooLong,
}