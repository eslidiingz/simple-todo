import { useQuery } from "react-query";

const Joke = () => {
  const {
    data: joke,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("joke", fetchJoke, {
    staleTime: 3000,
    refetchOnWindowFocus: false,
  });

  function fetchJoke() {
    return fetch(`https://official-joke-api.appspot.com/jokes/random`).then(
      (res) => res.json()
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Joke API</h2>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>{`${joke?.setup} ${joke?.punchline}`}</div>}
      {isError && <div>{error.message}</div>}
    </>
  );
};

export default Joke;
