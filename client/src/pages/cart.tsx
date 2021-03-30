import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import Loader from '../components/Loader';
import Layout from '../containers/Layout';
import {
  useGetMyCartQuery,
  useChangeItemQtyMutation,
  useDeleteCartItemMutation,
  useMeQuery,
} from '../generated/graphql';
import styles from '../styles/pages/CartPage.module.scss';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useGuestCartStore } from '../zustand/useGuestCartStore';

const CartPage = () => {
  const [{ data: userData, fetching: userLoading }] = useMeQuery();
  const [{ data, fetching }] = useGetMyCartQuery();
  const cartItems = data?.getMyCart?.cartItems || [];
  // const guestCartItems = useGuestCartStore((state) => state.carItems);
  const totalItemsQty = cartItems.reduce((qty, item) => (qty += item.qty), 0);
  const totalPrice = cartItems
    .reduce((price, item) => (price += item.product.price * item.qty), 0)
    .toFixed(2);

  const [, changeQty] = useChangeItemQtyMutation();
  const [, deleteItem] = useDeleteCartItemMutation();

  let cartBody = null;

  if (fetching) cartBody = <Loader />;
  if (data) {
    cartBody = (
      <>
        <h3 className='uppercase'>My Shopping Cart</h3>
        <div className={styles.cartPage}>
          <div className={styles.cartPage__cartItemList}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartPage__cartItem}>
                  <Image
                    src={item.product.image}
                    width={100}
                    height={100}
                    layout='responsive'
                    objectFit='cover'
                  />
                  <h3>{item.product.name}</h3>
                  <strong>${(item.qty * item.product.price).toFixed(2)}</strong>
                  <input
                    type='number'
                    min={1}
                    className='input'
                    max={item.product.countInStock}
                    value={item.qty}
                    onChange={(e) =>
                      changeQty({
                        cartItemId: item.id,
                        qty: Number(e.target.value),
                      })
                    }
                  />
                  <button
                    onClick={() => deleteItem({ cartItemId: item.id })}
                    title='Delete this item from cart'
                    className='btn'
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </div>
              ))
            ) : (
              <>
                <h4>
                  You cart is empty <i className='fas fa-shopping-cart'></i>
                </h4>
                {!userLoading && userData && !userData.me && (
                  <NextLink href='/login'>
                    <a style={{ color: '#3a81d3' }}>Login to continue</a>
                  </NextLink>
                )}
              </>
            )}
          </div>
          <div className={styles.cartPage__stats}>
            <h3 className='uppercase'>Subtotal ({totalItemsQty}) items</h3>
            <p>Net Price: ${totalPrice}</p>
            <button role='button' className='btn btn-filled btn-block'>
              Proceed to checkout
            </button>
          </div>
        </div>
      </>
    );
  }
  return <Layout title='Your Cart'>{cartBody}</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CartPage);
