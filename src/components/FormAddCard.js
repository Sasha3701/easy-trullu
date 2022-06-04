import { useRef, useState } from "react";
import styled from "styled-components";
import { CloseIcon } from "../images";
import { Button, Input } from "./UI";

const FormAddCard = () => {
  const [error, setError] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const [value, setValue] = useState("");
  const refInput = useRef(null);

  const handleOpenForm = () => {
    setIsForm(true);
    setVisibleButton(false);
    refInput.current.focus();
  };

  const handleCloseForm = () => {
    setIsForm(false);
    setValue("");
    setError(false);
    setTimeout(() => setVisibleButton(true), 300);
  };

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setValue(e.target.value);
  };

  const handleAddCard = () => {
    if (!value) {
      setError(true);
      return;
    }
    setValue("");
    refInput.current.focus();
  };

  return (
    <SWrapper>
      <SContainer open={isForm}>
        <SWrapperForm>
          <SWrapperInput>
            <Input
              ref={refInput}
              value={value}
              notValid={error}
              onChange={handleChange}
            />
          </SWrapperInput>
          <SContainerButtons>
            <Button onClick={handleAddCard} variant="add">
              Добавить карточку
            </Button>
            <Button onClick={handleCloseForm} variant="icon">
              <CloseIcon />
            </Button>
          </SContainerButtons>
        </SWrapperForm>
      </SContainer>
      {!isForm && visibleButton ? (
        <Button onClick={handleOpenForm} variant="add">
          Добавить карточку
        </Button>
      ) : null}
    </SWrapper>
  );
};

const SWrapperInput = styled.div`
  margin-bottom: 10px;
`;

const SWrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #67f56e;
  border-radius: 6px;
  padding: 10px;
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SContainer = styled.div`
  max-height: ${(props) => (props.open ? "100px" : 0)};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;
const SContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FormAddCard;
