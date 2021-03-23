import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Float'];
  countInStock: Scalars['Int'];
  rating: Scalars['Float'];
  numReviews?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Query = {
  __typename?: 'Query';
  getProducts: Array<Product>;
  getProduct?: Maybe<Product>;
  hello: Scalars['String'];
};


export type QueryGetProductArgs = {
  productId: Scalars['ID'];
};

export type ProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'name' | 'image' | 'description' | 'brand' | 'category' | 'price' | 'countInStock' | 'rating' | 'numReviews' | 'createdAt' | 'updatedAt'>
);

export type GetProductQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts: Array<(
    { __typename?: 'Product' }
    & ProductFieldsFragment
  )> }
);

export const ProductFieldsFragmentDoc = gql`
    fragment ProductFields on Product {
  id
  name
  image
  description
  brand
  category
  price
  countInStock
  rating
  numReviews
  createdAt
  updatedAt
}
    `;
export const GetProductDocument = gql`
    query GetProduct($productId: ID!) {
  getProduct(productId: $productId) {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

export function useGetProductQuery(options: Omit<Urql.UseQueryArgs<GetProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProductQuery>({ query: GetProductDocument, ...options });
};
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;

export function useGetProductsQuery(options: Omit<Urql.UseQueryArgs<GetProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProductsQuery>({ query: GetProductsDocument, ...options });
};