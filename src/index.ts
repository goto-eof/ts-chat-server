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
import * as http from "http";
import {Server, Socket} from "socket.io";

export interface MyContext extends ExpressContext {
    currentUser: UserOutput,
    authorized: boolean,
    io: Server
}

declare global {
    namespace Express {
        interface Request {
            socketIo?: Socket
        }
    }
}

dotenv.config();
const startServer = async () => {
    const schema = await buildSchema({resolvers: [MessageResolver, UserResolver]});


    require('dotenv').config();
    AppDataSource.initialize()
        .then(() => {
            console.log("DB initialized");
        })
        .catch((err: Error) => {
            throw new Error(`'Database connection error: ${err}`);
        });

    const app = express();

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://127.0.0.1:4000"
        }
    })

    io.on('connection', (socket) => {
        app.request.socketIo = socket
        io.on('message', (message: string) => {
            console.log(`Received message: ${message}`);
            io.send(`Server received your message: ${message}`);
        });

        io.on('close', () => {
            console.log('Client disconnected');
        });
    })

    const server = new ApolloServer({
        schema, context: ({req, res}) => {
            if (!req.headers?.authorization) {
                return {currentUser: null, req, authorized: false, io: null}
            }
            try {
                const payload = verify(req.headers?.authorization, process.env.JWT_KEY!);
                return {currentUser: payload, req, authorized: !!payload, io}
            } catch (err) {
                return {currentUser: null, req, authorized: false, io: null}
            }
        }
    });
    await server.start();


    server.applyMiddleware({app});

    app.listen({port: 4000}, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();