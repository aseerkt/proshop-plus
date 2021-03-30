import { IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseWithUser } from './defaults/BaseWithUser';

@ObjectType()
@Entity('ship_addresses')
export class ShippingAddress extends BaseWithUser {
  @Field()
  @IsNotEmpty({ message: 'Address is required' })
  @Column()
  address: string;

  @Field()
  @IsNotEmpty({ message: 'City is required' })
  @Column()
  city: string;

  @Field()
  @IsNotEmpty({ message: 'Postal Code is required' })
  @Column()
  postalCode: string;

  @Field()
  @IsNotEmpty({ message: 'Country is required' })
  @Column()
  country: string;
}
