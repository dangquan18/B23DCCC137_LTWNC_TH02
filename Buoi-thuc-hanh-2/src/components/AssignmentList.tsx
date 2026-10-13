import { useCallback, useMemo, useState } from 'react';
import { List, type RowComponentProps } from 'react-window';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeAssignment,
  selectError,
  selectFilter,
  selectStatus,
  toggleCompleted,
} from '../features/assignments/assignmentsSlice';
import { selectVisibleAssignments } from '../features/assignments/selectors';
import { FILTER_LABEL, type Assignment } from '../features/assignments/types';
import { sortPinnedFirst } from '../features/pins/sortPinnedFirst';
import { usePinStore } from '../features/pins/usePinStore';
import { useDebounce } from '../hooks/useDebounce';
import { AssignmentCard } from './AssignmentCard';
import { IconInbox } from './icons';
import { SearchBox } from './SearchBox';
import { StressTestButton } from './StressTestButton';

// Khớp với .assignment-card (height 104px) + khoảng cách 10px giữa các dòng.
const ROW_HEIGHT = 114;
const MAX_LIST_HEIGHT = 680;

interface RowData {
  items: Assignment[];
  pinnedSet: Set<string>;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

function AssignmentRow({ index, style, ariaAttributes, items, pinnedSet, ...handlers }: RowComponentProps<RowData>) {
  const assignment = items[index];
  return (
    <div style={style} className="assignment-row" {...ariaAttributes}>
      <AssignmentCard assignment={assignment} pinned={pinnedSet.has(assignment.id)} {...handlers} />
    </div>
  );
}

export function AssignmentList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const filter = useAppSelector(selectFilter);
  const items = useAppSelector(selectVisibleAssignments);
  const pinnedIds = usePinStore((s) => s.pinnedIds);
  const togglePin = usePinStore((s) => s.togglePin);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const keyword = debouncedQuery.trim().toLowerCase();
  // Lọc 10.000 phần tử chỉ chạy lại khi từ khoá (đã debounce), danh sách hoặc danh sách ghim đổi,
  // không chạy ở mỗi lần gõ phím.
  const visible = useMemo(() => {
    const matched = keyword
      ? items.filter(
          (a) => a.title.toLowerCase().includes(keyword) || a.subject.toLowerCase().includes(keyword),
        )
      : items;
    return sortPinnedFirst(matched, pinnedIds);
  }, [items, keyword, pinnedIds]);

  const pinnedSet = useMemo(() => new Set(pinnedIds), [pinnedIds]);
  const handleToggleComplete = useCallback((id: string) => dispatch(toggleCompleted(id)), [dispatch]);
  const handleDelete = useCallback((id: string) => dispatch(removeAssignment(id)), [dispatch]);

  const rowProps = useMemo<RowData>(
    () => ({
      items: visible,
      pinnedSet,
      onToggleComplete: handleToggleComplete,
      onDelete: handleDelete,
      onTogglePin: togglePin,
    }),
    [visible, pinnedSet, handleToggleComplete, handleDelete, togglePin],
  );

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="loading-state" role="status">
        <span className="spinner" />
        Đang tải danh sách bài tập...
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <p className="error-state" role="alert">
        {error}
      </p>
    );
  }

  const listHeight = Math.min(visible.length * ROW_HEIGHT, MAX_LIST_HEIGHT);

  return (
    <>
      <div className="list-toolbar">
        <SearchBox value={query} onChange={setQuery} />
        <StressTestButton />
      </div>

      <p className="list-summary">Hiển thị {visible.length.toLocaleString('vi-VN')} bài tập</p>

      {visible.length === 0 ? (
        <div className="empty-state">
          <IconInbox width={36} height={36} />
          <p>
            {keyword
              ? `Không tìm thấy bài tập nào khớp với "${debouncedQuery.trim()}".`
              : `Không có bài tập nào trong mục "${FILTER_LABEL[filter]}".`}
          </p>
        </div>
      ) : (
        // Ảo hoá: chỉ render các dòng đang nằm trong khung nhìn (+ vài dòng đệm) thay vì cả 10.000 thẻ.
        <List
          className="assignment-list"
          rowComponent={AssignmentRow}
          rowCount={visible.length}
          rowHeight={ROW_HEIGHT}
          rowProps={rowProps}
          defaultHeight={listHeight}
          style={{ height: listHeight }}
        />
      )}
    </>
  );
}
