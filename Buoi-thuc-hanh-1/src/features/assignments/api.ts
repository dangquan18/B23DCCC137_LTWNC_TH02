import type { Assignment } from './types';

function isoDaysFromNow(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

// Dữ liệu mẫu ban đầu, giả lập response từ server.
const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    subject: 'Lập trình Web nâng cao',
    title: 'Bài tập lớn: Student Deadline Tracker',
    deadline: isoDaysFromNow(5),
    priority: 'high',
    completed: false,
  },
  {
    id: 'a2',
    subject: 'Cấu trúc dữ liệu & Giải thuật',
    title: 'Báo cáo Lab 4 - Cây AVL',
    deadline: isoDaysFromNow(-2),
    priority: 'high',
    completed: false,
  },
  {
    id: 'a3',
    subject: 'Mạng máy tính',
    title: 'Bài tập nhóm chương 3',
    deadline: isoDaysFromNow(1),
    priority: 'medium',
    completed: false,
  },
  {
    id: 'a4',
    subject: 'Tiếng Anh chuyên ngành',
    title: 'Viết luận 500 từ',
    deadline: isoDaysFromNow(10),
    priority: 'low',
    completed: true,
  },
  {
    id: 'a5',
    subject: 'Hệ điều hành',
    title: 'Bài tập lập lịch CPU',
    deadline: isoDaysFromNow(-5),
    priority: 'medium',
    completed: true,
  },
];

/** Giả lập gọi API (có độ trễ mạng) để lấy danh sách bài tập ban đầu. */
export function fetchAssignmentsFromServer(): Promise<Assignment[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_ASSIGNMENTS.map((a) => ({ ...a }))), 600);
  });
}
