import create from 'zustand/vanilla';

type State = {
  msg: string | null;
  severity: 'info' | 'error' | 'success' | null;
  alert: (msg: string, severity: 'info' | 'error' | 'success') => void;
  clearAlert: () => void;
};

export const msgStore = create<State>((set) => ({
  msg: null,
  severity: null,
  alert: (msg, severity) => set({ msg: msg, severity }),
  clearAlert: () => set({ msg: null, severity: null }),
}));
