import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  constructor(product: Partial<Product>) {
    super();
    Object.assign(this, product);
  }
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
