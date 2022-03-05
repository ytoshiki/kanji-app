import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/SearchForm.module.scss";

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;
    router.push({
      pathname: `/search/${keyword}`,
      query: { keyword: keyword },
    });
  };

  return (
    <div className={styles.searchForm}>
      <div className="g-container">
        <form className={styles.searchForm__form} onSubmit={submitHandler}>
          <input
            className={styles.searchForm__input}
            type="text"
            placeholder="English, Japanese, or Kanji"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button className={styles.searchForm__button}>
            <Image src="/search.png" alt="me" width="20" height="20" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
