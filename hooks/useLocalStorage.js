import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  // const [value, setValue] = useState(() => {
  //   const item = localStorage.getItem(key);
  //   return item ? JSON.parse(item) : initialValue;
  // });

  useEffect(() => {
    const item = localStorage.getItem(key);
    const itemValue = JSON.parse(item);

    if (typeof itemValue === "number") {
      setValue(itemValue);
    } else {
      if (itemValue && itemValue.length > 0) {
        setValue(itemValue);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
