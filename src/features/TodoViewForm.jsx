import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  background-color: #0b0b0b;
  padding: 16px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const StyledInput = styled.input`
  padding: 6px 10px;
  background: #0b0b0b;
  color: #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #60a5fa;
  }
`;

const StyledSelect = styled.select`
  padding: 6px 10px;
  background: #0b0b0b;
  color: #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #60a5fa;
  }
`;

const StyledButton = styled.button`
  padding: 6px 12px;
  background: #0b0b0b;
  color: #3b82f6;
  // border: 1px solid #3b82f6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3b82f6;
    color: #0b0b0b;
  }

  &:disabled {
    font-style: italic;
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
function TodosViewForm({
    sortDirection,
    setSortDirection,
    sortField,
    setSortField,
    queryString,
    setQueryString,
  }) {
    const [localQueryString, setLocalQueryString] = useState(queryString);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setQueryString(localQueryString);
        }, 500);

        return () => clearTimeout(debounce);

    }, [localQueryString, setQueryString]);

    const preventRefresh = (e) => {
      e.preventDefault();
    };
  
    return (
        <StyledForm onSubmit={preventRefresh}>
          <FormGroup>
            <label htmlFor="search">Search todos:</label>
            <StyledInput
              id="search"
              type="text"
              value={localQueryString}
              onChange={(e) => setLocalQueryString(e.target.value)}
            />
            <StyledButton type="button" onClick={() => setLocalQueryString("")}>
              Clear
            </StyledButton>
          </FormGroup>
    
          <FormGroup>
            <label htmlFor="sortField">Sort by:</label>
            <StyledSelect
              id="sortField"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="createdTime">Time added</option>
            </StyledSelect>
    
            <label htmlFor="sortDirection">Direction:</label>
            <StyledSelect
              id="sortDirection"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </StyledSelect>
          </FormGroup>
      </StyledForm>
      
    );
  }
  
  export default TodosViewForm;
  