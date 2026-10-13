import { toIsoDate } from '../../utils/date';
import { PRIORITIES, type Assignment } from './types';

const SUBJECTS = [
  'Lập trình Web nâng cao',
  'Cấu trúc dữ liệu & Giải thuật',
  'Mạng máy tính',
  'Hệ điều hành',
  'Cơ sở dữ liệu',
  'Tiếng Anh chuyên ngành',
  'Trí tuệ nhân tạo',
  'Kiểm thử phần mềm',
];

const TASKS = ['Bài tập chương', 'Báo cáo Lab', 'Đồ án nhóm', 'Quiz tuần', 'Bài luận', 'Thực hành'];

/** Sinh dữ liệu mẫu tất định (cùng count => cùng kết quả) để stress test danh sách. */
export function generateMockAssignments(count: number, now: Date = new Date()): Assignment[] {
  const result: Assignment[] = [];
  for (let i = 0; i < count; i++) {
    const deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate() + ((i * 7) % 61) - 20);
    result.push({
      id: `mock-${i}`,
      subject: SUBJECTS[i % SUBJECTS.length],
      title: `${TASKS[i % TASKS.length]} ${Math.floor(i / TASKS.length) + 1}`,
      deadline: toIsoDate(deadline),
      priority: PRIORITIES[i % PRIORITIES.length],
      completed: i % 4 === 0,
    });
  }
  return result;
}
