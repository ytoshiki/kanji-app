import { gql, useLazyQuery } from "@apollo/client";

interface UserListPayload {
  user: {
    list: {
      character: string;
      id: string;
      status: string;
      createdAt: string;
    }[];
  };
}
export const GET_USER_LIST = gql`
  query user {
    user {
      list {
        id
        character
        status
        createdAt
      }
    }
  }
`;

export default () => {
  const [getUserList, { loading, error, data, refetch }] =
    useLazyQuery<UserListPayload>(GET_USER_LIST, {
      fetchPolicy: "cache-and-network",
    });

  return { getUserList, userListData: data, refetch };
};
