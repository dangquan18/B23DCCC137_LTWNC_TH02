import { useAppSelector } from '../app/hooks';
import { selectAssignments } from '../features/assignments/assignmentsSlice';
import { calcStats } from '../features/assignments/stats';

function percent(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

export default function StatsPage() {
  const items = useAppSelector(selectAssignments);
  const stats = calcStats(items);

  const cards = [
    { label: 'Tổng số bài tập', value: stats.total, tone: 'neutral' },
    { label: 'Đã hoàn thành', value: stats.completed, tone: 'success' },
    { label: 'Chưa hoàn thành', value: stats.pending, tone: 'info' },
    { label: 'Quá hạn', value: stats.overdue, tone: 'danger' },
  ] as const;

  return (
    <section className="stats-page">
      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.label} className={`stat-card stat-card--${c.tone}`}>
            <p className="stat-card__value">{c.value.toLocaleString('vi-VN')}</p>
            <p className="stat-card__label">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel__header">
          <h2>Tiến độ chung</h2>
          <span className="panel__hint">{percent(stats.completed, stats.total)}% đã hoàn thành</span>
        </div>
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${percent(stats.completed, stats.total)}%` }} />
        </div>
      </div>

      <div className="panel">
        <div className="panel__header">
          <h2>Theo môn học</h2>
        </div>
        {stats.bySubject.length === 0 ? (
          <p className="empty-state">Chưa có bài tập nào.</p>
        ) : (
          <table className="stats-table">
            <thead>
              <tr>
                <th>Môn học</th>
                <th>Tổng</th>
                <th>Đã xong</th>
                <th>Quá hạn</th>
                <th>Tiến độ</th>
              </tr>
            </thead>
            <tbody>
              {stats.bySubject.map((s) => (
                <tr key={s.subject}>
                  <td>{s.subject}</td>
                  <td>{s.total.toLocaleString('vi-VN')}</td>
                  <td>{s.completed.toLocaleString('vi-VN')}</td>
                  <td className={s.overdue > 0 ? 'is-danger' : undefined}>{s.overdue.toLocaleString('vi-VN')}</td>
                  <td>
                    <div className="progress progress--sm">
                      <span style={{ width: `${percent(s.completed, s.total)}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
