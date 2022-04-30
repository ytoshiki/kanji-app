import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";

export default function Home() {
  const [focused, setFocused] = useState(false);
  const focusFormOnClick = () => {
    setFocused(!focused);
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    focusFormOnClick();
  };

  return (
    <>
      <div>
        <section>
          <div className="g-wrapper">
            <SearchForm focused={focused} setFocued={setFocused} />
          </div>
        </section>
        <section className="g-section ">
          <div className="c-top-page">
            <div className="g-container l-container">
              <h2>
                Welcome to <b className="is-strong">Kanji Learning</b>
                <span className="is-ml">&#128075;</span>
              </h2>
              <p>
                <span>Kanji Learning</span> is a free kanji learning resource
                developed for Japanese language learners learning kanji.
              </p>
              <div>
                <p>
                  Start out with{" "}
                  <a href="#" onClick={handleOnClick}>
                    Quick Search
                  </a>{" "}
                  by entering either a kanji itself, its Onyomi in katakana,
                  Kunyomi in hiragana or its English meaning into the search
                  field.
                </p>
                <p>
                  To memorize kanji more effectively,{" "}
                  <Link href="/mylist/">My List</Link> allows you to check kanji
                  you saved, and you can sort them according to the level of
                  understanding.
                </p>
                <p>
                  If you are not sure which kanji to study, you can learn kanji
                  at different levels{" "}
                  <Link href="/learn/">
                    <a>here</a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
