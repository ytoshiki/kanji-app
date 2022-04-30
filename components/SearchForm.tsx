import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/SearchForm.module.scss";

interface Props {
  focused: boolean;
  setFocued: (focused: boolean) => void;
}

const SearchForm: React.FC<Props> = ({ focused, setFocued }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocued]);

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
      <div>
        <h2 className={styles.searchForm__heading}>
          <span>&#128270;</span>
          Search Kanji
        </h2>
        <form className={`${styles.searchForm__form}`} onSubmit={submitHandler}>
          <input
            ref={inputRef}
            className={styles.searchForm__input}
            type="text"
            placeholder="English, Japanese, or Kanji"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button className={styles.searchForm__button}>Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
