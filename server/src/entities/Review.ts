import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './defaults/Base';

@ObjectType()
@Entity('reviews')
export class Review extends Base {
  @Field()
  @Column({ type: 'float' })
  rating: number;

  @Field()
  @Column()
  comment: string;
}
