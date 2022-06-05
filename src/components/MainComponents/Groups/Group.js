import styled, { keyframes } from "styled-components";
import { ThreeDotsIcon } from "../../../images";
import FormAddCard from "../FormAddCard";
import Cards from "../Cards/Cards";
import { Button } from "../../UI";
import { useCallback, useRef, useState } from "react";
import { reorderGroups, replaceCardFromAnotherGroup } from "../../../store/groupSlice";
import Menu from "../Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupsCurrentCard } from "../../../store/selectors";

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

const Group = ({ group, currentGroup, setCurrentGroup }) => {
  const { id, title, cards } = group;
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeletedCards, setIsDeletedCards] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isClosedMenu, setIsClosedMenu] = useState(false);
  const refContainer = useRef(null);
  const dispatch = useDispatch();
  const currentCard = useSelector(selectGroupsCurrentCard);

  const handleChangeMenu = useCallback(() => {
    if (isOpenMenu) {
      setIsClosedMenu(true);
      setTimeout(() => setIsOpenMenu((prevState) => !prevState), 300);
      setTimeout(() => setIsClosedMenu(false), 300);
    } else {
      setIsOpenMenu((prevState) => !prevState);
    }
  }, [isOpenMenu]);

  const handleDragStart = (e) => {
    setCurrentGroup(group);
  };

  const handleDragEnd = (e) => {
    refContainer.current.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (currentCard?.groupId) {
      return;
    }
    refContainer.current.style.opacity = '0.5';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    refContainer.current.style.opacity = '1';
    if (currentCard?.groupId) {
      dispatch(
        replaceCardFromAnotherGroup({
          cardId: currentCard.id,
          groupId: currentCard.groupId,
          currentGroupId: id,
        })
      );
      return;
    }
    dispatch(reorderGroups({ from: currentGroup, to: group }));
  };

  return (
    <SContainer
      isDeleted={isDeleted}
      draggable={true}
      onDragStart={handleDragStart}
      onDragLeave={handleDragEnd}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={refContainer}
    >
      <SHeader>
        <STitle>{title}</STitle>
        <Button onClick={handleChangeMenu} variant="icon">
          <ThreeDotsIcon />
        </Button>
      </SHeader>
      <Cards groupId={id} cards={cards} isDeleted={isDeletedCards} />
      <FormAddCard groupId={id} />
      {isOpenMenu ? (
        <Menu
          id={id}
          isClosed={isClosedMenu}
          cards={cards}
          setIsDeleted={setIsDeleted}
          setIsDeletedCards={setIsDeletedCards}
          onChangeMenu={handleChangeMenu}
        />
      ) : null}
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
  position: relative;
  flex-direction: column;
  border-radius: 6px;
  background-color: white;
  padding: 10px;
  width: 250px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  animation: ${({ isDeleted }) => (isDeleted ? animGroupRemove : animGroupAdd)}
    0.3s;
  cursor: pointer;
`;

export default Group;
