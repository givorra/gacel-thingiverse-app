import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {AuthenticationError} from "apollo-server-errors";
import {buildSchema} from "type-graphql";
import {ThingResolver} from "./graphql/resolvers/ThingResolver";
// import {ContainerBuilder} from "node-dependency-injection";
import Thing from "./graphql/models/Thing";
import {ThingService} from "./services/ThingService";
import {AuthenticationResolver} from "./graphql/resolvers/AuthenticationResolver";

export interface Context {
    token: string
}

async function main() {

    // let container = new ContainerBuilder();
    // container.register('Thing', Thing);
    // container.register('ThingService', ThingService);
    // container.register('ThingResolver', ThingResolver)
    //     .addArgument('ThingService');

    const schema = await buildSchema({
        resolvers: [ThingResolver, AuthenticationResolver]
    });
    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            // Note! This example uses the `req` object to access headers,
            // but the arguments received by `context` vary by integration.
            // This means they will vary for Express, Koa, Lambda, etc.!
            //
            // To find out the correct arguments for a specific integration,
            // see the `context` option in the API reference for `apollo-server`:
            // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

            // Get the user token from the headers.
            let token = req.headers.authorization || '';
            token = token.replace("Bearer ", "");
            // if (!token) throw new AuthenticationError('you must be logged in');

            // add the user to the context
            return { token };
        }});
    await server.listen(4000);
    console.log("Server has started!");
}

main();
