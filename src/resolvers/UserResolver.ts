import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  InputType,
  Field,
} from 'type-graphql';
import { User, City } from '../entities/User';
import { UserService } from '../services/UserService';
import { CreateUserInput } from '../schema/CreateUserInput';
import { UpdateUserInput } from '../schema/UpdateUserInput';


@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => Int) id: number): Promise<User | null> {
    return await UserService.getUserById(id);
  }



@Mutation(() => User)
async createUser(@Arg('input') input: CreateUserInput) {
  return await UserService.createUser(input);
}

@Mutation(() => User, { nullable: true })
async updateUser(@Arg('input') input: UpdateUserInput) {
  return await UserService.updateUser(input.id, input);
}


  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
    return await UserService.deleteUser(id);
  }
}
