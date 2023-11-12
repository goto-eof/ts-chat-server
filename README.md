Install libraries
```javascript
yarn install
```
Start migration
```javascript
npx typeorm-ts-node-commonjs migration:run -d src/config/DataSource.ts
```
Start application
```javascript
yarn start
```
Test it using `postman_collection.json`.

Some commands
```javascript
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