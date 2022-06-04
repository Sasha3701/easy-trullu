import { useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../UI";
import { removeAllCards, removeGroup } from "../../store/groupSlice";
import styled from "styled-components";

const Menu = memo(
  ({ id, cards, setIsDeleted, setIsDeletedCards, onChangeMenu }) => {
    const dispatch = useDispatch();

    const handleRemoveAllCards = () => {
      setIsDeletedCards(true);
      onChangeMenu();
      setTimeout(() => dispatch(removeAllCards(id)), 300);
    };

    const handleRemoveGroup = () => {
      setIsDeleted(true);
      onChangeMenu();
      setTimeout(() => dispatch(removeGroup(id)), 300);
    };

    const actions = useMemo(() => {
      const basicAction = [
        {
          id: 1,
          title: "Удалить группу",
          action: handleRemoveGroup,
        },
      ];
      return cards.length
        ? [
            {
              id: 0,
              title: "Удалить все карточки",
              action: handleRemoveAllCards,
            },
            ...basicAction,
          ]
        : basicAction;
    }, [id, cards]);

    return (
      <>
        <SContainer>
          <SListActions>
            {actions.map(({ id, title, action }) => (
              <SItemAction key={id}>
                <Button onClick={action} isInherit variant="add">
                  {title}
                </Button>
              </SItemAction>
            ))}
          </SListActions>
        </SContainer>
        <SOverlay onClick={onChangeMenu} />
      </>
    );
  }
);

const SOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const SContainer = styled.div`
  position: absolute;
  background-color: white;
  top: 50px;
  right: -130px;
  border-radius: 6px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 10px;
  z-index: 100;
`;

const SListActions = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const SItemAction = styled.li``;

export default Menu;
