import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../generated/graphql';

type GuestCartItem = {
  qty: number;
  product: Product;
};

type State = {
  carItems: GuestCartItem[] | null;
  addToGuestCart: (product: Product, qty: number) => void;
  clearCart: () => void;
  changeQty: (productId: string, qty: number) => void;
  deleteItem: (productId: string) => void;
};

export const useGuestCartStore = create<State>(
  persist(
    (set, get) => ({
      carItems: null,
      addToGuestCart: (product, qty) => {
        const prevCartItems = get().carItems;
        const existIndex = prevCartItems.findIndex(
          (item) => item.product.id === product.id
        );
        if (existIndex === -1) {
          set({ carItems: [...prevCartItems, { product, qty }] });
        } else {
          if (prevCartItems[existIndex].qty !== qty) {
            prevCartItems.splice(existIndex, 1, { product, qty });
            set({ carItems: prevCartItems });
          }
        }
      },
      clearCart() {
        set({ carItems: null });
      },
      changeQty(productId, qty) {
        const prevItems = get().carItems;
        const existIndex = prevItems.findIndex(
          (i) => i.product.id === productId
        );
        prevItems[existIndex].qty = qty;
        set({ carItems: prevItems });
      },
      deleteItem(productId) {
        set({
          carItems: get().carItems.filter(
            (item) => item.product.id !== productId
          ),
        });
      },
    }),
    { name: 'guest-cart' }
  )
);
