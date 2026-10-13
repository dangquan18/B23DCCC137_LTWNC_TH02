import { memo } from 'react';
import type { Assignment } from '../features/assignments/types';
import { useDeadlineCountdown } from '../hooks/useDeadlineCountdown';
import { formatDeadline } from '../utils/date';
import { IconBook, IconCalendar, IconPin, IconTrash } from './icons';
import { PriorityBadge } from './PriorityBadge';

export interface AssignmentCardProps {
  assignment: Assignment;
  pinned: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

// memo: Immer giữ nguyên tham chiếu các bài tập không đổi và handler từ cha được bọc useCallback,
// nên card chỉ render lại khi chính bài tập đó (hoặc trạng thái ghim của nó) thay đổi.
export const AssignmentCard = memo(function AssignmentCard({
  assignment,
  pinned,
  onToggleComplete,
  onDelete,
  onTogglePin,
}: AssignmentCardProps) {
  const { label, isOverdue, isDueToday } = useDeadlineCountdown(assignment.deadline);

  const statusClass = assignment.completed
    ? 'is-completed'
    : isOverdue
      ? 'is-overdue'
      : isDueToday
        ? 'is-due-today'
        : '';

  return (
    <article className={`assignment-card ${statusClass}${pinned ? ' is-pinned' : ''}`}>
      <label className="assignment-card__checkbox">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => onToggleComplete(assignment.id)}
          aria-label={`Đánh dấu hoàn thành ${assignment.title}`}
        />
        <span className="assignment-card__checkbox-mark" />
      </label>

      <div className="assignment-card__body">
        <div className="assignment-card__top">
          <span className="assignment-card__subject">
            <IconBook width={13} height={13} />
            {assignment.subject}
          </span>
          <PriorityBadge priority={assignment.priority} />
        </div>
        <p className="assignment-card__title" title={assignment.title}>
          {assignment.title}
        </p>
        <div className="assignment-card__meta">
          <span className="assignment-card__meta-item">
            <IconCalendar width={14} height={14} />
            Hạn: {formatDeadline(assignment.deadline)}
          </span>
          <span className="assignment-card__countdown">{label}</span>
        </div>
      </div>

      <div className="assignment-card__actions">
        <button
          type="button"
          className={`assignment-card__pin${pinned ? ' is-active' : ''}`}
          onClick={() => onTogglePin(assignment.id)}
          aria-pressed={pinned}
          aria-label={pinned ? `Bỏ ghim ${assignment.title}` : `Ghim ${assignment.title}`}
        >
          <IconPin width={16} height={16} />
        </button>
        <button
          type="button"
          className="assignment-card__delete"
          onClick={() => onDelete(assignment.id)}
          aria-label={`Xoá ${assignment.title}`}
        >
          <IconTrash width={16} height={16} />
        </button>
      </div>
    </article>
  );
});
