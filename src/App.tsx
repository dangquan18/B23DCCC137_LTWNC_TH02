import { lazy, Suspense, useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { AssignmentForm } from './components/AssignmentForm';
import { AssignmentList } from './components/AssignmentList';
import { FilterTabs } from './components/FilterTabs';
import { IconChart, IconGraduationCap, IconList } from './components/icons';
import { loadInitialAssignments, replaceAll } from './features/assignments/assignmentsSlice';
import { generateMockAssignments } from './features/assignments/mockData';
import { ThemeToggle } from './theme/ThemeToggle';
import './App.css';

// Trang Thống kê tách thành chunk JS riêng, chỉ tải khi người dùng mở trang.
const StatsPage = lazy(() => import('./components/StatsPage'));

type View = 'list' | 'stats';

function App() {
  const dispatch = useAppDispatch();
  const [view, setView] = useState<View>('list');

  useEffect(() => {
    const request = dispatch(loadInitialAssignments());
    // ?stress=10000 tự nạp dữ liệu lớn ngay khi mở trang, phục vụ đo Lighthouse (không bấm nút được).
    const stressCount = Number(new URLSearchParams(window.location.search).get('stress')) || 0;
    request.then((action) => {
      if (stressCount > 0 && loadInitialAssignments.fulfilled.match(action)) {
        dispatch(replaceAll(generateMockAssignments(stressCount)));
      }
    });
    return () => request.abort();
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <div className="app__logo">
            <IconGraduationCap />
          </div>
          <div>
            <h1>Student Deadline Tracker</h1>
            <p>Theo dõi deadline bài tập của bạn, đừng để nộp trễ!</p>
          </div>
        </div>

        <div className="app__actions">
          <nav className="view-switch" aria-label="Chọn trang">
            <button
              type="button"
              className={view === 'list' ? 'is-active' : ''}
              aria-current={view === 'list' ? 'page' : undefined}
              onClick={() => setView('list')}
            >
              <IconList width={16} height={16} />
              Danh sách
            </button>
            <button
              type="button"
              className={view === 'stats' ? 'is-active' : ''}
              aria-current={view === 'stats' ? 'page' : undefined}
              onClick={() => setView('stats')}
            >
              <IconChart width={16} height={16} />
              Thống kê
            </button>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {view === 'list' ? (
        <main className="app__main">
          <AssignmentForm />
          <section className="app__list-section">
            <FilterTabs />
            <AssignmentList />
          </section>
        </main>
      ) : (
        <main>
          <Suspense
            fallback={
              <div className="loading-state" role="status">
                <span className="spinner" />
                Đang tải trang thống kê...
              </div>
            }
          >
            <StatsPage />
          </Suspense>
        </main>
      )}
    </div>
  );
}

export default App;
