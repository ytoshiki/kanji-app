import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import useAddToList from "../../hooks/useAddToList";
import { Alert, Collapse } from "@mui/material";
import Link from "next/link";
import useUserList from "../../hooks/useUserList";
import useRemoveItem from "../../hooks/useRemoveItem";

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
  const [addToList, { data: addToListData }] = useAddToList();
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
      console.log(addToListData.kanjiCreate.kanjiErrors);
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
        `${addToListData.kanjiCreate.kanji.character} has successfully been added to your list!`
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
        `${removeItemData.kanjiDelete.kanji.character} has successfully been removed to your list!`
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
    <div>
      <button onClick={() => clickHandler(isSaved)}>
        {isSaved ? "remove from my list" : "Add to my list"}
      </button>
      {
        <Collapse in={!!responseError.message}>
          <Alert severity="error">
            {responseError.message}
            <br />
            {responseError.type === "token" && (
              <>
                <Link href="/signin">
                  <a>I have an account.</a>
                </Link>
                <Link href="/signup">
                  <a>Create a new account.</a>
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
      <div>
        <div>{result.kanji.character}</div>
        <div>
          <span>音読み</span>
          {result.kanji.onyomi.katakana}
          {result.kanji.onyomi.romaji}
        </div>
        <div>
          <span>訓読み</span>
          {result.kanji.kunyomi.hiragana}
          {result.kanji.kunyomi.romaji}
        </div>
        <div>
          <span>意味</span>
          {result.kanji.meaning.english}
        </div>
      </div>
      <div>
        <ul>
          {result.examples.length &&
            result.examples.map((example) => {
              return (
                <li key={example.japanese}>
                  {example.japanese}
                  {example.meaning.english}
                  {example.audio.mp3}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        {result.kanji.strokes.count}

        <ul>
          {result.kanji.strokes.images.map((image) => (
            <li key={image}>
              <Image src={image} width="100px" height="100px" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        {<Image src={result.radical.image} width="100px" height="100px" />}
        {result.radical.character}
        {result.radical.meaning.english}
        {result.radical.name.hiragana}
        {result.radical.name.romaji}
        {result.radical.strokes}
        <ul>
          {result.radical.animation.map((image) => (
            <li key={image}>
              <Image src={image} width="100px" height="100px" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const keyword = context.query.keyword;

  const requestEndPoint = encodeURI(
    `${process.env.KANJI_API_ROUTE}kanji/${keyword}`
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

export default Kanji;
