import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
  color: #e5e7eb;
`;

const StyledInput = styled.input`
  padding: 10px 5px;
  background-color: #0b0b0b;
  color: #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
  }
`;
function TextInputWithLabel({
    elementId,
    label,
    onChange,
    ref,
    value,
  }) {
    return (
      <StyledWrapper>
        <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
        <StyledInput
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        />
    </StyledWrapper>
    );
  }
  
  export default TextInputWithLabel