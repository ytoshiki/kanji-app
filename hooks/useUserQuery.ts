import { gql, useLazyQuery, useQuery } from "@apollo/client";

export const GET_USER = gql`
  query user {
    user {
      username
      avatar
      id
      list {
        id
        character
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export default () => {
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  return { getUser, userData: data };
};
