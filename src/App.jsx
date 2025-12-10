import './App.css';
import { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [newTodo, setNewTodo] = useState("Example Text")
  const todos = [
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" }
  ];
  return (
    <div>
        <h1>My Todos</h1>
        <TodoForm/>

        <p>{newTodo}</p>

        <TodoList todos={todos} />
    </div>
  );
}

export default App