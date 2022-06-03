import styled from "styled-components";

const Button = ({
  children,
  variant = "default",
  IconLeft,
  IconRight,
  ...props
}) => {
  switch (variant) {
    default: {
      return (
        <SButtonDefault {...props}>
          {IconLeft ? <IconLeft /> : null}
          <SWrapperText>
            {children}
          </SWrapperText>
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
  margin: ${(props) => (props.left ? "0 6px 0 0" : "0 0 0 6px")};
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export default Button;
