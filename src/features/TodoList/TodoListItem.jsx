import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing ] = useState(false);
    const [workingTitle, setWorkingTodoTitle] = useState(todo.title);
    
    useEffect(() => {
        setWorkingTodoTitle(todo.title);
    }, [todo]);

    function handleUpdate(e){
        if (!isEditing) return;
        
        e.preventDefault();
        
        onUpdateTodo({...todo, title: workingTitle });
        
        setIsEditing(false);
        
    }
    function handleCancel(){
        setWorkingTodoTitle(todo.title);
        setIsEditing(false);
    }
    function handleEdit(e){
        setWorkingTodoTitle(e.target.value);
    }
    return (
        <li>
            <form onSubmit={handleUpdate}> 
                {isEditing ? (
                <>
                    <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                    <button type="button" onClick={handleCancel}> Cancel </button>
                    <button type="button" onClick={handleUpdate}> Update </button>
                </>
                
                ) : (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;