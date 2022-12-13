import { css } from 'styled-components';

const flexAlign = ({
  justify = 'center',
  align = 'center',
  direction = 'row',
  gap = 0
}) => css`
  ${(gap) => gap && `gap: ${gap}px`};
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
`;

export { flexAlign }