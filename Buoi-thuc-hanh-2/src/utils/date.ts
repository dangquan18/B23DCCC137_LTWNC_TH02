const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

// new Date('yyyy-MM-dd') hiểu là nửa đêm UTC, lệch 1 ngày ở múi giờ âm => tự parse theo giờ địa phương.
export function parseLocalDate(value: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
}

export function toIsoDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Số ngày còn lại tới deadline (âm nếu đã quá hạn), tính theo mốc đầu ngày. */
export function calcDaysLeft(deadline: string, now: Date = new Date()): number {
  return Math.round((startOfDay(parseLocalDate(deadline)) - startOfDay(now)) / MS_PER_DAY);
}

export function isOverdue(deadline: string, now: Date = new Date()): boolean {
  return calcDaysLeft(deadline, now) < 0;
}

/** Trả về nhãn hiển thị dạng "Còn X ngày" / "Quá hạn Y ngày" / "Hạn hôm nay". */
export function formatDaysLabel(daysLeft: number): string {
  if (daysLeft === 0) return 'Hạn hôm nay';
  if (daysLeft > 0) return `Còn ${daysLeft} ngày`;
  return `Quá hạn ${Math.abs(daysLeft)} ngày`;
}

export function formatDeadline(deadline: string): string {
  return parseLocalDate(deadline).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
