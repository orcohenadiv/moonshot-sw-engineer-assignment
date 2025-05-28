import { InputType, Field, Int } from 'type-graphql';
import { City } from '../entities/User';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  first_name!: string;

  @Field({ nullable: true })
  last_name!: string;

  @Field({ nullable: true })
  birth_date!: Date;

  @Field(() => City, { nullable: true })
  city!: City;
}
