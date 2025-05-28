import { InputType, Field } from 'type-graphql';
import { City } from '../entities/User';

@InputType()
export class CreateUserInput {
  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field()
  birth_date!: Date;

  @Field(() => City)
  city!: City;
}
