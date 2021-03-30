import {
  Cart,
  useAddGuestItemsToCartMutation,
  GuestItem,
  useGetMyCartQuery,
  useMeQuery,
} from '../generated/graphql';
import { useGuestCartStore } from '../zustand/useGuestCartStore';

export const useMergeCart = async () => {
  const [{ data: userData, fetching: userLoading }] = useMeQuery();
  const [{ data: cartData, fetching }] = useGetMyCartQuery();
  const userCartItems = cartData?.getMyCart?.cartItems || [];
  const guestCartItems = useGuestCartStore((state) => state.carItems);
  const clearGuestCart = useGuestCartStore((state) => state.clearCart);
  const itemsToAdd: GuestItem[] = [];
  guestCartItems.forEach((guestItem) => {
    const existIndex = userCartItems.findIndex(
      (item) => item.product.id === guestItem.product.id
    );
    if (existIndex === -1) {
      itemsToAdd.push({ productId: guestItem.product.id, qty: guestItem.qty });
    } else {
      const dupItem = userCartItems[existIndex];
      if (dupItem.qty !== guestItem.qty) {
        itemsToAdd.push({
          productId: guestItem.product.id,
          qty: guestItem.qty,
        });
      }
    }
  });
  const [
    { data, fetching: addingGuestItemToCart },
    addGuestItemsToCart,
  ] = useAddGuestItemsToCartMutation();
  await addGuestItemsToCart({ guestItems: itemsToAdd });
  if (data.addGuestItemsToCart.length === itemsToAdd.length) clearGuestCart();
  return { loading: addGuestItemsToCart };
};
