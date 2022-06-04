import styled, { keyframes } from "styled-components";
import { COLORS } from "../../../styles/variables";
import { Button } from "../../UI";
import { DeleteIcon } from "../../../images";
import { useDispatch } from "react-redux";
import { removeCard } from "../../../store/groupSlice";
import { useState } from "react";

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
  const handleRemoveCard = () => {
    setIsDeleted(true);
    setTimeout(() => dispatch(removeCard({ id, groupId })), 300);
  };

  return (
    <SContainer isDeleted={isDeleted}>
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
