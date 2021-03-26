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

export type Base = {
  __typename?: 'Base';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type BaseWithUser = {
  __typename?: 'BaseWithUser';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  brand: Scalars['String'];
  category: Scalars['String'];
  price: Scalars['Float'];
  countInStock: Scalars['Int'];
  rating: Scalars['Float'];
  numReviews?: Maybe<Scalars['Int']>;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  qty: Scalars['Int'];
  product: Product;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
  cartItems: Array<CartItem>;
};

export type CartItems = {
  __typename?: 'CartItems';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type OnlyId = {
  __typename?: 'OnlyId';
  id: Scalars['ID'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  name: Scalars['String'];
  qty: Scalars['Int'];
  image: Scalars['String'];
  price: Scalars['Float'];
};

export type PaymentResult = {
  __typename?: 'PaymentResult';
  status: Scalars['String'];
  update_time: Scalars['String'];
  email_address: Scalars['String'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
  address: Scalars['String'];
  city: Scalars['String'];
  postalCode: Scalars['String'];
  country: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
  paymentMethod: Scalars['String'];
  taxPrice: Scalars['Float'];
  shippingPrice: Scalars['Float'];
  totalPrice: Scalars['Float'];
  isPaid: Scalars['Boolean'];
  paidAt: Scalars['DateTime'];
  isDelivered: Scalars['Boolean'];
  deliveredAt: Scalars['DateTime'];
  shippingAddress: ShippingAddress;
  paymentResult: PaymentResult;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  rating: Scalars['Float'];
  comment: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  ok?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMyCart?: Maybe<Cart>;
  getProducts: Array<Product>;
  getProduct?: Maybe<Product>;
  me?: Maybe<User>;
};


export type QueryGetProductArgs = {
  productId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeItemQty?: Maybe<Scalars['Int']>;
  deleteCartItem: Scalars['Boolean'];
  addToCart?: Maybe<CartItem>;
  register: RegisterResult;
  login: LoginResult;
  logout: Scalars['Boolean'];
};


export type MutationChangeItemQtyArgs = {
  qty: Scalars['Int'];
  cartItemId: Scalars['ID'];
};


export type MutationDeleteCartItemArgs = {
  cartItemId: Scalars['ID'];
};


export type MutationAddToCartArgs = {
  qty: Scalars['Int'];
  productId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CartItemFieldsFragment = (
  { __typename?: 'CartItem' }
  & Pick<CartItem, 'id' | 'qty'>
  & { product: (
    { __typename?: 'Product' }
    & ProductFieldsFragment
  ) }
);

export type ProductFieldsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'name' | 'image' | 'description' | 'brand' | 'category' | 'price' | 'countInStock' | 'rating' | 'numReviews' | 'createdAt' | 'updatedAt'>
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'email' | 'isAdmin' | 'createdAt' | 'updatedAt'>
);

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['ID'];
  qty: Scalars['Int'];
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & { addToCart?: Maybe<(
    { __typename?: 'CartItem' }
    & Pick<CartItem, 'id' | 'qty'>
    & { product: (
      { __typename?: 'Product' }
      & ProductFieldsFragment
    ) }
  )> }
);

export type ChangeItemQtyMutationVariables = Exact<{
  cartItemId: Scalars['ID'];
  qty: Scalars['Int'];
}>;


export type ChangeItemQtyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeItemQty'>
);

export type DeleteCartItemMutationVariables = Exact<{
  cartItemId: Scalars['ID'];
}>;


export type DeleteCartItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCartItem'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResult' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResult' }
    & Pick<RegisterResult, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = (
  { __typename?: 'Query' }
  & { getMyCart?: Maybe<(
    { __typename?: 'Cart' }
    & Pick<Cart, 'id'>
    & { cartItems: Array<(
      { __typename?: 'CartItem' }
      & CartItemFieldsFragment
    )> }
  )> }
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
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
export const CartItemFieldsFragmentDoc = gql`
    fragment CartItemFields on CartItem {
  id
  qty
  product {
    ...ProductFields
  }
}
    ${ProductFieldsFragmentDoc}`;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  name
  email
  isAdmin
  createdAt
  updatedAt
}
    `;
export const AddToCartDocument = gql`
    mutation AddToCart($productId: ID!, $qty: Int!) {
  addToCart(productId: $productId, qty: $qty) {
    id
    qty
    product {
      ...ProductFields
    }
  }
}
    ${ProductFieldsFragmentDoc}`;

export function useAddToCartMutation() {
  return Urql.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument);
};
export const ChangeItemQtyDocument = gql`
    mutation ChangeItemQty($cartItemId: ID!, $qty: Int!) {
  changeItemQty(cartItemId: $cartItemId, qty: $qty)
}
    `;

export function useChangeItemQtyMutation() {
  return Urql.useMutation<ChangeItemQtyMutation, ChangeItemQtyMutationVariables>(ChangeItemQtyDocument);
};
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($cartItemId: ID!) {
  deleteCartItem(cartItemId: $cartItemId)
}
    `;

export function useDeleteCartItemMutation() {
  return Urql.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      ...UserFields
    }
    errors {
      path
      message
    }
  }
}
    ${UserFieldsFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ok
    errors {
      path
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetMyCartDocument = gql`
    query GetMyCart {
  getMyCart {
    id
    cartItems {
      ...CartItemFields
    }
  }
}
    ${CartItemFieldsFragmentDoc}`;

export function useGetMyCartQuery(options: Omit<Urql.UseQueryArgs<GetMyCartQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMyCartQuery>({ query: GetMyCartDocument, ...options });
};
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
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};