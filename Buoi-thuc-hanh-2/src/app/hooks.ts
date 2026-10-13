import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './setupStore';

// Typed hooks: dùng thay cho useDispatch/useSelector thô trong toàn app
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
