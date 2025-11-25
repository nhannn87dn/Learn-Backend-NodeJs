import { create } from 'zustand'


export type msgType = 'success' | 'error' | 'info' | 'warning';
interface AppMessageActions {
    msg: string | null; 
    type: msgType
}

interface AppMessageStore {
  msg: string | null;
  type: msgType,
  sendMessage: (data: AppMessageActions) => void;
    clearMessage: () => void;
}


export const useAppMessage = create<AppMessageStore>((set) => ({
  msg: null,
  type: 'info',
  sendMessage: (data: AppMessageActions) => set(() => ({ msg: data.msg, type: data.type })),
  clearMessage: () => set(() => ({ msg: null, type: 'info'})),
}))