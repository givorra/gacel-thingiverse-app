import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import {config as dotenvConfig} from "dotenv"
import {schema} from "./graphql/schema";
import {initCache} from "./server-cache";

export interface Context {
    token: string
}

const port = process.env.PORT || 4000;

async function main() {
    dotenvConfig();
    initCache();

    const server = new ApolloServer({
        schema: await schema,
        context: ({req}) => {
            let token = req.headers.authorization || '';
            token = token.replace("Bearer ", "");

            // add the user to the context
            return {token};
        }
    });
    await server.listen(port);
    console.log("Server has started on port " + port);
}

main();
