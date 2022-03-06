import Link from "next/link";
import React from "react";
import styles from "../styles/Grade.module.scss";

interface Props {
  currentGrade?: number | null;
}

const GradeSelect: React.FC<Props> = ({ currentGrade }) => {
  const grades = Array.from(Array(6).keys());

  return (
    <div>
      <ul className={styles.grade__list}>
        {grades.map(
          (grade) =>
            grade + 1 !== currentGrade && (
              <li key={grade} className={styles.grade__item}>
                <Link href={`/grade/${grade + 1}`}>
                  <a>level {grade + 1}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default GradeSelect;
