import React, { useEffect, useState } from 'react'
import styles from "../styles/About.module.scss";


interface User {
  id: number;
  name: string;
}

interface Props {

}

const About: React.FC<Props> = () => {


  return (
    <div className={styles.about}>
      <h1>About Kanji.com</h1>
    </div>
  )
}


export default About
