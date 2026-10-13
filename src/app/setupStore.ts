import { combineReducers, configureStore, type Middleware } from '@reduxjs/toolkit';
import assignmentsReducer from '../features/assignments/assignmentsSlice';

const rootReducer = combineReducers({
  assignments: assignmentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Tách khỏi store.ts (nơi dùng import.meta.env) để test có thể tạo store riêng.
export function setupStore(preloadedState?: Partial<RootState>, extraMiddleware: Middleware[] = []) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extraMiddleware),
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
