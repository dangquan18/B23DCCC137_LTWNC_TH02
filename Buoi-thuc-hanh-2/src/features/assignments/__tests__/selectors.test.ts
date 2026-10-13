import { daysFromNow, makeAssignment } from '../../../test/fixtures';
import { initialState, type AssignmentsState } from '../assignmentsSlice';
import { selectCounts, selectVisibleAssignments } from '../selectors';
import type { FilterStatus } from '../types';

const done = makeAssignment({ id: 'done', completed: true, deadline: daysFromNow(-3) });
const late = makeAssignment({ id: 'late', deadline: daysFromNow(-1) });
const today = makeAssignment({ id: 'today', deadline: daysFromNow(0) });
const later = makeAssignment({ id: 'later', deadline: daysFromNow(7) });
const items = [done, late, today, later];

const stateWith = (filter: FilterStatus, list = items): { assignments: AssignmentsState } => ({
  assignments: { ...initialState, items: list, filter },
});

describe('selectVisibleAssignments', () => {
  it.each<[FilterStatus, string[]]>([
    ['all', ['done', 'late', 'today', 'later']],
    ['completed', ['done']],
    ['incomplete', ['today', 'later']],
    ['overdue', ['late']],
  ])('filter "%s"', (filter, ids) => {
    expect(selectVisibleAssignments(stateWith(filter)).map((a) => a.id)).toEqual(ids);
  });

  it('memo hoá: cùng input trả về cùng tham chiếu mảng', () => {
    const state = stateWith('incomplete');
    expect(selectVisibleAssignments(state)).toBe(selectVisibleAssignments(state));
  });
});

describe('selectCounts', () => {
  it('đếm theo từng nhóm', () => {
    expect(selectCounts(stateWith('all'))).toEqual({ all: 4, incomplete: 2, overdue: 1, completed: 1 });
  });

  it('danh sách rỗng', () => {
    expect(selectCounts(stateWith('all', []))).toEqual({ all: 0, incomplete: 0, overdue: 0, completed: 0 });
  });
});
