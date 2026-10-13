import { act, renderHook } from '@testing-library/react';
import { useForm } from '../useForm';

interface LoginForm extends Record<string, unknown> {
  email: string;
  password: string;
}

const initial: LoginForm = { email: '', password: '' };
const validate = (v: LoginForm) => {
  const errors: Partial<Record<keyof LoginForm, string>> = {};
  if (!v.email.includes('@')) errors.email = 'Email không hợp lệ';
  if (v.password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự';
  return errors;
};

describe('useForm', () => {
  it('setField cập nhật đúng một trường, giữ nguyên các trường khác', () => {
    const { result } = renderHook(() => useForm(initial, validate));

    act(() => result.current.setField('email', 'sv@uni.edu.vn'));

    expect(result.current.values).toEqual({ email: 'sv@uni.edu.vn', password: '' });
  });

  it('validateAll trả về false và lưu lỗi khi dữ liệu sai, true khi hợp lệ', () => {
    const { result } = renderHook(() => useForm(initial, validate));

    let ok = true;
    act(() => {
      ok = result.current.validateAll();
    });
    expect(ok).toBe(false);
    expect(result.current.errors).toEqual({ email: 'Email không hợp lệ', password: 'Mật khẩu tối thiểu 6 ký tự' });

    act(() => {
      result.current.setField('email', 'sv@uni.edu.vn');
      result.current.setField('password', '123456');
    });
    act(() => {
      ok = result.current.validateAll();
    });
    expect(ok).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('reset đưa giá trị về ban đầu và xoá lỗi', () => {
    const { result } = renderHook(() => useForm(initial, validate));
    act(() => result.current.setField('email', 'abc'));
    act(() => {
      result.current.validateAll();
    });

    act(() => result.current.reset());

    expect(result.current.values).toEqual(initial);
    expect(result.current.errors).toEqual({});
  });
});
