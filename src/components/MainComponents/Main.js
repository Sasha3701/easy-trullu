import styled from "styled-components";
import { HEADER, COLORS } from "../../styles/variables";

const Main = () => {
  return (
    <SMain>
      <STestContent></STestContent>
    </SMain>
  );
};

const SMain = styled.main`
  height: calc(100vh - ${HEADER.height});
  background: ${COLORS.gradientGreenYellowWithOpacity};
  padding: 10px;
`;

const STestContent = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  overflow-x: auto;
`;

export default Main;
