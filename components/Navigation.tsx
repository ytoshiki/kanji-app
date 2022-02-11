import Link from 'next/link'
import React from 'react'

const Navigation = () => {
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
        <li>
          <Link href="/signin">
            Log in
          </Link>
        </li>
        <li>
          <Link href="/signin">
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
