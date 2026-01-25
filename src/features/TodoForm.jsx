import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo, isSaving }){
    const todoTitleInput = useRef("");
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event){
        event.preventDefault();

        onAddTodo({
            title: workingTodoTitle,
            isCompleted: false, // default for new todos
        });

        setWorkingTodoTitle("");
        todoTitleInput.current.focus();
    }
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel elementId="todoTitle" label="Todo" ref={todoTitleInput} value={workingTodoTitle} onChange={(e) => setWorkingTodoTitle(e.target.value)}  />
            {/* <label htmlFor="TodoTitle">Todo</label>
            <input 
                id="todoTitle"
                name="title"
                ref={todoTitleInput}
                value={workingTodoTitle} 
                onChange={(e) => setWorkingTodoTitle(e.target.value)} 
            /> */}
            <button disabled={workingTodoTitle.trim() === ""}>
                {isSaving ? 'Saving...' : 'Add Todo'}
            </button>
        </form>
    );
}

export default TodoForm;