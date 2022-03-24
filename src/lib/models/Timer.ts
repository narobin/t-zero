export interface Timer {
  // TODO: Make ID not optional after implementation
  id?: string;
  name: string;
  date: number;
}

export interface LiveTimer extends Timer {

}