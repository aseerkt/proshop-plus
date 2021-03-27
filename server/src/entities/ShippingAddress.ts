import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseWithUser } from './defaults/BaseWithUser';

@ObjectType()
@Entity('ship_addresses')
export class ShippingAddress extends BaseWithUser {
  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postalCode: string;

  @Field()
  @Column()
  country: string;
}
