import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GradeSelect from "../../components/GradeSelect";
import styles from "../../styles/MyList.module.scss";

interface Result {
  kanji: {
    character: string;
    stroke: number;
  };
  radical: {
    character: string;
    order: number;
    stroke: number;
  };
}

interface Props {
  result: Result[] | null;
  grade?: string;
}

const Grade: React.FC<Props> = ({ result, grade }) => {
  const router = useRouter();
  const [byPage, setByPage] = useState(50);
  const [resultDisplay, setResultDisplay] = useState<Result[]>([]);

  useEffect(() => {
    if (!result) return;
    const filteredResult = result.slice(0, byPage);
    setResultDisplay(filteredResult);
  }, [byPage]);

  if (!result) return <div>Not Found...</div>;

  return (
    <div className="g-container">
      <h1 className={styles.myList__title}>level {grade}</h1>
      <div>
        <ul className={styles.myList__list}>
          {resultDisplay.length &&
            resultDisplay.map((data) => (
              <li key={data.kanji.character} className={styles.myList__item}>
                <Link href={`/kanji/${data.kanji.character}`}>
                  <a className={`${styles.myList__kanji}`}>
                    <div>{data.kanji.character}</div>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        {result.length > resultDisplay.length && (
          <button
            className={`${styles.myList__load_btn}`}
            onClick={() => setByPage(byPage + 50)}
          >
            LOAD MORE
          </button>
        )}
      </div>
      <div>
        <h3 className={styles.myList__title}>other levels</h3>
        <GradeSelect currentGrade={grade ? parseInt(grade) : null} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const grades = Array.from(Array(6).keys());

  return {
    paths: grades.map((grade) => ({
      params: {
        grade: String(grade + 1),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {
        result: null,
      },
    };
  }

  const requestEndPoint = encodeURI(
    `${process.env.KANJI_API_ROUTE}search/advanced/`
  );

  const res = await axios.get(requestEndPoint, {
    params: {
      grade: `${params.grade}`,
    },
    headers: {
      "x-rapidapi-host": `${process.env.KANJI_API_HOST}`,
      "x-rapidapi-key": `${process.env.KANJI_API_KEY}`,
    },
  });

  const result = res.data;

  if (result.error) {
    return { props: { result: null } };
  }

  return { props: { result, grade: params.grade } };
};

export default Grade;
