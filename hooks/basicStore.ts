import { create } from "zustand";

interface BasicStoreState {
  currentMonth: number;
  activeMonth: number | null;
  activeDate: number | null;
  activeDateLine: number;
  setMonth: (newMonth: number) => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  setActiveMonth: (num: number) => void;
  setActiveDate: (num: number) => void;
  setActiveDateLine: (num: number) => void;
}

const useBasicStore = create<BasicStoreState>((set) => ({
  currentMonth: 0,
  activeMonth: null,
  activeDate: null,
  activeDateLine: 0,
  setMonth: (newMonth: number) => set({ currentMonth: newMonth }),
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
  setActiveMonth: (num: number) => set({ activeMonth: num }),
  setActiveDate: (num: number) => set({ activeDate: num }),
  removeAllCount: () => set({ currentMonth: 0 }),
  setActiveDateLine: (num: number) => set({ activeDateLine: num }),
}));

export default useBasicStore;
