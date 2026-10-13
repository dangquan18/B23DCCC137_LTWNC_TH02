// Buổi 1: generic + utility types + discriminated-ish literal union

export type Priority = 'high' | 'medium' | 'low';

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  deadline: string; // ISO date string (yyyy-MM-dd)
  priority: Priority;
  completed: boolean;
}

// Utility types: Omit + Pick dùng để tạo các kiểu con từ Assignment
export type NewAssignmentInput = Omit<Assignment, 'id' | 'completed'>;
export type AssignmentUpdate = Partial<Pick<Assignment, 'completed' | 'priority'>>;

export type FilterStatus = 'all' | 'incomplete' | 'overdue' | 'completed';

export interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export const PRIORITIES: readonly Priority[] = ['high', 'medium', 'low'];

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

export const FILTER_LABEL: Record<FilterStatus, string> = {
  all: 'Tất cả',
  incomplete: 'Chưa hoàn thành',
  overdue: 'Quá hạn',
  completed: 'Đã hoàn thành',
};
