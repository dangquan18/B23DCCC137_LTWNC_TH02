import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('chỉ cập nhật sau khi giá trị ngừng thay đổi đủ delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    });
    expect(result.current).toBe('a');

    rerender({ value: 'ab' });
    act(() => jest.advanceTimersByTime(200));
    rerender({ value: 'abc' });
    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe('a'); // vẫn đang gõ: bộ đếm bị reset

    act(() => jest.advanceTimersByTime(100));
    expect(result.current).toBe('abc');
  });
});
