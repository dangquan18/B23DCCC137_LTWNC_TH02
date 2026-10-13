import { useEffect, useMemo, useState } from 'react';
import { daysUntil, formatDaysLabel } from '../utils/date';

export interface DeadlineInfo {
  daysLeft: number;
  isOverdue: boolean;
  isDueToday: boolean;
  label: string;
}

/**
 * Custom hook nâng cao: tính toán trạng thái đếm ngược tới deadline và
 * tự cập nhật lại khi sang ngày mới (tick theo mốc nửa đêm) mà không cần
 * component cha re-render theo interval ngắn.
 */
export function useDeadlineCountdown(deadline: string): DeadlineInfo {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    const timer = setTimeout(() => setNow(new Date()), msUntilMidnight);
    return () => clearTimeout(timer);
  }, [now]);

  return useMemo(() => {
    const daysLeft = daysUntil(deadline, now);
    return {
      daysLeft,
      isOverdue: daysLeft < 0,
      isDueToday: daysLeft === 0,
      label: formatDaysLabel(daysLeft),
    };
  }, [deadline, now]);
}
