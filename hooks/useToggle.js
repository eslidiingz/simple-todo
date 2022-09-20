import { useState } from "react";

const useToggle = (initialState = true) => {
  const [visible, setVisible] = useState(initialState);

  const toggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return [visible, toggle];
};

export default useToggle;
