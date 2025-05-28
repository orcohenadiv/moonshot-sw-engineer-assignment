import request from 'supertest';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../src/resolvers/UserResolver';
import { AppDataSource } from '../src/datasource';

let server: ApolloServer;

beforeAll(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  server = new ApolloServer({ schema });
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('UserResolver', () => {
  let createdUserId: number;

  it('should create a user', async () => {
    const result = await server.executeOperation({
      query: `
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            first_name
            last_name
            city
          }
        }
      `,
      variables: {
        input: {
          first_name: 'Test',
          last_name: 'User',
          birth_date: '1995-01-01T00:00:00.000Z',
          city: 'TEL_AVIV',
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createUser).toHaveProperty('id');
    createdUserId = result.data?.createUser.id;
  });

  it('should retrieve the user', async () => {
    const result = await server.executeOperation({
      query: `
        query GetUser($id: Int!) {
          user(id: $id) {
            id
            first_name
            last_name
            city
          }
        }
      `,
      variables: { id: createdUserId },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.user.first_name).toBe('Test');
  });

  it('should update the user', async () => {
    const result = await server.executeOperation({
      query: `
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
            id
            first_name
          }
        }
      `,
      variables: {
        input: {
          id: createdUserId,
          first_name: 'Updated',
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.updateUser.first_name).toBe('Updated');
  });

  it('should delete the user', async () => {
    const result = await server.executeOperation({
      query: `
        mutation DeleteUser($id: Int!) {
          deleteUser(id: $id)
        }
      `,
      variables: { id: createdUserId },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.deleteUser).toBe(true);
  });
});
