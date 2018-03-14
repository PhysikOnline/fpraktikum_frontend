import { InTime } from '../models/in-time';

export function inTime(start: Date, end: Date, now?: Date): InTime {
  now = now || new Date();
  if (start > now) {
    return InTime.tooEarly;
  }
  if (end < now) {
    return InTime.tooLate;
  }
  return InTime.inTime;
}
