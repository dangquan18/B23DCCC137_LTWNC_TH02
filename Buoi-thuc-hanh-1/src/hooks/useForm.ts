import { useCallback, useState } from 'react';

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

/** Custom hook generic quản lý state + validate cho một form bất kỳ kiểu T. */
export function useForm<T extends Record<string, unknown>>(initialValues: T, validate?: Validator<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const validateAll = useCallback((): boolean => {
    const nextErrors = validate ? validate(values) : {};
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [validate, values]);

  return { values, errors, setField, reset, validateAll };
}
