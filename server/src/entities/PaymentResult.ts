import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Order } from './Order';

@ObjectType()
@Entity('payment_results')
export class PaymentResult extends BaseEntity {
  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  update_time: string;

  @Field()
  @Column()
  email_address: string;

  // Relations
  @OneToOne(() => Order)
  order: Order;

  @PrimaryColumn('uuid')
  orderId: string;
}
