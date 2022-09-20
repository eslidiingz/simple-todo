import React, { useContext, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";

const TodoItemRemaining = () => {
  const { todoList } = useContext(TodosContext);

  const remainingCalculation = () => {
    return todoList.filter((todo) => !todo.isComplete).length;
  };

  const remaining = useMemo(remainingCalculation, [todoList]);

  return (
    <div className="text-gray-500">
      {remaining} item{remaining < 2 ? "" : "s"} remaining
    </div>
  );
};

export default TodoItemRemaining;
