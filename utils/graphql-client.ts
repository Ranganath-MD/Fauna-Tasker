import { GraphQLClient } from "graphql-request"

/**
 * End point should be same as selected in fauna DB
 * https://docs.fauna.com/fauna/current/api/graphql/endpoints
 */
const endpoint = "https://graphql.us.fauna.com/graphql";

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
  }
})