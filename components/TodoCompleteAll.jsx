import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

const TodoCompleteAll = () => {
  const { todoList, setTodoList } = useContext(TodosContext);

  const completeAllTodo = () => {
    const updatedTodoList = todoList.map((todo) => {
      todo.isComplete = true;

      return todo;
    });

    setTodoList(updatedTodoList);
  };

  return (
    <button onClick={completeAllTodo} className="button">
      Check All
    </button>
  );
};

export default TodoCompleteAll;
