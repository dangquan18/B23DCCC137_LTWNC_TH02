import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { AssignmentForm } from './components/AssignmentForm';
import { AssignmentList } from './components/AssignmentList';
import { FilterTabs } from './components/FilterTabs';
import { IconGraduationCap } from './components/icons';
import { loadInitialAssignments, selectError, selectLoading } from './features/assignments/assignmentsSlice';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(loadInitialAssignments());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__logo">
          <IconGraduationCap />
        </div>
        <div>
          <h1>Student Deadline Tracker</h1>
          <p>Theo dõi deadline bài tập của bạn, đừng để nộp trễ!</p>
        </div>
      </header>

      <main className="app__main">
        <AssignmentForm />

        <section className="app__list-section">
          <FilterTabs />

          {loading && (
            <div className="loading-state">
              <span className="spinner" />
              Đang tải danh sách bài tập...
            </div>
          )}
          {error && <p className="error-state">{error}</p>}
          {!loading && !error && <AssignmentList />}
        </section>
      </main>
    </div>
  );
}

export default App;
