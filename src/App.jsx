import './App.css';
import { useState } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  
  function updateTodo(editedTodo){
    const updatedTodos = todoList.map((todo) => {
      if (todo.id == editedTodo.id){
          return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  function addTodo(title){
    const newTodo = { title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updateTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
        return todo;
    });

    setTodoList(updateTodos);
  }

  return (
        <div>
            <h1>My Todos</h1>
            <TodoForm onAddTodo={addTodo}/>
            <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
        </div>
  );
}

export default App