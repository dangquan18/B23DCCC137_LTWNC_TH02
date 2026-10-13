import type { Assignment } from '../features/assignments/types';
import { toIsoDate } from '../utils/date';

/** Ngày dạng yyyy-MM-dd cách hôm nay `offset` ngày (âm = quá khứ). */
export function daysFromNow(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toIsoDate(d);
}

let seq = 0;

export function makeAssignment(overrides: Partial<Assignment> = {}): Assignment {
  seq++;
  return {
    id: `t${seq}`,
    subject: 'Lập trình Web nâng cao',
    title: `Bài tập ${seq}`,
    deadline: daysFromNow(3),
    priority: 'medium',
    completed: false,
    ...overrides,
  };
}
