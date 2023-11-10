import "reflect-metadata";
import * as express from "express";
import {ApolloServer} from "apollo-server-express";

import {typeDefs} from "./type/UserType";
import {resolvers} from "./resolver/UserResolver";
import {AppDataSource} from "./config/DataSource";

const startServer = async () => {
    const server = new ApolloServer({typeDefs, resolvers});
    require('dotenv').config();
    AppDataSource.initialize()
        .then(() => {
            console.log("DB initialized");
        })
        .catch((err: Error) => {
            throw new Error(`'Database connection error: ${err}`);
        });

    await server.start();
    const app = express();

    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();