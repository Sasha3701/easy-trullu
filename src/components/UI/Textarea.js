import styled from "styled-components";
import { COLORS } from "../../styles/variables";

const Textarea = ({ label, id, ...props }) => {
  return (
    <SContainer>
      <SLabel htmlFor={id}>{label}</SLabel>
      <STextarea id={id} {...props} />
    </SContainer>
  );
};

const SContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SLabel = styled.label`
    display: inline-block;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
`;

const STextarea = styled.textarea`
    width: 100%;
    resize: none;
    border-radius: 6px;
    background-color: inherit;
    padding: 5px;
    border: 1px solid white;
    min-height: 80px;
    &:hover {
      border: 1px solid ${COLORS.gray};
    }
    &:focus {
        outline: 1px solid ${COLORS.greenLight};
    }
`;

export default Textarea;
