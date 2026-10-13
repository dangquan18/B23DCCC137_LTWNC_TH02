import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setFilter, selectFilter } from '../features/assignments/assignmentsSlice';
import { selectCounts } from '../features/assignments/selectors';
import { FILTER_LABEL, type FilterStatus } from '../features/assignments/types';
import { Tabs } from './Tabs';

const FILTERS: FilterStatus[] = ['all', 'incomplete', 'overdue', 'completed'];

export function FilterTabs() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const counts = useAppSelector(selectCounts);

  return (
    <Tabs value={filter} onChange={(next: FilterStatus) => dispatch(setFilter(next))}>
      <Tabs.List>
        {FILTERS.map((status) => (
          <Tabs.Tab key={status} value={status} count={counts[status]}>
            {FILTER_LABEL[status]}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
