import React, { useState } from "react";
import Reddit from "../components/Fetch/Reddit";
import Joke from "../components/Fetch/Joke";

const FetchPage = () => {
  const [visibleReddit, setVisibleReddit] = useState(false);
  const [visibleJoke, setVisibleJoke] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisibleReddit(!visibleReddit)}
        className="border border-gray-400 px-4 py-2"
      >
        Toggle Fetch Reddit
      </button>
      {visibleReddit && <Reddit />}

      <button
        onClick={() => setVisibleJoke(!visibleJoke)}
        className="border border-gray-400 px-4 py-2"
      >
        Toggle Fetch Joke
      </button>
      {visibleJoke && <Joke />}
    </>
  );
};

export default FetchPage;
