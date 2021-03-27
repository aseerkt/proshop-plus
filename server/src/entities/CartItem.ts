import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from './Cart';
import { Base } from './defaults/Base';
import { Product } from './Product';

@ObjectType()
@Entity('cart_items')
export class CartItem extends Base {
  @Field(() => Int)
  @Column({ type: 'int' })
  qty: number;

  // Relations
  @PrimaryColumn('uuid')
  productId: string;

  @ManyToOne(() => Product)
  product: Product;

  @PrimaryColumn('uuid')
  cartId: string;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
