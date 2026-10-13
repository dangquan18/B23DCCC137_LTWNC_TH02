import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAssignmentsFromServer } from './api';
import type { Assignment, AssignmentUpdate, FilterStatus, NewAssignmentInput } from './types';

export type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AssignmentsState {
  items: Assignment[];
  filter: FilterStatus;
  status: LoadStatus;
  error: string | null;
}

export const initialState: AssignmentsState = {
  items: [],
  filter: 'all',
  status: 'idle',
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
    replaceAll(state, action: PayloadAction<Assignment[]>) {
      state.items = action.payload;
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
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadInitialAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadInitialAssignments.rejected, (state, action) => {
        // Request bị huỷ (component unmount / StrictMode chạy effect 2 lần) không phải lỗi thật.
        if (action.meta.aborted) return;
        state.status = 'failed';
        state.error = action.error.message ?? 'Không thể tải danh sách bài tập.';
      });
  },
});

export const {
  addAssignment,
  replaceAll,
  toggleCompleted,
  updateAssignment,
  removeAssignment,
  setFilter,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;

interface WithAssignments {
  assignments: AssignmentsState;
}

export const selectAssignments = (state: WithAssignments) => state.assignments.items;
export const selectFilter = (state: WithAssignments) => state.assignments.filter;
export const selectStatus = (state: WithAssignments) => state.assignments.status;
export const selectError = (state: WithAssignments) => state.assignments.error;
