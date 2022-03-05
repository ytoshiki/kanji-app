import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Image from "next/image";
import Logo from "../public/logo.svg";
import styles from "../styles/Navigation.module.scss";

const Navigation: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const logOut = () => {
    logout();
    router.push("/");
  };

  const authNav = user ? (
    <li className={styles.navigation__item}>
      <Link href="#">
        <a onClick={logOut}>Logout</a>
      </Link>
    </li>
  ) : (
    <>
      <li className={styles.navigation__item}>
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </li>
      <li className={styles.navigation__item}>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </li>
    </>
  );
  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__inner}>
        <div>
          <Link href="/">
            <a className={styles.navigation__logo}>
              <div>
                <Image src={Logo} />
              </div>
            </a>
          </Link>
        </div>
        <ul className={styles.navigation__nav}>
          <li className={styles.navigation__item}>
            <Link href="/mylist">My List</Link>
          </li>
          <li className={styles.navigation__item}>
            <Link href="/learn">Learn</Link>
          </li>
          <li className={styles.navigation__item}>
            <Link href="/about">About</Link>
          </li>
          {authNav}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
