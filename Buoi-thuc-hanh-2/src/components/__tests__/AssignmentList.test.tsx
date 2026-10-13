import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialState, type AssignmentsState } from '../../features/assignments/assignmentsSlice';
import type { Assignment } from '../../features/assignments/types';
import { usePinStore } from '../../features/pins/usePinStore';
import { makeAssignment } from '../../test/fixtures';
import { renderWithProviders } from '../../test/renderWithProviders';
import { AssignmentList } from '../AssignmentList';

function renderList(items: Assignment[], overrides: Partial<AssignmentsState> = {}) {
  return renderWithProviders(<AssignmentList />, {
    preloadedState: { assignments: { ...initialState, status: 'succeeded', items, ...overrides } },
  });
}

const cardTitles = () =>
  screen.queryAllByRole('article').map((card) => card.querySelector('.assignment-card__title')?.textContent);

describe('AssignmentList', () => {
  const items = [
    makeAssignment({ id: 'web', subject: 'Lập trình Web nâng cao', title: 'Bài tập lớn' }),
    makeAssignment({ id: 'net', subject: 'Mạng máy tính', title: 'Bài tập nhóm chương 3' }),
    makeAssignment({ id: 'db', subject: 'Cơ sở dữ liệu', title: 'Lab 5' }),
  ];

  beforeEach(() => usePinStore.setState({ pinnedIds: [] }));

  it('hiện trạng thái đang tải', () => {
    renderList([], { status: 'loading' });
    expect(screen.getByRole('status')).toHaveTextContent('Đang tải');
  });

  it('hiện thông báo lỗi khi tải thất bại', () => {
    renderList([], { status: 'failed', error: 'Mất kết nối' });
    expect(screen.getByRole('alert')).toHaveTextContent('Mất kết nối');
  });

  it('render danh sách bài tập', () => {
    renderList(items);
    expect(screen.getByText('Hiển thị 3 bài tập')).toBeInTheDocument();
    expect(cardTitles()).toEqual(['Bài tập lớn', 'Bài tập nhóm chương 3', 'Lab 5']);
  });

  it('hiện empty state theo bộ lọc khi không có bài nào', () => {
    renderList([], { filter: 'overdue' });
    expect(screen.getByText('Không có bài tập nào trong mục "Quá hạn".')).toBeInTheDocument();
  });

  describe('tìm kiếm có debounce', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('chỉ lọc sau 300 ms kể từ lần gõ cuối, theo cả tên bài và môn học, không phân biệt hoa thường', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderList(items);

      await user.type(screen.getByRole('searchbox', { name: 'Tìm kiếm bài tập' }), 'MẠNG');
      expect(cardTitles()).toHaveLength(3); // chưa đủ 300 ms

      act(() => jest.advanceTimersByTime(300));
      expect(cardTitles()).toEqual(['Bài tập nhóm chương 3']);
      expect(screen.getByText('Hiển thị 1 bài tập')).toBeInTheDocument();
    });

    it('báo không tìm thấy khi không có kết quả', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderList(items);

      await user.type(screen.getByRole('searchbox'), 'xyz');
      act(() => jest.advanceTimersByTime(300));

      expect(screen.getByText('Không tìm thấy bài tập nào khớp với "xyz".')).toBeInTheDocument();
    });
  });

  it('ghim đưa bài tập lên đầu, bấm lần nữa để bỏ ghim', async () => {
    const user = userEvent.setup();
    renderList(items);

    await user.click(screen.getByRole('button', { name: 'Ghim Lab 5' }));
    expect(cardTitles()[0]).toBe('Lab 5');
    expect(screen.getByRole('button', { name: 'Bỏ ghim Lab 5' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Bỏ ghim Lab 5' }));
    expect(cardTitles()).toEqual(['Bài tập lớn', 'Bài tập nhóm chương 3', 'Lab 5']);
  });

  it('đánh dấu hoàn thành và xoá cập nhật Redux store', async () => {
    const user = userEvent.setup();
    const { store } = renderList(items);

    await user.click(screen.getByRole('checkbox', { name: 'Đánh dấu hoàn thành Lab 5' }));
    expect(store.getState().assignments.items.find((a) => a.id === 'db')?.completed).toBe(true);
    expect(screen.getByRole('checkbox', { name: 'Đánh dấu hoàn thành Lab 5' })).toBeChecked();

    const card = screen.getByRole('checkbox', { name: /Bài tập lớn/ }).closest('article')!;
    await user.click(within(card).getByRole('button', { name: 'Xoá Bài tập lớn' }));
    expect(store.getState().assignments.items.map((a) => a.id)).toEqual(['net', 'db']);
    expect(screen.queryByText('Bài tập lớn')).not.toBeInTheDocument();
  });

  it('ảo hoá: 10.000 bài tập chỉ render số thẻ vừa khung nhìn', async () => {
    const user = userEvent.setup();
    renderList([]);

    await user.click(screen.getByRole('button', { name: /Tạo 10\.000 bài tập mẫu/ }));

    expect(screen.getByText('Hiển thị 10.000 bài tập')).toBeInTheDocument();
    const rendered = screen.getAllByRole('article').length;
    expect(rendered).toBeGreaterThan(0);
    expect(rendered).toBeLessThan(30);
  });
});
