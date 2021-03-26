import create from 'zustand';

type State = {
  msg: string | null;
  severity: 'info' | 'error' | 'success' | null;
};

export const useMsgStore = create<State>((set) => ({
  msg: null,
  severity: null,
  alert: (msg: string, severity: 'info' | 'error' | 'success') =>
    set({ msg: msg, severity }),
  clearAlert: () => set({ msg: null, severity: null }),
}));
