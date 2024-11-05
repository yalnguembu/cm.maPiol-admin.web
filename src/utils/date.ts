export const dateToString = (date: string | number) =>
  new Date(date).toDateString();

export const hourToString = (hour: number) => new Date(hour).toTimeString();