import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

const TodoClearCompleted = () => {
  const { todoList, setTodoList } = useContext(TodosContext);

  const clearCompleted = () => {
    setTodoList([...todoList].filter((todo) => !todo.isComplete));
  };

  return (
    <button className="btn-clear-completed" onClick={clearCompleted}>
      Clear Completed
    </button>
  );
};

export default TodoClearCompleted;
