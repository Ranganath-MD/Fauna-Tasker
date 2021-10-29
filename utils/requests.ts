import { gql } from "graphql-request";
import { graphqlClient } from "./graphql-client";

export const query = gql`
  {
    allTasks {
      data {
        _id
        title
        sprint
        week
      }
    }
  }
`;

export const update = gql`
  mutation updateTask(
    $id: ID!
    $title: String!
    $sprint: Int!
    $week: Int!
  ) {
    updateOfficeTask(
      id: $id
      data: { title: $title, sprint: $sprint, week: $week }
    ) {
      title
      _id
    }
  }
`;

export const create = gql`
  mutation createOfficeTask(
    $title: String!
    $sprint: Int!
    $week: Int!
  ) {
    createOfficeTask(
      data: { title: $title, sprint: $sprint, week: $week }
    ) {
      _id
      title
      sprint
      week
    }
  }
`;

export const deleteQuery = gql`
  mutation deleteTask($id: ID!) {
    deleteOfficeTask(id: $id) {
      title
    }
  }
`;


export const fetcher = async (query: any) =>
  await graphqlClient.request(query);

export const mutateTask = async (query: any, data: any) => {
  await graphqlClient.request(query, data);
};
