// index.js

const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const path = require('path')
const { prisma } = require("./src/database");
const { resolvers } = require('./src/resolver')
const admin = require("firebase-admin");
require('dotenv').config();
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDMK6y59CMUMzcl\nafBD+norDPYHrhjwjMjF8tMLYLe0yRsLcp/JhSQXQIGlZ2ttOwtGQr9mZ1wiOBVt\nboKyO5nQYH16LxhyeIFtkmfDfSihschVPPg6Hclkgkv5mXkQCs0mHg+b+LRaz3lO\nGivZ6sy5dX7eAl5JspIemRHALvFQ4kL7MBKIAe4cvrE/aWEh9WAP68alQKKmtIxn\nY5FQrjCAQ9K+zuI8btULsFxp8090W5O/hRtLNNhbbklq57i3n20QnP57NVgc5SBA\nJu3YBl+F59svGWyPE99obrM4Y2Wmrqz7LN3bfduRGokCZCQIX9ozcq4I6Yskk4D2\n3CVRoUxrAgMBAAECggEACGslRLnWm1Xl8wuX8KaDfy1E6jZD6OGAwuy8/xwpGMct\n0z5K3rfUhWoIVZfpBnNEMbBLqYYfL7Kwa36MpAza+Lbis9inncruytXhFftIqlYl\nBJSDuUTZtUgvqB85vISLuKA/sNo1eK+MI4hYnVC5rUynA0Ba+F7aalQ8b6LuGgM6\nG3AWY1n+tIQVtKzssA3WnIAN6/JJS5cHYIIFYlQIujhBAcbdpGO1NoNGVsmroWUa\nhCXEqEZXLQ593dhd+GeoIi6U381vdNoVvWjn2sxoNFCFlKYwbqp+8gKRTfNE8HZ6\nAHeTTNW9id26wfVBJo9hDi3C5INmED2VVMjwVNLWlQKBgQD3i3vAf8GE3GCPPvp4\n1m1FNms8/cpq/4a3Oy2VM6iH3qS3qswmL6vng/6PNoEOc1vUYUTsfydwGMjcPXzK\nhsz3ThqWdRAtL8HPJVYbNd2Kcn9JF9Qzk27Hk+syVBEouWSWl9BuMLdkjq5yHYaT\niauWs4P4ZXiReIhS9jURPDZOPQKBgQDTJO34+2D1Ldnkux320V0AKQLWUM6ZEsMM\nbmXrnhG+H2T1jLm7tGH6YJdbtpGr6qP1NNh+LkxEvpdGsZO53FqZ1mYuOGuKrRPU\nWZRfZpKhQCjp2hKJdqYwEjjCakeowV3f5lyRm0GFjpVbFdpRPtGFQuYAwMQHivOV\nezgjXR8XxwKBgQCw8hVtjmTIEbc77aqgwbWt6a5SFJ+iSDEFvNlic2CebnmTiBUR\nnrXkcad+u1kY+UDE2RqpamLIcA7zz0fqhNzyUfQTZG5BvodtCKU6IhDQK/PsTYoz\nq8leA8/1U75IO+048B/fBBezW4I6s/xEbf4nZP6Kig3a/iuEEdXxEfdHiQKBgQDB\nHlfikNlfpu5SfKqtY1SyntAPgZ1U+IoZxqfF16/WuxQ2Wt5ORnAO92W45sVZ/qSz\n0//neSUdA02NxUGej2L2rdiLkeMa1a77XGuOzlxyzCIfseueez0JXsE3YMnmGeZo\nsWQdcWl+ZKlKxDQId3Jfdo60RZuGYprkL+1quvODZQKBgQDqJXDssdCPAN7qaVN7\nV/rEXcqFNeoVDvMZOzRUjSn0jl3q5wIJ3dr42lexB6a4KM71mBy4AjIyCzV2kMQ5\ndKprMWjBO8y8tK+zd0EgUAVmuQezy695ieMhAdCseeTAosqDX5lSDX0fwhfw9JvY\ngevNf3RIe2dDS/e27HA/0ZVo8w==\n-----END PRIVATE KEY-----\n"

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "fased-01",
        privateKey: PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: "firebase-adminsdk-ivmjn@fased-01.iam.gserviceaccount.com",
    }),
    // databaseURL: process.env.DATABASE_URL
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
