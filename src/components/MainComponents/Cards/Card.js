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
    setIsDeleted(true)
    setTimeout(() => dispatch(removeCard({ id, groupId })), 300);
  };

  return (
    <SContainer isDeleted={isDeleted}>
      <STitle>{title}</STitle>
      <Button onClick={handleRemoveCard} variant="icon">
        <DeleteIcon />
      </Button>
    </SContainer>
  );
};

const STitle = styled.h3``;

const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${COLORS.greenVeryLight};
  border-radius: 6px;
  cursor: pointer;
  animation: ${({ isDeleted }) => isDeleted ? animCardRemove : animCardAdd} 0.3s alternate;
`;

export default Card;
