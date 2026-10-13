import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { fetchAssignmentsFromServer } from '../features/assignments/api';
import { daysFromNow, makeAssignment } from '../test/fixtures';
import { renderWithProviders } from '../test/renderWithProviders';
import { ThemeProvider } from '../theme/ThemeProvider';

jest.mock('../features/assignments/api');

const items = [
  makeAssignment({ subject: 'Mạng máy tính', title: 'Bài tập chương 3', deadline: daysFromNow(2) }),
  makeAssignment({ subject: 'Hệ điều hành', title: 'Lập lịch CPU', deadline: daysFromNow(-2) }),
  makeAssignment({ subject: 'Mạng máy tính', title: 'Viết luận', completed: true }),
];

function renderApp() {
  return renderWithProviders(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
}

describe('App (tích hợp)', () => {
  beforeEach(() => {
    jest.mocked(fetchAssignmentsFromServer).mockResolvedValue(items.map((a) => ({ ...a })));
    localStorage.clear();
  });

  it('tải dữ liệu ban đầu rồi lọc theo tab', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByRole('status')).toHaveTextContent('Đang tải');
    expect(await screen.findByText('Hiển thị 3 bài tập')).toBeInTheDocument();

    const overdueTab = screen.getByRole('button', { name: /^Quá hạn/ });
    expect(within(overdueTab).getByText('1')).toBeInTheDocument();
    await user.click(overdueTab);

    expect(overdueTab).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Hiển thị 1 bài tập')).toBeInTheDocument();
    expect(screen.getByText('Lập lịch CPU')).toBeInTheDocument();
  });

  it('chuyển sang trang Thống kê (lazy load) và quay lại', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('Hiển thị 3 bài tập');

    await user.click(screen.getByRole('button', { name: 'Thống kê' }));

    const table = await screen.findByRole('table');
    expect(screen.getByText('33% đã hoàn thành')).toBeInTheDocument();
    const networkRow = within(table).getByText('Mạng máy tính').closest('tr')!;
    expect(within(networkRow).getAllByRole('cell').map((c) => c.textContent)).toEqual([
      'Mạng máy tính',
      '2',
      '1',
      '0',
      '',
    ]);

    await user.click(screen.getByRole('button', { name: 'Danh sách' }));
    expect(screen.getByText('Hiển thị 3 bài tập')).toBeInTheDocument();
  });

  it('đổi theme và lưu vào localStorage', async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText('Hiển thị 3 bài tập');

    await user.click(screen.getByRole('button', { name: 'Chuyển sang giao diện tối' }));

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('sdt-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Chuyển sang giao diện sáng' })).toBeInTheDocument();
  });
});
