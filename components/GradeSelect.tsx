import Link from 'next/link';
import React from 'react'

interface Props {
  currentGrade?: number | null;
}

const GradeSelect: React.FC<Props> = ({currentGrade}) => {


  const grades = Array.from(Array(6).keys());

  return (
    <div>
       <ul>
        {
          grades.map(grade => (
            <li key={grade} className={currentGrade === (grade + 1) ? "is-current" : ""}>
              <Link href={`/grade/${grade + 1}`}>
                <a>
                grade {grade + 1}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default GradeSelect
