import { useAppSelector } from '../app/hooks';
import { selectCounts } from '../features/assignments/selectors';
import { IconAlert, IconCheckCircle, IconClock, IconListChecks } from './icons';

export function StatsBar() {
  const counts = useAppSelector(selectCounts);

  const stats = [
    { key: 'all', label: 'Tổng số', value: counts.all, icon: IconListChecks, tone: 'neutral' as const },
    { key: 'incomplete', label: 'Chưa hoàn thành', value: counts.incomplete, icon: IconClock, tone: 'info' as const },
    { key: 'overdue', label: 'Quá hạn', value: counts.overdue, icon: IconAlert, tone: 'danger' as const },
    { key: 'completed', label: 'Đã hoàn thành', value: counts.completed, icon: IconCheckCircle, tone: 'success' as const },
  ];

  return (
    <div className="stats-bar">
      {stats.map(({ key, label, value, icon: Icon, tone }) => (
        <div key={key} className={`stat-card stat-card--${tone}`}>
          <div className="stat-card__icon">
            <Icon />
          </div>
          <div>
            <p className="stat-card__value">{value}</p>
            <p className="stat-card__label">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
