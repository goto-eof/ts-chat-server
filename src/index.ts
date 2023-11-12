import "reflect-metadata";
import * as express from "express";
import {ApolloServer, ExpressContext} from "apollo-server-express";
import * as dotenv from "dotenv";
import {AppDataSource} from "./config/DataSource";
import {buildSchema} from "type-graphql";
import {UserResolver} from "./resolver/UserResolver";
import {MessageResolver} from "./resolver/MessageResolver";
import {verify} from "jsonwebtoken";
import UserOutput from "./output/UserOutput";

export interface MyContext extends ExpressContext {
    currentUser: UserOutput,
    authorized: boolean
}

dotenv.config();
const startServer = async () => {
    const schema = await buildSchema({resolvers: [MessageResolver, UserResolver]});
    const server = new ApolloServer({
        schema, context: ({req, res}) => {
            if (!req.headers?.authorization) {
                return {currentUser: null, req, authorized: false}
            }
            try {
                const payload = verify(req.headers?.authorization, process.env.JWT_KEY!);
                return {currentUser: payload, req, authorized: !!payload}
            } catch (err) {
                return {currentUser: null, req, authorized: false}
            }
        }
    });
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