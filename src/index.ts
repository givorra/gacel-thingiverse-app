import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {ThingResolver} from "./graphql/resolvers/ThingResolver";
import {ContainerBuilder} from "node-dependency-injection";
import Thing from "./graphql/models/Thing";
import {ThingService} from "./services/ThingService";

async function main() {

    let container = new ContainerBuilder();
    container.register('Thing', Thing);
    container.register('ThingService', ThingService);
    container.register('ThingResolver', ThingResolver)
        .addArgument('ThingService');

    const schema = await buildSchema({
        resolvers: [ThingResolver]
    });
    const server = new ApolloServer({schema});
    await server.listen(4000);
    console.log("Server has started!");
}

main();
