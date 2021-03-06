import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect } from "react";
import useUserQuery from "../hooks/useUserQuery";
import { useUserLoggedIn } from "../providers/refetchProvider";

import MainVisual from "./MainVisual";
import Navigation from "./Navigation";

interface Props {}

const DynamicComponent = dynamic(() => import("./Navigation"), { ssr: false });

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kanji Learning</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DynamicComponent />
        <MainVisual />
        {children}
      </main>
    </div>
  );
};

export default Layout;
