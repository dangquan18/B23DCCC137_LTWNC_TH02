import { PRIORITY_LABEL, type Priority } from '../features/assignments/types';

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={`priority-badge priority-badge--${priority}`}>{PRIORITY_LABEL[priority]}</span>;
}
