import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__image}></div>
      <div className="g-container">
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
