import { Field, InputType, ObjectType } from 'type-graphql';
import { ShippingAddress } from '../entities/ShippingAddress';
import { FieldError } from './globalTypes';

@InputType()
export class AddShippingAddressArgs {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field()
  country: string;
}

@ObjectType()
export class AddShippingAdressResult {
  @Field(() => ShippingAddress, { nullable: true })
  shippingAddress?: ShippingAddress;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
