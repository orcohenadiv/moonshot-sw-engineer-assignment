"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const datasource_1 = require("./datasource");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield datasource_1.AppDataSource.initialize();
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [UserResolver_1.UserResolver],
        });
        const server = new apollo_server_1.ApolloServer({ schema });
        server.listen({ port: 4000 }).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    });
}
startServer();
