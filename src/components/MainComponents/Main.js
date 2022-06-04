import styled from "styled-components";
import { HEADER, COLORS } from "../../styles/variables";
import Groups from "./Groups/Groups";

const Main = () => {
  return (
    <SMain>
      <SContainer>
        <Groups />
      </SContainer>
    </SMain>
  );
};

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
`;

export default Main;
