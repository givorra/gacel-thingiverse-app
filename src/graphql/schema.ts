import {buildSchema} from "type-graphql";
import {ThingResolver} from "./resolvers/thing-resolver";
import {AuthenticationResolver} from "./resolvers/authentication-resolver";
import {customAuthChecker} from "./auth-checker";
import {GraphQLSchema} from "graphql";

export const schema: Promise<GraphQLSchema> = buildSchema({
    resolvers: [ThingResolver, AuthenticationResolver],
    authChecker: customAuthChecker
});
