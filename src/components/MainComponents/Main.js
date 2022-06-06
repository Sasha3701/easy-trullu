import styled from "styled-components";
import { HEADER, COLORS } from "../../styles/variables";
import Groups from "./Groups/Groups";
import { Button } from "../UI";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupsState } from "../../store/selectors";
import { clearAllGroups } from "../../store/groupSlice";

const Main = () => {
  const groups = useSelector(selectGroupsState);
  const dispatch = useDispatch();

  const handleClearAllGroups = () => {
    dispatch(clearAllGroups());
  }

  return (
    <SMain>
      <SContainer>
        <Groups />
        {groups.length ? (
          <SWrapper>
            <Button onClick={handleClearAllGroups}>Удалить все группы</Button>
          </SWrapper>
        ) : null}
      </SContainer>
      <ModalCard />
    </SMain>
  );
};

const SWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const SMain = styled.main`
  height: calc(100vh - ${HEADER.height});
  background: ${COLORS.gradientGreenYellowWithOpacity};
  padding: 10px;
`;

const SContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  overflow-x: auto;
  position: relative;
`;

export default Main;
