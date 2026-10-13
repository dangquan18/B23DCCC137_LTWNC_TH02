import { makeAssignment } from '../../../test/fixtures';
import { generateMockAssignments } from '../mockData';
import { calcStats } from '../stats';

describe('calcStats', () => {
  const now = new Date(2026, 9, 13);

  it('đếm completed / pending / overdue và gom theo môn, môn nhiều bài xếp trước', () => {
    const items = [
      makeAssignment({ subject: 'CSDL', completed: true, deadline: '2026-10-01' }),
      makeAssignment({ subject: 'CSDL', deadline: '2026-10-10' }), // quá hạn
      makeAssignment({ subject: 'CSDL', deadline: '2026-10-20' }),
      makeAssignment({ subject: 'Mạng', deadline: '2026-10-13' }), // hạn hôm nay: chưa quá hạn
    ];

    const stats = calcStats(items, now);

    expect(stats).toMatchObject({ total: 4, completed: 1, overdue: 1, pending: 2 });
    expect(stats.bySubject).toEqual([
      { subject: 'CSDL', total: 3, completed: 1, overdue: 1 },
      { subject: 'Mạng', total: 1, completed: 0, overdue: 0 },
    ]);
  });

  it('danh sách rỗng', () => {
    expect(calcStats([], now)).toEqual({ total: 0, completed: 0, pending: 0, overdue: 0, bySubject: [] });
  });
});

describe('generateMockAssignments', () => {
  it('sinh đúng số lượng, id duy nhất và tất định', () => {
    const now = new Date(2026, 9, 13);
    const first = generateMockAssignments(500, now);
    expect(first).toHaveLength(500);
    expect(new Set(first.map((a) => a.id)).size).toBe(500);
    expect(generateMockAssignments(500, now)).toEqual(first);
  });
});
