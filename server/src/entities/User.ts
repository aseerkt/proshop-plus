import { hash } from 'argon2';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Base } from './defaults/Base';

@ObjectType()
@Entity('users')
export class User extends Base {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @Column()
  name: string;

  @Field()
  @IsEmail(undefined, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(6, {
    message: 'Password must be at least $constraint1 charecters long',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
