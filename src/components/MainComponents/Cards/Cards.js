import styled, { keyframes } from "styled-components";
import Card from "./Card";

const animCardsRemove = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Cards = ({ cards, groupId, isDeleted }) => {
  return cards.length ? (
    <SContainer isDeleted={isDeleted}>
      <SListCards>
        {cards.map((card) => (
          <SItemCard key={card.id}>
            <Card groupId={groupId} card={card} />
          </SItemCard>
        ))}
      </SListCards>
    </SContainer>
  ) : null;
};

const SContainer = styled.div`
  animation: ${({ isDeleted }) => (isDeleted ? animCardsRemove : 'none')}
    0.3s;
`;

const SListCards = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const SItemCard = styled.li`
  margin-bottom: 10px;
`;

export default Cards;
