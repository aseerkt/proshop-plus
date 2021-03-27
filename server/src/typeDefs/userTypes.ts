import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../entities/User';
import { FieldError } from './globalTypes';

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class RegisterResult {
  @Field({ nullable: true })
  ok?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class LoginResult {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
