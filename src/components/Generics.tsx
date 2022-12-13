import styled from 'styled-components';

const MainLayout = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 30px;
`;

const FlexRow = styled.div<{
  gap?: number;
  justify?: string;
  align?: string;
}>`
  display: flex;
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
`;

const FlexColumn = styled.div<{
  gap?: number;
  justify?: string;
  align?: string;
}>`
  display: flex;
  flex-direction: column;
  ${({ gap }) => gap && `gap: ${gap}px`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
`;

const Heading1 = styled.h1<{ align?: string; fontSize?: string; weight?: number; mb?: number }>`
  ${({ weight = 500 }) => `font-weight: ${weight}`};
  ${({ fontSize = 20 }) => `font-size: ${fontSize}`};
  ${({ align }) => align && `text-align: ${align}`};
  ${({ mb }) => mb && `margin-bottom: ${mb}px`};
`;

const Heading3 = styled.h3<{ align?: string; fontSize?: string; weight?: number }>`
  ${({ weight = 500 }) => `font-weight: ${weight}`};
  ${({ fontSize = 16 }) => `font-size: ${fontSize}`};
  ${({ align }) => align && `text-align: ${align}`};
`;

const Heading5 = styled.h5<{ align?: string; fontSize?: string; weight?: number }>`
  ${({ weight = 500 }) => `font-weight: ${weight}`};
  ${({ fontSize = 20 }) => `font-size: ${fontSize}`};
  ${({ align }) => align && `text-align: ${align}`};
`;

export {
  FlexRow,
  FlexColumn,
  MainLayout,
  Heading1,
  Heading3,
  Heading5
};
