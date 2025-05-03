import React, {useState} from "react";
import './Input.css';

function Input({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState("");
    const handleChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        if (newTodo.trim){
            onAddTodo(newTodo);
            setNewTodo("");
        }
    };

  return (
    <div className="InputArea">
        <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter New Task" value={newTodo} onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form></div>
  );
}

export default Input;