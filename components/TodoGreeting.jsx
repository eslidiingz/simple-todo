import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

const TodoGreeting = () => {
  const { name, setName } = useContext(TodosContext);
  return (
    <>
      <input
        type="text"
        className="border w-full p-3"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      {name && (
        <>
          <p className="mt-2 break-all">Hello, {name}</p>
        </>
      )}
    </>
  );
};

export default TodoGreeting;
