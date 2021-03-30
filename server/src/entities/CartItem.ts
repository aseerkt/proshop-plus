import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseWithUser } from './defaults/BaseWithUser';
import { Product } from './Product';

@ObjectType()
@Entity('cart_items')
export class CartItem extends BaseWithUser {
  @Field(() => Int)
  @Column({ type: 'int' })
  qty: number;

  // Relations
  @PrimaryColumn('uuid')
  productId: string;

  @ManyToOne(() => Product)
  product: Product;
}
