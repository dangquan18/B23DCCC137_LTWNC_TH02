import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchAssignmentsFromServer } from './api';
import type { Assignment, AssignmentUpdate, FilterStatus, NewAssignmentInput } from './types';

interface AssignmentsState {
  items: Assignment[];
  filter: FilterStatus;
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentsState = {
  items: [],
  filter: 'all',
  loading: false,
  error: null,
};

// createAsyncThunk: lấy danh sách bài tập mẫu ban đầu từ API giả lập
export const loadInitialAssignments = createAsyncThunk<Assignment[]>(
  'assignments/loadInitial',
  async () => {
    return await fetchAssignmentsFromServer();
  },
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: {
      reducer(state, action: PayloadAction<Assignment>) {
        state.items.unshift(action.payload);
      },
      prepare(input: NewAssignmentInput) {
        return { payload: { ...input, id: nanoid(), completed: false } as Assignment };
      },
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      const item = state.items.find((a) => a.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    updateAssignment(state, action: PayloadAction<{ id: string; changes: AssignmentUpdate }>) {
      const item = state.items.find((a) => a.id === action.payload.id);
      if (item) Object.assign(item, action.payload.changes);
    },
    removeAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((a) => a.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<FilterStatus>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitialAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInitialAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadInitialAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Không thể tải danh sách bài tập.';
      });
  },
});

export const { addAssignment, toggleCompleted, updateAssignment, removeAssignment, setFilter } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;

export const selectAssignments = (state: RootState) => state.assignments.items;
export const selectFilter = (state: RootState) => state.assignments.filter;
export const selectLoading = (state: RootState) => state.assignments.loading;
export const selectError = (state: RootState) => state.assignments.error;
