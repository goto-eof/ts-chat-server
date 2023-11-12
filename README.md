# TS Chat Server

Simple chat server implemented with TypeScript, Apollo Server (GraphQL), TypeORM, PostgreSQL, NodeJS, ExpressJS,
Socket.io..

Install libraries

```text
yarn install
```

Start migration

```text
npx typeorm-ts-node-commonjs migration:run -d src/config/DataSource.ts
```

Start application

```text
yarn start
```

GraphQL endpoint: `http://localhost:4000/grapql`.

Test it by importing the `postman_collection.json` into Postman.

Some commands

```text
yarn init
yarn add @types/node typescript
yarn add -D ts-node
yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2019 --module commonjs --noImplicitAny true
yarn add typeorm -g
typeorm init --name apollo-server-boilerplate --database postgres
yarn add express graphql apollo-server-express
yarn add -D @types/express @types/graphql


typeorm migration:create /myPath/myMigrationName
npx typeorm-ts-node-commonjs migration:run -d src/config/DataSource.ts


tsc init
```