import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/renderWithProviders';
import { AssignmentForm } from '../AssignmentForm';

describe('AssignmentForm', () => {
  it('hiện lỗi validate và không thêm bài khi bỏ trống', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<AssignmentForm />);

    await user.click(screen.getByRole('button', { name: /thêm bài tập/i }));

    expect(screen.getByText('Vui lòng nhập môn học')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập tên bài tập')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng chọn hạn nộp')).toBeInTheDocument();
    expect(store.getState().assignments.items).toHaveLength(0);
  });

  it('thêm bài tập vào store rồi reset form', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<AssignmentForm />);

    await user.type(screen.getByLabelText('Môn học'), 'Cơ sở dữ liệu');
    await user.type(screen.getByLabelText('Tên bài tập'), 'Lab 3 - Chuẩn hoá');
    await user.type(screen.getByLabelText('Hạn nộp'), '2026-10-20');
    await user.selectOptions(screen.getByLabelText('Độ ưu tiên'), 'high');
    await user.click(screen.getByRole('button', { name: /thêm bài tập/i }));

    expect(store.getState().assignments.items).toEqual([
      expect.objectContaining({
        subject: 'Cơ sở dữ liệu',
        title: 'Lab 3 - Chuẩn hoá',
        deadline: '2026-10-20',
        priority: 'high',
        completed: false,
      }),
    ]);
    expect(screen.getByLabelText('Môn học')).toHaveValue('');
    expect(screen.getByLabelText('Độ ưu tiên')).toHaveValue('medium');
    expect(screen.queryByText(/vui lòng/i)).not.toBeInTheDocument();
  });
});
