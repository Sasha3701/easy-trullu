import styled from "styled-components";
import Card from "./Card";

const Cards = ({ cards, groupId }) => {
  return cards.length ? (
    <SContainer>
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

const SContainer = styled.div``;

const SListCards = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const SItemCard = styled.li`
  margin-bottom: 10px;
`;

export default Cards;
