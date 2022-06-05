import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../../images";
import { Button } from "../UI";
import { selectModalStatus, selectModalCard } from "../../store/selectors";
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
  const status = useSelector(selectModalStatus);
  const card = useSelector(selectModalCard);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(changeStatusModal());
    setTimeout(() => setOpen((prevState) => !prevState), 200);
    console.log(123);
  };

  useEffect(() => {
    if (status && !open) {
      setTimeout(() => setOpen((prevState) => !prevState), 200);
    }
  }, [status]);

  return open
    ? createPortal(
        <>
          <SContainer>
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
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  animation: ${({ status }) => (status ? animModalOpen : animModalClose)} 0.2s
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
  width: 500px;
  height: 500px;
`;

export default ModalCard;
