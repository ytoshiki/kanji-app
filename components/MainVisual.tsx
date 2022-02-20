import React from "react";
import Image from "next/image";
import Logo from "../public/logo.svg";
import styles from "../styles/MainVisual.module.scss";

const MainVisual = () => {
  return (
    <div className={styles.main_visual}>
      <div className={styles.main_visual__inner}>
        <Image src={Logo} alt="Picture of the author" />
      </div>
    </div>
  );
};

export default MainVisual;
