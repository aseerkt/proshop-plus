import Router from 'next/router';
import { Exchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { isServerSide } from './isServerSide';
import { pipe, tap } from 'wonka';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/login');
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
      cacheExchange,
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
