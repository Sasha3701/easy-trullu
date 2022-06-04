import { forwardRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../styles/variables";

const Input = forwardRef(({ variant = "default", ...props }, ref) => {
  switch (variant) {
    default: {
      return <SInputDefault ref={ref} {...props} />;
    }
  }
});

const SInput = styled.input`
    outline: none;
`;

const SInputDefault = styled(SInput)`
    padding: 6px 8px;
    font-size: 14px;
    width: 100%;
    border: 1px solid ${COLORS.grayDark};
    border-radius: 6px;
    &:focus {
        outline: 1px solid ${COLORS.greenLight};
    }
`;

export default Input;