import React from "react";
import GradeSelect from "../components/GradeSelect";
import styles from "../styles/Grade.module.scss";

interface Props {}

const Learn: React.FC<Props> = ({}) => {
  return (
    <div className="g-container l-container">
      <div>
        <h2 className={styles.grade__title}>
          <span> &#128073;</span>
          Select your kanji level
        </h2>
        <GradeSelect />
      </div>
    </div>
  );
};

export default Learn;
