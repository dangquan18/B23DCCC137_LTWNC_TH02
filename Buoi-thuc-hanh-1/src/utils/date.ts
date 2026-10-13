const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Số ngày còn lại tới deadline (âm nếu đã quá hạn), tính theo mốc đầu ngày. */
export function daysUntil(deadline: string, now: Date = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(deadline);
  const targetStart = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((targetStart.getTime() - today.getTime()) / MS_PER_DAY);
}

export function isOverdue(deadline: string, now: Date = new Date()): boolean {
  return daysUntil(deadline, now) < 0;
}

/** Trả về nhãn hiển thị dạng "Còn X ngày" / "Quá hạn Y ngày" / "Hạn hôm nay". */
export function formatDaysLabel(daysLeft: number): string {
  if (daysLeft === 0) return 'Hạn hôm nay';
  if (daysLeft > 0) return `Còn ${daysLeft} ngày`;
  return `Quá hạn ${Math.abs(daysLeft)} ngày`;
}

export function formatDeadline(deadline: string): string {
  const d = new Date(deadline);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
