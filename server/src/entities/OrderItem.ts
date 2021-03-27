import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@ObjectType()
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  qty: number;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ type: 'float' })
  price: number;

  // Relations

  @PrimaryColumn('uuid')
  productId: string;

  @ManyToOne(() => Product)
  product: Product;

  @PrimaryColumn('uuid')
  orderId: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
