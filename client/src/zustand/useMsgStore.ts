import create from 'zustand';
import { msgStore } from './messageStore';

export const useMsgStore = create(msgStore);
