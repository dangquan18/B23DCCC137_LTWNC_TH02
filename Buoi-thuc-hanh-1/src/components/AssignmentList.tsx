import { useAppSelector } from '../app/hooks';
import { selectVisibleAssignments } from '../features/assignments/selectors';
import { selectFilter } from '../features/assignments/assignmentsSlice';
import { FILTER_LABEL } from '../features/assignments/types';
import { AssignmentItem } from './AssignmentItem';
import { IconInbox } from './icons';

export function AssignmentList() {
  const items = useAppSelector(selectVisibleAssignments);
  const filter = useAppSelector(selectFilter);

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <IconInbox width={36} height={36} />
        <p>
          Không có bài tập nào trong mục "{FILTER_LABEL[filter]}".
        </p>
      </div>
    );
  }

  return (
    <ul className="assignment-list">
      {items.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} />
      ))}
    </ul>
  );
}
