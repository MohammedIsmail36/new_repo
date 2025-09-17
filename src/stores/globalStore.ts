import { create } from 'zustand';

interface GlobalState {
  cartItems: Array<{ id: string; name: string; quantity: number }>;
  addToCart: (item: { id: string; name: string; quantity: number }) => void;
  notifications: Array<string>;
  addNotification: (message: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  notifications: [],
  addNotification: (message) => set((state) => ({ notifications: [...state.notifications, message] })),
}));