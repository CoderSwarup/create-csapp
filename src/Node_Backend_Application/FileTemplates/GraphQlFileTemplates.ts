// GraphQL Schema Template
export const GRAPHQL_SCHEMA_TEMPLATE = `
export const typeDefs = \`
  type Query {
    hello: String
  }

  type Mutation {
    createItem(name: String!): String
  }
\`;
`;

// GraphQL Resolver Template
export const GRAPHQL_RESOLVER_TEMPLATE = `
export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    createItem: () => {
      return 'Item created!'
    },
  },
}


`;

// GraphQL Server Initialization Template
export const GRAPHQL_SERVER_TEMPLATE = `
import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
import express from 'express'
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
dotenv.config()

const app = express() // Just initialize app, no explicit typing needed

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export const setupGraphQL = async () => {
  const port = process.env.GRAPHQL_PORT
    ? parseInt(process.env.GRAPHQL_PORT, 10)
    : 4000 // Convert string to number
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })
  console.log('GraphQl Server Running on ==> ', url)
}

`;
