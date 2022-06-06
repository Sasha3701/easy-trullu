import styled, { keyframes } from "styled-components";
import { useRef, useState } from "react";
import { COLORS } from "../../../styles/variables";
import { Button } from "../../UI";
import { DeleteIcon } from "../../../images";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCard,
  reorderCards,
  saveCurrentCard,
} from "../../../store/groupSlice";
import { changeContentModal } from "../../../store/modalSlice";
import { selectGroupsCurrentCard } from "../../../store/selectors";
import { cloneDeep } from "lodash";

const animCardAdd = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const animCardRemove = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Card = ({ card, groupId }) => {
  const { title, id } = card;
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const refContainer = useRef(null);
  const currentCard = useSelector(selectGroupsCurrentCard);

  const handleRemoveCard = (e) => {
    e.stopPropagation();
    setIsDeleted(true);
    setTimeout(() => dispatch(removeCard({ id, groupId })), 300);
  };

  const handleOpenCard = () => {
    dispatch(changeContentModal({ groupId, ...card }));
  };

  const handleDragStart = (e) => {
    dispatch(saveCurrentCard({ groupId, ...card }));
  };

  const handleDragEnd = (e) => {
    refContainer.current.style.opacity = "1";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    refContainer.current.style.opacity = "0.5";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    refContainer.current.style.opacity = "1";
    if (currentCard.groupId !== groupId) {
      return;
    }
    const cloneCard = cloneDeep(currentCard);
    delete cloneCard.groupId;
    dispatch(
      reorderCards({
        from: { card: cloneCard, groupId },
        to: { card, groupId },
      })
    );
  };

  return (
    <SContainer
      isDeleted={isDeleted}
      onClick={handleOpenCard}
      draggable={true}
      onDragStart={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={refContainer}
    >
      <STitle>{title}</STitle>
      <SWrapperButton>
        <Button onClick={handleRemoveCard} variant="icon">
          <DeleteIcon />
        </Button>
      </SWrapperButton>
    </SContainer>
  );
};

const STitle = styled.h3``;

const SWrapperButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
`;

const SContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.greenVeryLight};
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  animation: ${({ isDeleted }) => (isDeleted ? animCardRemove : animCardAdd)}
    0.3s alternate;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${COLORS.green};
  }
`;

export default Card;
