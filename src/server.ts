import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { AppDataSource } from './datasource';
import express from 'express';

export async function createServer() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const app = express();

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  return app;
}
