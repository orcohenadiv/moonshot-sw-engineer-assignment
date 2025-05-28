import { AppDataSource } from '../datasource';
import { User, City } from '../entities/User';
import { publishUserCreated } from './snsService'; // add this line

interface CreateUserInput {
  first_name: string;
  last_name: string;
  birth_date: Date;
  city: City;
}

interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  city?: City;
}

export class UserService {
  static async createUser(input: CreateUserInput): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = userRepository.create({
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedUser = await userRepository.save(user);

    // Send SNS message after user is saved
    const message = `New user created: ${savedUser.first_name} ${savedUser.last_name} (ID: ${savedUser.id})`;
    await publishUserCreated(`New user created: ${user.first_name} ${user.last_name}`);

    return savedUser;
  }

  static async getUserById(id: number): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
  }

  static async getAllUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  }

  static async updateUser(id: number, input: UpdateUserInput): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, input);
    user.updated_at = new Date();

    return await userRepository.save(user);
  }

  static async deleteUser(id: number): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    return result.affected !== 0;
  }
}
