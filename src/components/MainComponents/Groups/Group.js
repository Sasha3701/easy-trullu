import styled from "styled-components";
import { ThreeDotsIcon } from "../../../images";
import FormAddCard from "../../FormAddCard";
import { Button } from "../../UI";

const Group = ({ group: { id, title, cards } }) => {
  return (
    <SContainer>
      <SHeader>
        <STitle>{title}</STitle>
        <Button variant="icon">
          <ThreeDotsIcon />
        </Button>
      </SHeader>
      {cards.length ? (
        <SListCards>
          {cards.map((card) => (
            <SItemCard></SItemCard>
          ))}
        </SListCards>
      ) : null}
      <FormAddCard />
    </SContainer>
  );
};

const STitle = styled.h2`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 180px;
`;

const SListCards = styled.ul``;

const SItemCard = styled.li``;

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
`;

export default Group;
