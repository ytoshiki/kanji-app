import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    signin(credentials: { username: $username, password: $password }) {
      id
      token
      username
      avatar
      userErrors {
        message
      }
    }
  }
`;

export default () => {
  return useMutation(LOGIN);
};
