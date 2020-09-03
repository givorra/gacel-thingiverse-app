import {buildSchema} from "type-graphql";
import {ThingResolver} from "./resolvers/ThingResolver";
import {AuthenticationResolver} from "./resolvers/AuthenticationResolver";
import {customAuthChecker} from "./auth-checker";
import {GraphQLSchema} from "graphql";

export const schema: Promise<GraphQLSchema> = buildSchema({
    resolvers: [ThingResolver, AuthenticationResolver],
    authChecker: customAuthChecker
});
