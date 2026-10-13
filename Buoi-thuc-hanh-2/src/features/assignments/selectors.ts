import { createSelector } from '@reduxjs/toolkit';
import { isOverdue } from '../../utils/date';
import { selectAssignments, selectFilter } from './assignmentsSlice';

export const selectVisibleAssignments = createSelector(
  [selectAssignments, selectFilter],
  (items, filter) => {
    switch (filter) {
      case 'completed':
        return items.filter((a) => a.completed);
      case 'incomplete':
        return items.filter((a) => !a.completed && !isOverdue(a.deadline));
      case 'overdue':
        return items.filter((a) => !a.completed && isOverdue(a.deadline));
      case 'all':
      default:
        return items;
    }
  },
);

export const selectCounts = createSelector([selectAssignments], (items) => ({
  all: items.length,
  incomplete: items.filter((a) => !a.completed && !isOverdue(a.deadline)).length,
  overdue: items.filter((a) => !a.completed && isOverdue(a.deadline)).length,
  completed: items.filter((a) => a.completed).length,
}));
