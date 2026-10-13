import { act, renderHook } from '@testing-library/react';
import { useDeadlineCountdown } from '../useDeadlineCountdown';

describe('useDeadlineCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 9, 13, 9, 0)); // 13/10/2026 09:00
  });
  afterEach(() => jest.useRealTimers());

  it.each([
    ['2026-10-16', { daysLeft: 3, isOverdue: false, isDueToday: false, label: 'Còn 3 ngày' }],
    ['2026-10-13', { daysLeft: 0, isOverdue: false, isDueToday: true, label: 'Hạn hôm nay' }],
    ['2026-10-11', { daysLeft: -2, isOverdue: true, isDueToday: false, label: 'Quá hạn 2 ngày' }],
  ])('deadline %s', (deadline, expected) => {
    const { result } = renderHook(() => useDeadlineCountdown(deadline));
    expect(result.current).toEqual(expected);
  });

  it('tự cập nhật khi qua nửa đêm mà không cần component cha render lại', () => {
    const { result } = renderHook(() => useDeadlineCountdown('2026-10-13'));
    expect(result.current.label).toBe('Hạn hôm nay');

    act(() => jest.advanceTimersByTime(15 * 60 * 60 * 1000 + 5000)); // tới 00:00:05 ngày 14/10

    expect(result.current).toMatchObject({ daysLeft: -1, isOverdue: true, label: 'Quá hạn 1 ngày' });
  });
});
