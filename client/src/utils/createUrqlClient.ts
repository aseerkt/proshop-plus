import Router from 'next/router';
import { Exchange, dedupExchange, fetchExchange, gql } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { isServerSide } from './isServerSide';
import { pipe, tap } from 'wonka';
import {
  AddToCartMutation,
  GetMyCartDocument,
  GetMyCartQuery,
  ChangeItemQtyMutationVariables,
  ChangeItemQtyMutation,
  DeleteCartItemMutation,
  DeleteCartItemMutationVariables,
  MeDocument,
  MeQuery,
  LoginMutation,
  LogoutMutation,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { msgStore } from '../zustand/messageStore';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('Not Authenticated')) {
        // Router.replace('/login');
        console.log(error);
        console.log('we made it here');
        const { getState } = msgStore;
        const { alert } = getState();
        alert('You need to login to continue', 'info');
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';
  if (isServerSide()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: `${process.env.NEXT_PUBLIC_API_URL}` as string,
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            addToCart: (_result, _args, cache) => {
              const myCurrentCart = cache.readQuery<GetMyCartQuery>({
                query: GetMyCartDocument,
              });
              if (!myCurrentCart || !myCurrentCart?.getMyCart) {
                cache.invalidate('Query', 'getMyCart');
                return;
              }
              betterUpdateQuery<AddToCartMutation, GetMyCartQuery>(
                cache,
                { query: GetMyCartDocument },
                _result,
                (result, data) => {
                  const newItem = result.addToCart;
                  if (!newItem) return data;
                  const cartItems = data.getMyCart.cartItems;
                  const existIndex = cartItems.findIndex(
                    (ci) => ci.id === newItem.id
                  );
                  if (existIndex === -1) {
                    return {
                      getMyCart: {
                        ...data.getMyCart,
                        cartItems: cartItems.concat(result.addToCart),
                      },
                    };
                  }
                  cartItems.splice(existIndex, 1, newItem);
                  return { getMyCart: { ...data.getMyCart, cartItems } };
                }
              );
            },
            changeItemQty: (_result, args, cache) => {
              const result = _result as ChangeItemQtyMutation;
              const newQty = result.changeItemQty;
              if (newQty) {
                const {
                  qty,
                  cartItemId,
                } = args as ChangeItemQtyMutationVariables;
                cache.writeFragment(
                  gql`
                    fragment newItem on CartItem {
                      qty
                    }
                  `,
                  { id: cartItemId, qty: newQty }
                );
              }
            },
            deleteCartItem: (_result, args, cache) => {
              const result = _result as DeleteCartItemMutation;
              const { cartItemId } = args as DeleteCartItemMutationVariables;
              if (result.deleteCartItem) {
                cache.invalidate({ __typename: 'CartItem', id: cartItemId });
              }
            },
            login: (_result, _args, cache) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                },
                _result,
                (result, data) => {
                  const user = result.login.user;
                  if (!user) return data;
                  Router.replace('/');
                  cache.invalidate('Query', 'getMyCart');
                  return { me: user };
                }
              );
            },
            logout: (_result, _args, cache, _info) => {
              Router.replace('/');
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
              cache.invalidate('Query', 'getMyCart');
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
