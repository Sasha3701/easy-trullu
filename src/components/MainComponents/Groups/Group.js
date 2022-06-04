import styled, { keyframes } from "styled-components";
import { ThreeDotsIcon } from "../../../images";
import FormAddCard from "../FormAddCard";
import Cards from "../Cards/Cards";
import { Button } from "../../UI";
import { useState } from "react";

const animGroupAdd = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const animGroupRemove = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Group = ({ group: { id, title, cards } }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <SContainer isDeleted={isDeleted}>
      <SHeader>
        <STitle>{title}</STitle>
        <Button variant="icon">
          <ThreeDotsIcon />
        </Button>
      </SHeader>
      <Cards groupId={id} cards={cards}/>
      <FormAddCard id={id}/>
    </SContainer>
  );
};

const STitle = styled.h2`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 180px;
`;

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: white;
  padding: 10px;
  width: 250px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  animation: ${({ isDeleted }) => isDeleted ? animGroupRemove : animGroupAdd} 0.3s;
`;

export default Group;
