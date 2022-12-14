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

const previewItem = css`
  padding: 15px 10px;
    border-radius: 3px;
    min-width: 300px;
    cursor: pointer;
    transition: color 200ms ease-in-out;

    &:hover {
        color: ${({ theme: { bluePrimary } }) => bluePrimary};
    }
`

export { flexAlign, previewItem }