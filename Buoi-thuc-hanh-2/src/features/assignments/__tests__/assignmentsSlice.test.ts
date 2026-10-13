import { setupStore } from '../../../app/setupStore';
import { makeAssignment } from '../../../test/fixtures';
import { fetchAssignmentsFromServer } from '../api';
import reducer, {
  addAssignment,
  initialState,
  loadInitialAssignments,
  removeAssignment,
  replaceAll,
  setFilter,
  toggleCompleted,
  updateAssignment,
} from '../assignmentsSlice';

jest.mock('../api');
const mockFetch = jest.mocked(fetchAssignmentsFromServer);

describe('assignmentsSlice reducers', () => {
  const a = makeAssignment({ id: 'a' });
  const b = makeAssignment({ id: 'b' });
  const withItems = { ...initialState, items: [a, b] };

  it('addAssignment thêm vào đầu danh sách với id mới và completed = false', () => {
    const state = reducer(
      withItems,
      addAssignment({ subject: 'CSDL', title: 'Lab 1', deadline: '2026-10-20', priority: 'high' }),
    );
    expect(state.items).toHaveLength(3);
    expect(state.items[0]).toMatchObject({ subject: 'CSDL', title: 'Lab 1', completed: false });
    expect(state.items[0].id).toEqual(expect.any(String));
    expect(state.items[0].id).not.toBe('a');
  });

  it('toggleCompleted đảo trạng thái của đúng bài tập, bỏ qua id không tồn tại', () => {
    const state = reducer(withItems, toggleCompleted('b'));
    expect(state.items.map((x) => x.completed)).toEqual([false, true]);
    expect(reducer(withItems, toggleCompleted('khong-co'))).toEqual(withItems);
  });

  it('toggleCompleted giữ nguyên tham chiếu các bài tập khác (cần cho React.memo)', () => {
    const state = reducer(withItems, toggleCompleted('b'));
    expect(state.items[0]).toBe(a);
    expect(state.items[1]).not.toBe(b);
  });

  it('updateAssignment gộp các thay đổi', () => {
    const state = reducer(withItems, updateAssignment({ id: 'a', changes: { priority: 'low', completed: true } }));
    expect(state.items[0]).toMatchObject({ id: 'a', priority: 'low', completed: true });
  });

  it('removeAssignment xoá theo id', () => {
    expect(reducer(withItems, removeAssignment('a')).items).toEqual([b]);
  });

  it('replaceAll và setFilter', () => {
    expect(reducer(withItems, replaceAll([b])).items).toEqual([b]);
    expect(reducer(withItems, setFilter('overdue')).filter).toBe('overdue');
  });
});

describe('loadInitialAssignments thunk', () => {
  it('pending -> succeeded và nạp dữ liệu từ API', async () => {
    const items = [makeAssignment()];
    mockFetch.mockResolvedValue(items);
    const store = setupStore();

    const promise = store.dispatch(loadInitialAssignments());
    expect(store.getState().assignments.status).toBe('loading');
    await promise;

    expect(store.getState().assignments).toMatchObject({ status: 'succeeded', items, error: null });
  });

  it('lỗi API -> failed kèm thông báo lỗi', async () => {
    mockFetch.mockRejectedValue(new Error('Mất kết nối'));
    const store = setupStore();

    await store.dispatch(loadInitialAssignments());

    expect(store.getState().assignments).toMatchObject({ status: 'failed', error: 'Mất kết nối' });
  });

  it('request bị huỷ (abort) không bị coi là lỗi', async () => {
    mockFetch.mockReturnValue(new Promise(() => {}));
    const store = setupStore();

    const promise = store.dispatch(loadInitialAssignments());
    promise.abort();
    await promise;

    expect(store.getState().assignments.status).toBe('loading');
    expect(store.getState().assignments.error).toBeNull();
  });
});
