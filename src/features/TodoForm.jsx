import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const StyledButton = styled.button`
  padding: 8px 14px;
  background: #111;
  color: #e5e7eb;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    font-style: italic;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function TodoForm({ onAddTodo, isSaving }){
    const todoTitleInput = useRef("");
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event){
        event.preventDefault();

        onAddTodo({
            title: workingTodoTitle,
            isCompleted: false, 
        });

        setWorkingTodoTitle("");
        todoTitleInput.current.focus();
    }
    return (
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel elementId="todoTitle" label="Todo" ref={todoTitleInput} value={workingTodoTitle} onChange={(e) => setWorkingTodoTitle(e.target.value)}  />
        
            <StyledButton disabled={workingTodoTitle.trim() === ""}>
                {isSaving ? 'Saving...' : 'Add Todo'}
            </StyledButton>
        </StyledForm>
    );
}

export default TodoForm;