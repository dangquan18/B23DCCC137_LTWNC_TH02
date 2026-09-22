import type { FormEvent } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addAssignment } from '../features/assignments/assignmentsSlice';
import { PRIORITIES, PRIORITY_LABEL, type NewAssignmentInput } from '../features/assignments/types';
import { useForm } from '../hooks/useForm';
import { isPriority } from '../utils/typeGuards';
import { IconPlus } from './icons';

const emptyForm: NewAssignmentInput = {
  subject: '',
  title: '',
  deadline: '',
  priority: 'medium',
};

function validate(values: NewAssignmentInput) {
  const errors: Partial<Record<keyof NewAssignmentInput, string>> = {};
  if (!values.subject.trim()) errors.subject = 'Vui lòng nhập môn học';
  if (!values.title.trim()) errors.title = 'Vui lòng nhập tên bài tập';
  if (!values.deadline) errors.deadline = 'Vui lòng chọn hạn nộp';
  return errors;
}

export function AssignmentForm() {
  const dispatch = useAppDispatch();
  const { values, errors, setField, reset, validateAll } = useForm(emptyForm, validate);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch(addAssignment(values));
    reset();
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <h2>Thêm bài tập mới</h2>

      <div className="form-row">
        <label htmlFor="subject">Môn học</label>
        <input
          id="subject"
          value={values.subject}
          onChange={(e) => setField('subject', e.target.value)}
          placeholder="VD: Lập trình Web nâng cao"
        />
        {errors.subject && <span className="form-error">{errors.subject}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="title">Tên bài tập</label>
        <input
          id="title"
          value={values.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="VD: Bài tập lớn cuối kỳ"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-row form-row--split">
        <div>
          <label htmlFor="deadline">Hạn nộp</label>
          <input
            id="deadline"
            type="date"
            value={values.deadline}
            onChange={(e) => setField('deadline', e.target.value)}
          />
          {errors.deadline && <span className="form-error">{errors.deadline}</span>}
        </div>

        <div>
          <label htmlFor="priority">Độ ưu tiên</label>
          <select
            id="priority"
            value={values.priority}
            onChange={(e) => {
              const next = e.target.value;
              if (isPriority(next)) setField('priority', next);
            }}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABEL[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="assignment-form__submit">
        <IconPlus width={16} height={16} />
        Thêm bài tập
      </button>
    </form>
  );
}
