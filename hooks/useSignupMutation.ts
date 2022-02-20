import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(credentials: { username: $username, password: $password }) {
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
  return useMutation(SIGNUP);
};
