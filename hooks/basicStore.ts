import { create } from "zustand";

interface BasicStoreState {
  monthNow: number;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  setMonth: (newMonth: number) => void;
  removeAllCount: () => void;
}

const useBasicStore = create<BasicStoreState>((set) => ({
  monthNow: 0,
  increaseMonth: () => set((state) => ({ monthNow: state.monthNow + 1 })),
  decreaseMonth: () => set((state) => ({ monthNow: state.monthNow - 1 })),
  setMonth: (newMonth) => set({ monthNow: newMonth }),
  removeAllCount: () => set({ monthNow: 0 }),
}));

export default useBasicStore;
