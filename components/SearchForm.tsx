import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SearchForm = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: `/search/${keyword}`,
      query: { keyword: keyword },
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type anything"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchForm;
