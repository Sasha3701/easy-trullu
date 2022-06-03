import styled from "styled-components";
import { HEADER, COLORS } from "../../styles/variables";
import { LogoIcon } from "../../images";

const Header = () => {
  return (
    <SHeader>
      <SLogoIcon />
      <STitle>Ease Trullu</STitle>
    </SHeader>
  );
};

const SHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  height: ${HEADER.height};
  background: ${COLORS.gradientGreenYellow};
  box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
`;

const SLogoIcon = styled(LogoIcon)`
  fill: white;
`;

const STitle = styled.h1`
    color: white;
    font-size: 24px;
`;

export default Header;
