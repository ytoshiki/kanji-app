import React from "react";
import GradeSelect from "../components/GradeSelect";
import styles from "../styles/Grade.module.scss";

interface Props {}

const Learn: React.FC<Props> = ({}) => {
  return (
    <div className="g-container">
      <div>
        <div className={styles.grade__title}>Select your kanji level</div>
        <GradeSelect />
      </div>
    </div>
  );
};

export default Learn;
