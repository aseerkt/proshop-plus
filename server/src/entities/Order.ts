import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseWithUser } from './defaults/BaseWithUser';
import { OrderItem } from './OrderItem';
import { PaymentResult } from './PaymentResult';
import { ShippingAddress } from './ShippingAddress';

@ObjectType()
@Entity('orders')
export class Order extends BaseWithUser {
  @Field()
  @Column()
  paymentMethod: string;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  taxPrice: number;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  shippingPrice: number;

  @Field()
  @Column({ type: 'float', default: 0.0 })
  totalPrice: number;

  @Field()
  @Column({ default: false })
  isPaid: boolean;

  @Field(() => Date)
  @Column({ type: 'date' })
  paidAt: Date;

  @Field()
  @Column({ default: false })
  isDelivered: boolean;

  @Field(() => Date)
  @Column({ type: 'date' })
  deliveredAt: Date;

  // Relations

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Field(() => ShippingAddress)
  @ManyToOne(() => ShippingAddress)
  shippingAddress: ShippingAddress;

  @Field(() => PaymentResult)
  @ManyToOne(() => PaymentResult)
  paymentResult: PaymentResult;
}
