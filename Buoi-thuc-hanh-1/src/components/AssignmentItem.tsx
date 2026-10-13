import { useAppDispatch } from '../app/hooks';
import type { Assignment } from '../features/assignments/types';
import { removeAssignment, toggleCompleted } from '../features/assignments/assignmentsSlice';
import { useDeadlineCountdown } from '../hooks/useDeadlineCountdown';
import { formatDeadline } from '../utils/date';
import { IconBook, IconCalendar, IconTrash } from './icons';
import { PriorityBadge } from './PriorityBadge';

export function AssignmentItem({ assignment }: { assignment: Assignment }) {
  const dispatch = useAppDispatch();
  const { label, isOverdue, isDueToday } = useDeadlineCountdown(assignment.deadline);

  const statusClass = assignment.completed
    ? 'is-completed'
    : isOverdue
      ? 'is-overdue'
      : isDueToday
        ? 'is-due-today'
        : '';

  return (
    <li className={`assignment-item ${statusClass}`}>
      <label className="assignment-item__checkbox">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => dispatch(toggleCompleted(assignment.id))}
          aria-label={`Đánh dấu hoàn thành ${assignment.title}`}
        />
        <span className="assignment-item__checkbox-mark" />
      </label>

      <div className="assignment-item__body">
        <div className="assignment-item__top">
          <span className="assignment-item__subject">
            <IconBook width={13} height={13} />
            {assignment.subject}
          </span>
          <PriorityBadge priority={assignment.priority} />
        </div>
        <p className="assignment-item__title">{assignment.title}</p>
        <div className="assignment-item__meta">
          <span className="assignment-item__meta-item">
            <IconCalendar width={14} height={14} />
            Hạn: {formatDeadline(assignment.deadline)}
          </span>
          <span className="assignment-item__countdown">{label}</span>
        </div>
      </div>

      <button
        type="button"
        className="assignment-item__delete"
        onClick={() => dispatch(removeAssignment(assignment.id))}
        aria-label={`Xoá ${assignment.title}`}
      >
        <IconTrash width={16} height={16} />
      </button>
    </li>
  );
}
