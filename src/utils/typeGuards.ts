import { PRIORITIES, type Assignment, type Priority } from '../features/assignments/types';

// Type guard cơ bản: thu hẹp kiểu string -> Priority
export function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && (PRIORITIES as string[]).includes(value);
}

// Type guard kiểm tra một object bất kỳ có đúng hình dạng Assignment không
export function isAssignment(value: unknown): value is Assignment {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.subject === 'string' &&
    typeof v.title === 'string' &&
    typeof v.deadline === 'string' &&
    typeof v.completed === 'boolean' &&
    isPriority(v.priority)
  );
}

// Generic type guard: kiểm tra một mảng có phải toàn phần tử thoả predicate không
export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}
