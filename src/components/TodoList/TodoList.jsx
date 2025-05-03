import React, { useEffect, useState } from "react";
import TodoItem from "../todo/TodoItem";
import Input from "../Input/Input";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching", err));
  }, []);

  const handleToggle = async (id, completed) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (err) {
      console.log("error", err);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newTodo,
          completed: false,
        }),
      });
      const newTask = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTask]);
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log("error deleting", err);
    }
  };

  return (
    <div>
      <Input onAddTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          completed={todo.completed}
          id={todo.id}
          key={todo.id}
          text={todo.text}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
