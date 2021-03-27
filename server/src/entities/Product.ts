import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseWithUser } from './defaults/BaseWithUser';

@ObjectType()
@Entity('products')
export class Product extends BaseWithUser {
  constructor(product: Partial<Product>) {
    super();
    Object.assign(this, product);
  }

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column()
  brand: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column({ type: 'float' })
  price: number;

  @Field(() => Int)
  @Column()
  countInStock: number;

  @Field()
  @Column({ type: 'float' })
  rating: number;

  @Field(() => Int, { defaultValue: 0 })
  numReviews: number;
}
