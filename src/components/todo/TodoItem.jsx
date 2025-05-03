import React from "react";
import './todo.css';

function TodoItem({ id, text, completed, onToggle, onDelete }){
    return(
        <div className="todoItem">
            <p>{text}</p>
            <input type="checkbox" checked={completed} onChange={() => onToggle(id, completed)}></input>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    )
}

export default TodoItem;