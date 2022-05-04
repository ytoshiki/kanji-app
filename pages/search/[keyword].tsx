import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/MyList.module.scss";

interface SearchResult {
  kanji: {
    character: string;
    stroke: number;
  };
  radical: {
    character: string;
    stroke: number;
    order: number;
  };
}

interface Props {
  result: SearchResult[] | null;
  keyword: string;
}

const Search: React.FC<Props> = ({ result, keyword }) => {
  const router = useRouter();

  const clickHandler = (keyword: string) => {
    router.push({
      pathname: `/kanji/${keyword}`,
      query: { keyword: keyword },
    });
  };

  return (
    <div className="g-container l-container">
      <div>
        {!result?.length ? (
          <div className="is-error">
            <h2>Your search terms did not match any entries. </h2>
            <p>
              We cannot find any entries matching <strong>{keyword}</strong>.
              <br />
              Please check you have typed the word correctly.
              <Link href="/">
                <a>Try again</a>
              </Link>
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.myList__title}>
              <span>&#128073;</span>
              We found {result.length} {result.length > 1 ? "entries" : "entry"}{" "}
              matching <strong>{keyword}</strong>
            </h2>
            <ul className={styles.myList__list}>
              {result?.map((data) => (
                <li
                  className={styles.myList__item}
                  key={data.kanji.character}
                  onClick={() => clickHandler(data.kanji.character)}
                >
                  <div className={`${styles.myList__kanji}`}>
                    {data.kanji.character}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const keyword = context.query.keyword;

  const requestEndPoint = encodeURI(
    `${process.env.KANJI_API_ROUTE}search/${keyword}`
  );

  const res = await axios.get(requestEndPoint, {
    headers: {
      "x-rapidapi-host": `${process.env.KANJI_API_HOST}`,
      "x-rapidapi-key": `${process.env.KANJI_API_KEY}`,
    },
  });

  const result = await res.data;

  if (result.error) {
    return { props: { result: null, keyword } };
  }

  return { props: { result, keyword } };
}

export default Search;
