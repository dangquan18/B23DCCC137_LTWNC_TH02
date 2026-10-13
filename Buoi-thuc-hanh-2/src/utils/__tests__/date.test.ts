import { calcDaysLeft, formatDaysLabel, isOverdue, parseLocalDate, toIsoDate } from '../date';

describe('date utils', () => {
  const now = new Date(2026, 9, 13, 15, 30); // 13/10/2026 15:30 giờ địa phương

  it('parseLocalDate hiểu yyyy-MM-dd theo giờ địa phương, không lệch ngày', () => {
    const d = parseLocalDate('2026-10-13');
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 9, 13]);
  });

  it('toIsoDate thêm số 0 ở tháng/ngày', () => {
    expect(toIsoDate(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('calcDaysLeft tính theo mốc đầu ngày', () => {
    expect(calcDaysLeft('2026-10-13', now)).toBe(0);
    expect(calcDaysLeft('2026-10-16', now)).toBe(3);
    expect(calcDaysLeft('2026-10-11', now)).toBe(-2);
  });

  it('isOverdue chỉ đúng khi deadline đã qua (hạn hôm nay chưa quá hạn)', () => {
    expect(isOverdue('2026-10-12', now)).toBe(true);
    expect(isOverdue('2026-10-13', now)).toBe(false);
  });

  it.each([
    [0, 'Hạn hôm nay'],
    [4, 'Còn 4 ngày'],
    [-3, 'Quá hạn 3 ngày'],
  ])('formatDaysLabel(%i) = "%s"', (days, label) => {
    expect(formatDaysLabel(days)).toBe(label);
  });
});
