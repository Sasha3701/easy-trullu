import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addGroup } from "../../store/groupSlice";
import { selectGroupsState } from "../../store/selectors";
import { PlusIcon, CloseIcon } from "../../images";
import { Button, Input } from "../UI";

const FormAddGroup = () => {
  const [error, setError] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const groups = useSelector(selectGroupsState);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const refInput = useRef(null);
  const [isAnimation, setIsAnimation] = useState(true);

  const buttonText = useMemo(() => {
    return !groups.length ? "Добавить группу" : "Добавить еще группу";
  }, [groups]);

  const handleOpenForm = () => {
    setIsForm(true);
    setVisibleButton(false);
    refInput.current.focus();
  };

  const handleCloseForm = (withoutTimout = false) => {
    setIsForm(false);
    setValue("");
    setError(false);

    withoutTimout
      ? setVisibleButton(true)
      : setTimeout(() => {
          setVisibleButton(true);
        }, 300);
    setTimeout(() => setIsAnimation(true), 100);
  };

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setValue(e.target.value);
  };

  const handleAddGroup = () => {
    if (!value) {
      setError(true);
      return;
    }
    dispatch(addGroup(value));
    setIsAnimation(false);
    handleCloseForm(true);
  };

  return (
    <SWrapper>
      <SContainer open={isForm} isAnimation={isAnimation}>
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
            <Button onClick={handleAddGroup} variant="add">
              Добавить группу
            </Button>
            <Button onClick={() => handleCloseForm(false)} variant="icon">
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
  transition: ${(props) =>
    props.isAnimation ? "max-height 0.3s ease" : "none"};
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
`;
const SContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FormAddGroup;
