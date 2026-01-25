import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const airtableHeaders = {
    Authorization: token,
    'Content-Type': 'application/json',
  };
  
  function normalizeTodo(todo) {
    return {
      title: todo.title,
      isCompleted: todo.isCompleted ?? false,
    };
  }
  
  function buildPayload(todo, includeId = false) {
    const record = {
      fields: normalizeTodo(todo),
    };
  
    if (includeId) {
      record.id = todo.id;
    }
  
    return { records: [record] };
  }
  
  useEffect(() => {
    const fetchTodos = async () => {
        setIsLoading(true);

        const options = {
          method: "GET", 
          headers: { 
            "Authorization": token,
          },
        };
  
        try {
          const resp = await fetch(url, options);

          if (!resp.ok){
            throw new Error(`Failed to fetch todos: ${resp.status} ${resp.statusText}`);
         }         
          const data = await resp.json();
         
          const todosFromApi = data.records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };

            if(!todo.isCompleted){
               todo.isCompleted = false;
            }
            return todo;
          })
          setTodoList([...todosFromApi]);
        }
        catch(error){
          setErrorMessage(error.message);
        }
        finally{
          setIsLoading(false);
        }
      };

      fetchTodos();

  }, []);


  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    
    // const payload = {
    //     records: [
    //         {
    //             id: editedTodo.id,
    //             fields: {
    //                 title: editedTodo.title,
    //                 isCompleted: editedTodo.isCompleted,
    //             },
    //         },
    //     ],
    // };
    const payload = buildPayload(editedTodo, true);

    const options = {
        method: "PATCH",
        headers: airtableHeaders,
        body: JSON.stringify(payload),
    };

    try {
        setIsSaving(true);
        const resp = await fetch(url, options);
        
        if (!resp.ok) {
          throw new Error("Failed to update todo");
        }
    }
    catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );

      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }

  const addTodo = async (newTodo) => {

    // const payload = {
    //     records: [
    //       {
    //         fields: {
    //           title: newTodo.title,
    //           isCompleted: newTodo.isCompleted,
    //         },
    //       },
    //     ],
    // }; 
    const payload = buildPayload(newTodo);

    const options = {
      method: 'POST',
      headers: airtableHeaders,
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);

      if (!resp.ok){
        throw new Error("Failed to POST");
      }
      const { records } = await resp.json();

      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      }

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
     } catch(error){
      console.log(error);
      setErrorMessage(error.message);
     } finally{
      setIsSaving(false);
     }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    const updateTodos = todoList.map((todo) =>
     todo.id === id ? { ...todo, isCompleted: true } : todo
    );

    setTodoList(updateTodos);

    // const payload = {
    //   records: [
    //     {
    //       id,
    //       fields: {
    //         title: originalTodo.title,
    //         isCompleted: true,
    //       },
    //     },
    //   ],
    // };
    const payload = buildPayload({ ...originalTodo, isCompleted: true }, true);

    // const payload = buildPayload(originalTodo, true);

    const options = {
      method: "PATCH",
      headers: airtableHeaders,
      body: JSON.stringify(payload),
    };
  
    try {
      const resp = await fetch(url, options);
  
      if (!resp.ok) {
        throw new Error("Failed to complete todo");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
  
      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
  
      setTodoList(revertedTodos);
    }
  }

  return (
        <div>
            <h1>My Todos</h1>
            <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
            <TodoList todoList={todoList}  isLoading={isLoading} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />

            {errorMessage ? (
              <>
                  <hr/>
                  <p>{errorMessage}</p>
                  <button onClick={() => setErrorMessage("")}>dismiss</button>
              </>
              ) : null}
        </div>
  );
}

export default App