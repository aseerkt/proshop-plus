import { ObjectType } from 'type-graphql';
import { Entity, OneToMany } from 'typeorm';
import { CartItem } from './CartItem';
import { BaseWithUser } from './defaults/BaseWithUser';

@ObjectType()
@Entity('carts')
export class Cart extends BaseWithUser {
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
