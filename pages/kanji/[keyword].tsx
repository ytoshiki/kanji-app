import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import useAddToList from "../../hooks/useAddToList";
import { Alert, Collapse } from "@mui/material";
import Link from "next/link";
import useUserList from "../../hooks/useUserList";
import useRemoveItem from "../../hooks/useRemoveItem";
import styles from "../../styles/Kanji.module.scss";
import ReactAudioPlayer from "react-audio-player";
import { GetStaticPaths, GetStaticProps } from "next";

interface Example {
  audio: {
    mp3: string;
  };
  japanese: string;
  meaning: {
    english: string;
  };
}

interface Kanji {
  character: string;
  kunyomi: { romaji: string; hiragana: string };
  meaning: { english: string };
  onyomi: { romaji: string; katakana: string };
  strokes: { count: 8; images: string[] };
  video: {
    mp4: string;
  };
}

interface Radical {
  animation: string[];
  character: string;
  image: string;
  meaning: { english: string };
  name: { hiragana: string; romaji: string };
  strokes: number;
}
interface Props {
  result: {
    examples: Example[];
    kanji: Kanji;
    radical: Radical;
  } | null;
}

const errorTypes = {
  token: "Token is either missing or invalid",
};

const Kanji: React.FC<Props> = ({ result }) => {
  const { getUserList, userListData, refetch } = useUserList();
  const [addToList, { data: addToListData, loading: addToListLoading }] =
    useAddToList();
  const [removeItem, { data: removeItemData }] = useRemoveItem();
  const [responseError, setResponseError] = useState({ type: "", message: "" });
  const [responseSuccess, setResponseSuccess] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("kanji-gql-token");
    if (!token) return;
    getUserList();
  }, []);

  useEffect(() => {
    if (addToListData?.kanjiCreate.kanjiErrors.length) {
      if (
        addToListData.kanjiCreate.kanjiErrors[0].message === errorTypes.token
      ) {
        return setResponseError({
          type: "token",
          message: "Please login to save.",
        });
      } else {
        return setResponseError({
          type: "",
          message: addToListData.kanjiCreate.kanjiErrors[0].message,
        });
      }
    }

    if (addToListData?.kanjiCreate.kanji.character) {
      setResponseSuccess(
        `${addToListData.kanjiCreate.kanji.character} has successfully been added to
          My List!
        `
      );
      refetch();
    }
  }, [addToListData]);

  useEffect(() => {
    if (!userListData?.user.list) {
      return;
    }

    const isSaved = userListData.user.list.some((item) => {
      return item.character === result?.kanji.character;
    });

    setIsSaved(isSaved);
  }, [userListData]);

  useEffect(() => {
    if (removeItemData?.kanjiDelete.kanjiErrors.length) {
      if (
        removeItemData.kanjiDelete.kanjiErrors[0].message === errorTypes.token
      ) {
        return setResponseError({
          type: "token",
          message: "Please login to remove.",
        });
      } else {
        return setResponseError({
          type: "",
          message: removeItemData.kanjiDelete.kanjiErrors[0].message,
        });
      }
    }

    if (removeItemData?.kanjiDelete.kanji.character) {
      setResponseSuccess(
        `${removeItemData.kanjiDelete.kanji.character} has successfully been removed from My List!`
      );
      refetch();
    }
  }, [removeItemData]);

  const clickHandler = (isSaved: boolean) => {
    if (isSaved) {
      removeItem({
        variables: {
          character: result?.kanji.character,
        },
      });
    } else {
      addToList({
        variables: {
          character: result?.kanji.character,
        },
      });
    }
  };

  if (!result) return <div>...Not Found</div>;
  return (
    <div className="g-container l-container">
      <div className={styles.kanji}>
        <button
          onClick={() => clickHandler(isSaved)}
          className={styles.kanji__button}
        >
          {isSaved ? "DELETE" : `Add`}
        </button>
        {
          <Collapse in={!!responseError.message}>
            <Alert severity="error">
              {responseError.message}
              <br />
              {responseError.type === "token" && (
                <>
                  <Link href="/login">
                    <a className="is-underline">I have an account.</a>
                  </Link>
                  <Link href="/signup">
                    <a className="is-underline">Create a new account.</a>
                  </Link>
                </>
              )}
            </Alert>
          </Collapse>
        }
        {
          <Collapse in={!!responseSuccess}>
            <Alert severity="success">{responseSuccess}</Alert>
          </Collapse>
        }
        <div className={styles.kanji__top}>
          <div className="is-jp">
            <h1 className={styles.kanji__keyword}>{result.kanji.character}</h1>
          </div>

          <div className={styles.kanji__info}>
            <div>
              <h2 className={styles.kanji__label}>Meaning</h2>
              <p className={styles.kanji__text}>
                {result.kanji.meaning.english}
              </p>
            </div>
            <div className={styles.kanji__info_block}>
              <div className={styles.kanji__info_box}>
                <h2 className={styles.kanji__label}>Onyomi</h2>
                <p className={styles.kanji__text}>
                  {result.kanji.onyomi.katakana}
                </p>
              </div>
              <div className={styles.kanji__info_box}>
                <h2 className={styles.kanji__label}>Kunyomi</h2>
                <p className={styles.kanji__text}>
                  {result.kanji.kunyomi.hiragana}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.kanji__block}>
          <h2 className={styles.kanji__label}>Strokes</h2>
          <p>{result.kanji.strokes.count}</p>
          <ul className={styles.kanji__order}>
            {result.kanji.strokes.images.map((image) => (
              <li key={image}>
                <Image src={image} width="100px" height="100px" />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.kanji__block}>
          <h2 className={styles.kanji__label}>Radical</h2>
          <div className={styles.kanji__flex}>
            {<Image src={result.radical.image} width="60px" height="60px" />}
            <div className={styles.kanji__radical}>
              <p className="is-jp">{result.radical.name.hiragana}</p>
              <p>{result.radical.meaning.english}</p>
            </div>
          </div>
        </div>
        <div className={styles.kanji__block}>
          <h2 className={styles.kanji__label}>Examples</h2>
          <ul>
            {result.examples.length &&
              result.examples.map((example) => {
                return (
                  <li key={example.japanese} className={styles.kanji__flexSP}>
                    <p className={styles.kanji__audio}>
                      <b className="is-jp">{example.japanese}</b>
                      <span>{example.meaning.english}</span>
                    </p>
                    <div>
                      <ReactAudioPlayer src={example.audio.mp3} controls />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const requestEndPoint = `${process.env.KANJI_API_ROUTE}kanji/all/`;

  const res = await axios.get(requestEndPoint, {
    headers: {
      "x-rapidapi-host": `${process.env.KANJI_API_HOST}`,
      "x-rapidapi-key": `${process.env.KANJI_API_KEY}`,
    },
  });

  const result = res.data;

  return {
    paths: result.map(
      (data: {
        kanji: {
          character: string;
        };
      }) => ({
        params: {
          keyword: data.kanji.character.toString(),
        },
      })
    ),
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
    `${process.env.KANJI_API_ROUTE}kanji/${params.keyword}`
  );

  const res = await axios.get(requestEndPoint, {
    headers: {
      "x-rapidapi-host": `${process.env.KANJI_API_HOST}`,
      "x-rapidapi-key": `${process.env.KANJI_API_KEY}`,
    },
  });

  const result = await res.data;

  if (result.error) {
    return { props: { result: null, keyword: params.keyword } };
  }

  return { props: { result, ketword: params.keyword } };
};

export default Kanji;
