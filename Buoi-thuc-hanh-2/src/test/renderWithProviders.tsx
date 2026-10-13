import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { setupStore, type AppStore, type RootState } from '../app/setupStore';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

/** Render component kèm Redux store thật (không có redux-logger) cho từng test. */
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, store = setupStore(preloadedState), ...options }: ExtendedRenderOptions = {},
) {
  return { store, ...render(<Provider store={store}>{ui}</Provider>, options) };
}
