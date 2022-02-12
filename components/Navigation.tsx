import Link from 'next/link'
import React, { useEffect} from 'react'
import { gql, useQuery } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    user {
      username
      avatar,
    }
  }
`;

const Navigation = () => {

  const {loading, error, data, refetch} = useQuery(GET_USER, {
    fetchPolicy:"cache-and-network"
  });

  useEffect(() => {
    console.log(error);
  }, [])

  if (loading) return <span>'Loading...'</span>;
  if (error) return <span>`Error! ${error.message}`</span>;


  return (
    <nav>
      <ul>
        
      <li>
          <Link href="/">
            Search
          </Link>
        </li>
        <li>
          <Link href="/mylist">
            My List
          </Link>
        </li>
        <li>
          <Link href="/learn">
            Learn
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        {
         (!data || !data.user) &&  <li>
        <Link href="/login">
          Log in
        </Link>
      </li>
        }
        {
          (!data || !data.user) && <li>
          <Link href="/signup">
            Sign up
          </Link>
        </li>
        }
        
      </ul>
    </nav>
  )
}

export default Navigation
