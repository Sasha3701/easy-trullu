import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addGroup } from "../store/groupSlice";
import { selectGroupsState } from "../store/selectors";
import { PlusIcon, CloseIcon } from "../images";
import { Button, Input } from "./UI";

const FormAddGroup = () => {
  const [isForm, setIsForm] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const groups = useSelector(selectGroupsState);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const refInput = useRef(null);

  const buttonText = useMemo(() => {
    return !groups.length ? "Добавить группу" : "Добавить еще группу";
  }, [groups]);

  const handleOpenForm = () => {
    setIsForm(true);
    setVisibleButton(false);
    refInput.current.focus()
  };

  const handleCloseForm = () => {
    setIsForm(false);
    setValue("");
    setTimeout(() => setVisibleButton(true), 300);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleAddGroup = () => {
    dispatch(addGroup(value));
    setValue("");
  }

  return (
    <SWrapper>
      <SContainer open={isForm}>
        <SWrapperForm>
          <SWrapperInput>
            <Input ref={refInput} value={value} onChange={handleChange}/>
          </SWrapperInput>
          <SContainerButtons>
            <Button onClick={handleAddGroup} variant="add">Добавить группу</Button>
            <Button onClick={handleCloseForm} variant="icon">
              <CloseIcon />
            </Button>
          </SContainerButtons>
        </SWrapperForm>
      </SContainer>
      {!isForm && visibleButton ? (
        <Button onClick={handleOpenForm} IconLeft={PlusIcon}>
          {buttonText}
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
  background-color: white;
  border-radius: 6px;
  min-width: 250px;
  padding: 10px;
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SContainer = styled.div`
  max-height: ${(props) => (props.open ? "100%" : 0)};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;
const SContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FormAddGroup;
