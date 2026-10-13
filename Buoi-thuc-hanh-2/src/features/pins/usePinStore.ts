import { create } from 'zustand';

// State giao diện đơn giản (chỉ là danh sách id được ghim) nên để ở Zustand, không đưa vào Redux.
interface PinState {
  pinnedIds: string[];
  togglePin: (id: string) => void;
  isPinned: (id: string) => boolean;
}

export const usePinStore = create<PinState>()((set, get) => ({
  pinnedIds: [],
  togglePin: (id) =>
    set((state) => ({
      pinnedIds: state.pinnedIds.includes(id)
        ? state.pinnedIds.filter((pinned) => pinned !== id)
        : [...state.pinnedIds, id],
    })),
  isPinned: (id) => get().pinnedIds.includes(id),
}));
