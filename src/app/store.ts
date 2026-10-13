import { createLogger } from 'redux-logger';
import { setupStore } from './setupStore';

const devMiddleware = import.meta.env.DEV ? [createLogger({ collapsed: true })] : [];

export const store = setupStore(undefined, devMiddleware);
