import { withUrqlClient } from 'next-urql';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Layout from '../containers/Layout';
import {
  useGetMyCartQuery,
  useChangeItemQtyMutation,
  useDeleteCartItemMutation,
} from '../generated/graphql';
import styles from '../styles/pages/CartPage.module.scss';
import { createUrqlClient } from '../utils/createUrqlClient';

const CartPage = () => {
  const [{ data, fetching }] = useGetMyCartQuery();
  const cartItems = data?.getMyCart?.cartItems || [];
  const totalItemsQty = cartItems.reduce((qty, item) => (qty += item.qty), 0);
  const totalPrice = cartItems
    .reduce((price, item) => (price += item.product.price * item.qty), 0)
    .toFixed(2);

  const [, changeQty] = useChangeItemQtyMutation();
  const [, deleteItem] = useDeleteCartItemMutation();

  if (fetching) return <h2>Loading...</h2>;
  return (
    <Layout>
      <Head>
        <title>My Cart</title>
      </Head>
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
            <h4>
              You cart is empty <i className='fas fa-shopping-cart'></i>
            </h4>
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CartPage);
