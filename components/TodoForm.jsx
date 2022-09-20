import React, { useContext, useState } from "react";
import { TodosContext } from "../context/TodosContext";

const TodoForm = () => {
  const { todoList, setTodoList, idForTodo, setIdForTodo } =
    useContext(TodosContext);
  const [todoInput, setTodoInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    if (todoInput.trim().length !== 0) {
      setTodoList([
        ...todoList,
        {
          id: idForTodo,
          task: todoInput,
          isComplete: false,
          isEditing: false,
        },
      ]);

      setIdForTodo((prevId) => prevId + 1);
      setTodoInput("");
    }
  };

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        name=""
        id=""
        placeholder="What do you need to do?"
        className="border w-full p-3 mb-6"
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
      />
    </form>
  );
};

export default TodoForm;
