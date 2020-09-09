import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {config as dotenvConfig} from "dotenv"
import {schema} from "./graphql/schema";
import {initCache} from "./server-cache";

export interface Context {
    token: string
}

async function main() {
    dotenvConfig();
    initCache();

    const server = new ApolloServer({
        schema: await schema,
        context: ({ req }) => {
            let token = req.headers.authorization || '';
            token = token.replace("Bearer ", "");

            // add the user to the context
            return { token };
        }});
    await server.listen(4000);
    console.log("Server has started!");
}

main();
