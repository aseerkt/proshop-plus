import { ObjectType, Field, ID } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class OnlyId extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
