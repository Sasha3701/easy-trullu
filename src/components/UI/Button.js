import styled from "styled-components";
import { COLORS } from "../../styles/variables";

const Button = ({
  children,
  variant = "default",
  isInherit,
  IconLeft,
  IconRight,
  ...props
}) => {
  switch (variant) {
    case "add": {
      return (
        <SButtonAdd isInherit={isInherit} {...props}>
          {IconLeft ? <IconLeft /> : null}
          <SWrapperText>{children}</SWrapperText>
          {IconRight ? <IconRight /> : null}
        </SButtonAdd>
      );
    }
    case "icon": {
      return <SButtonIcon {...props}>{children}</SButtonIcon>;
    }
    default: {
      return (
        <SButtonDefault {...props}>
          {IconLeft ? <IconLeft /> : null}
          <SWrapperText>{children}</SWrapperText>
          {IconRight ? <IconRight /> : null}
        </SButtonDefault>
      );
    }
  }
};

const SButton = styled.button`
  border-radius: 6px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const SWrapperText = styled.span`
  display: inline-block;
  margin: 0 6px;
`;

const SButtonDefault = styled(SButton)`
  min-width: 250px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  box-shadow: 0px 2px 7px 0px rgba(34, 60, 80, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SButtonAdd = styled(SButton)`
  min-width: 150px;
  height: 30px;
  color: ${({ isInherit }) => (isInherit ? "black" : "white")};
  background-color: ${({ isInherit }) =>
    isInherit ? "inherit" : COLORS.green};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ isInherit }) =>
      isInherit ? COLORS.gray : COLORS.greenLight};
  }
`;

const SButtonIcon = styled(SButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  background-color: inherit;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${COLORS.gray};
  }
`;

export default Button;
