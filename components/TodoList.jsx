import React, { useContext, useState } from "react";
import TodoItemRemaining from "./TodoItemRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";
import useToggle from "../hooks/useToggle";
import { TodosContext } from "../context/TodosContext";

const TodoList = () => {
  const { todoList, setTodoList } = useContext(TodosContext);

  const [filter, setFilter] = useState("all");
  const [isFeaturesOne, setFeaturesOneVisible] = useToggle();
  const [isFeaturesTwo, setFeaturesTwoVisible] = useToggle();

  const deleteTodo = (_id) => {
    setTodoList([...todoList].filter((f) => f.id !== _id));
  };

  const completeTodo = (_id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === _id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const markAsEditing = (_id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === _id) {
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const cancelEditing = (_id) => {
    markAsEditing(_id);
  };

  const updateTodo = (e, _id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === _id) {
        if (e.target.value.trim().length !== 0) {
          todo.task = e.target.value;
        }
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const todoListFiltered = (_filter) => {
    let todosFiltered = todoList;

    if (_filter === "active") {
      todosFiltered = todoList.filter((f) => !f.isComplete);
    } else if (_filter === "completed") {
      todosFiltered = todoList.filter((f) => f.isComplete);
    }

    return todosFiltered;
  };

  return (
    <>
      <div className="space-y-4 mb-6">
        {todoListFiltered(filter).map((todo) => (
          <div className="flex text-gray-700 text-xl font-light" key={todo.id}>
            <div className="flex align-middle w-full">
              <input
                type="checkbox"
                className="ml-1 mr-4"
                checked={todo.isComplete}
                onChange={() => completeTodo(todo.id)}
              />
              {todo.isEditing ? (
                <input
                  type="text"
                  className="px-1 border grow"
                  defaultValue={todo.task}
                  autoFocus
                  onBlur={(e) => updateTodo(e, todo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo(e, todo.id);
                    } else if (e.key === "Escape") {
                      cancelEditing(todo.id);
                    }
                  }}
                />
              ) : (
                <div
                  className={`break-all pr-2 ${
                    todo.isComplete ? "line-through" : ""
                  }`}
                  onDoubleClick={(e) => markAsEditing(todo.id)}
                >
                  {todo.task}
                </div>
              )}
            </div>
            <button
              className="btn-delete-todo"
              onClick={(e) => deleteTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="mb-1">Toggle Features:</div>
        <button className="button" onClick={() => setFeaturesOneVisible()}>
          Toggle Feature One
        </button>
        <button className="button ml-2" onClick={() => setFeaturesTwoVisible()}>
          Toggle Feature Two
        </button>
      </div>

      {isFeaturesOne && (
        <div className="flex justify-between align-middle border-y py-4">
          <TodoCompleteAll />
          <TodoItemRemaining />
        </div>
      )}

      {isFeaturesTwo && (
        <div className="status-bar">
          <TodoFilters
            filter={filter}
            onFilter={(filterValue) => setFilter(filterValue)}
          />
          <TodoClearCompleted />
        </div>
      )}
    </>
  );
};

export default TodoList;
