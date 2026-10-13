import { act } from '@testing-library/react';
import { sortPinnedFirst } from '../sortPinnedFirst';
import { usePinStore } from '../usePinStore';

describe('sortPinnedFirst', () => {
  const items = ['a', 'b', 'c', 'd'].map((id) => ({ id }));

  it('không có ghim: trả về nguyên mảng (cùng tham chiếu)', () => {
    expect(sortPinnedFirst(items, [])).toBe(items);
  });

  it('đưa phần tử được ghim lên đầu, giữ thứ tự tương đối trong mỗi nhóm', () => {
    expect(sortPinnedFirst(items, ['d', 'b']).map((x) => x.id)).toEqual(['b', 'd', 'a', 'c']);
  });

  it('bỏ qua id ghim không có trong danh sách', () => {
    expect(sortPinnedFirst(items, ['zzz']).map((x) => x.id)).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('usePinStore', () => {
  beforeEach(() => usePinStore.setState({ pinnedIds: [] }));

  it('togglePin ghim rồi bỏ ghim', () => {
    act(() => usePinStore.getState().togglePin('x'));
    expect(usePinStore.getState().pinnedIds).toEqual(['x']);
    expect(usePinStore.getState().isPinned('x')).toBe(true);

    act(() => usePinStore.getState().togglePin('x'));
    expect(usePinStore.getState().pinnedIds).toEqual([]);
    expect(usePinStore.getState().isPinned('x')).toBe(false);
  });
});
