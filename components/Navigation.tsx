import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../providers/refetchProvider";

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const logOut = () => {
    logout();
    router.push("/");
  };

  const authNav = user ? (
    <li>
      <Link href="#">
        <a onClick={logOut}>Logout</a>
      </Link>
    </li>
  ) : (
    <>
      <li>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </li>
    </>
  );
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Search</Link>
        </li>
        <li>
          <Link href="/mylist">My List</Link>
        </li>
        <li>
          <Link href="/learn">Learn</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {authNav}
      </ul>
    </nav>
  );
};

export default Navigation;
