import { useEffect, useState } from "react";

const useFetch = (_url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(`${_url}`)
      .then((resp) => resp.json())
      .then((res) => {
        setIsLoading(false);
        setData(res);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("The was an error");
      });
  }, [_url]);

  return { data, isLoading, errorMessage };
};

export default useFetch;
