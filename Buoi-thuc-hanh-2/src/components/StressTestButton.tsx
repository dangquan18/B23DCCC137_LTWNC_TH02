import { useAppDispatch } from '../app/hooks';
import { replaceAll } from '../features/assignments/assignmentsSlice';
import { generateMockAssignments } from '../features/assignments/mockData';
import { IconBolt } from './icons';

const STRESS_COUNT = 10_000;

export function StressTestButton() {
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className="secondary-button"
      onClick={() => dispatch(replaceAll(generateMockAssignments(STRESS_COUNT)))}
    >
      <IconBolt width={15} height={15} />
      Tạo 10.000 bài tập mẫu
    </button>
  );
}
