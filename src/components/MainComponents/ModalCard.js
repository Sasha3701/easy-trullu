import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon, TaskIcon, DescriptionIcon } from "../../images";
import { Button, Input, Textarea } from "../UI";
import { selectModalStatus, selectModalCard } from "../../store/selectors";
import { renameCard, changeDescriptionCard } from "../../store/groupSlice";
import { changeStatusModal } from "../../store/modalSlice";
import styled, { keyframes } from "styled-components";

const animModalOpen = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const animModalClose = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ModalCard = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const status = useSelector(selectModalStatus);
  const card = useSelector(selectModalCard);
  const [valueInput, setValueInput] = useState(() => card.title);
  const [valueTextarea, setValueTextarea] = useState(() => card.description);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(changeStatusModal());
    setTimeout(() => setOpen((prevState) => !prevState), 300);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if(!value) {
      setValueInput(value);
      setError(true);
      return;
    }
    setError(false);
    setValueInput(value);
    dispatch(renameCard({ cardId: card.id, groupId: card.groupId, newTitle: value }));
  };

  const handleChangeTextarea = (e) => {
    const value = e.target.value;
    setValueTextarea(value);
    dispatch(changeDescriptionCard({ cardId: card.id, groupId: card.groupId, newDescription: value }));
  };

  useEffect(() => {
    if (status && !open) {
      setTimeout(() => setOpen((prevState) => !prevState), 300);
    }
  }, [status]);

  useEffect(() => {
    setValueInput(card.title);
    setValueTextarea(card.description);
  }, [card])

  return open
    ? createPortal(
        <>
          <SContainer>
            <SHeader>
              <TaskIcon />
              <SInput
                notValid={error}
                variant="title"
                value={valueInput}
                onChange={handleChange}
              />
            </SHeader>
            <SBody>
              <SWrapperDiscription>
                <SDescriptionIcon />
                <Textarea
                  placeholder="Добавить описание..."
                  label="Описание"
                  id={`card_descrition_${card.id}`}
                  value={valueTextarea}
                  onChange={handleChangeTextarea}
                />
              </SWrapperDiscription>
            </SBody>
            <SWrapperButton>
              <Button variant="icon" onClick={handleCloseModal}>
                <CloseIcon />
              </Button>
            </SWrapperButton>
          </SContainer>
          <SOverlay onClick={handleCloseModal} status={status} />
        </>,
        document.getElementById("modal")
      )
    : null;
};

const SDescriptionIcon = styled(DescriptionIcon)`
  margin-right: 10px;
`;

const SWrapperDiscription = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-right: 25px;
`;

const SBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 50px;
`;

const SInput = styled(Input)`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  width: calc(100% - 100px);
`;

const SWrapperButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 20;
`;

const SOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  animation: ${({ status }) => (status ? animModalOpen : animModalClose)} 0.3s
    alternate;
`;

const SContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 800px;
  height: 800px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

export default ModalCard;
