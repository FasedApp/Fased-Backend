// index.js

const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const path = require('path')
const { prisma } = require("./src/database");
const { resolvers } = require('./src/resolver')
const admin = require("firebase-admin");
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.CLIENT_EMAIL,
    }),
    databaseURL: process.env.DATABASE_URL
});

const server = new ApolloServer({
  typeDefs: readFileSync(
    path.join(__dirname, './src/schema/schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  },
  introspection: true
})

server
  .listen(process.env.PORT || 3000)
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )


//   node-prisma-apollo-backend:
//   working_dir: /Users/mudassirraza/Desktop/Projects/node-prisma-apollo-backend
//   restart: always
//   build:
//     context: .
//   volumes:
//     - .:/app:delegated
//   command: yarn dev
//   ports:
//     - 4000:4000
