import { create } from "zustand";

interface BasicStoreState {
  currentMonth: number;
  setMonth: (newMonth: number) => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  activeMonth: number | null;
  activeDate: number | null;
  setActiveMonth: (num: number) => void;
  setActiveDate: (num: number) => void;
}

const useBasicStore = create<BasicStoreState>((set) => ({
  currentMonth: 0,
  activeMonth: null,
  activeDate: null,
  increaseMonth: () =>
    set((state) => ({
      currentMonth:
        state.currentMonth < 11 ? state.currentMonth + 1 : state.currentMonth,
    })),
  decreaseMonth: () =>
    set((state) => ({
      currentMonth:
        state.currentMonth > 0 ? state.currentMonth - 1 : state.currentMonth,
    })),
  setMonth: (newMonth: number) => set({ currentMonth: newMonth }),
  setActiveMonth: (num: number) => set({ activeMonth: num }),
  setActiveDate: (num: number) => set({ activeDate: num }),
  removeAllCount: () => set({ currentMonth: 0 }),
}));

export default useBasicStore;
