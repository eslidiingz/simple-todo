import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import NoTodo from "../components/NoTodo";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodosContext } from "../context/TodosContext";
import TodoGreeting from "../components/TodoGreeting";
import Head from "next/head";

export default function TodoApp() {
  const [name, setName] = useLocalStorage("name", "");
  const [idForTodo, setIdForTodo] = useLocalStorage("idForTodo", 1);
  const [todoList, setTodoList] = useLocalStorage("todoList", []);

  return (
    <>
      <Head>
        <title>Simple Todo App</title>
      </Head>
      <TodosContext.Provider
        value={{
          name,
          setName,
          todoList,
          setTodoList,
          idForTodo,
          setIdForTodo,
        }}
      >
        <div className="container max-w-md mx-auto border bg-white px-8 py-6 mt-14 shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">What is your name?</h2>
            <TodoGreeting />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Todo App</h2>

          <TodoForm />

          {todoList.length > 0 ? <TodoList /> : <NoTodo />}
        </div>
      </TodosContext.Provider>
    </>
  );
}
