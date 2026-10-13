import { isOverdue } from '../../utils/date';
import type { Assignment } from './types';

export interface SubjectStats {
  subject: string;
  total: number;
  completed: number;
  overdue: number;
}

export interface AssignmentStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  bySubject: SubjectStats[];
}

/** Thống kê: số bài đã xong, chưa xong, quá hạn (chưa xong và đã qua hạn) và theo từng môn. */
export function calcStats(items: Assignment[], now: Date = new Date()): AssignmentStats {
  const subjects = new Map<string, SubjectStats>();
  let completed = 0;
  let overdue = 0;

  for (const a of items) {
    const late = !a.completed && isOverdue(a.deadline, now);
    if (a.completed) completed++;
    if (late) overdue++;

    let s = subjects.get(a.subject);
    if (!s) {
      s = { subject: a.subject, total: 0, completed: 0, overdue: 0 };
      subjects.set(a.subject, s);
    }
    s.total++;
    if (a.completed) s.completed++;
    if (late) s.overdue++;
  }

  return {
    total: items.length,
    completed,
    pending: items.length - completed - overdue,
    overdue,
    bySubject: [...subjects.values()].sort((a, b) => b.total - a.total),
  };
}
