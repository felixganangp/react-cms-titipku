/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ButtonAccordionProps {
  padding?: string;
  margin?: string;
  parent: boolean;
}

interface WrapperProps {
  padding?: string;
  margin?: string;
}

interface IconProps {
  rotate: number | string;
}

interface HeaderBoxProps {
  parent: boolean;
}

export const Wrapper = styled.div<Pick<WrapperProps, 'padding' | 'margin'>>`
  width: 100%;
  padding: ${(p) => (p.padding ? p.padding : 'unset')};
  margin: ${(p) => (p.margin ? p.margin : '2px 0')};
  border-bottom: solid 1px #ebeff3;
`;

export const Icon = styled.div<Pick<IconProps, 'rotate'>>`
  padding: 4px;
  transform: rotate(0deg);
  transition: all 0.3s ease-out;
  ${(props) => (props.rotate ? `transform: rotate(90deg)` : '')};
`;

export const ButtonAccordion = styled.button<
  Pick<ButtonAccordionProps, 'padding' | 'margin' | 'parent'>
>`
  width: 100%;
  padding: ${(p) => (p.padding ? p.padding : '10px 0')};
  margin: ${(p) => (p.margin ? p.margin : 'unset')};
  background-color: ${(p) => (p.parent ? '#ebeff3' : '#ffff')};
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
`;

export const Title = styled(Typography)`
  color: #232933;
  font-size: 14px;
`;

export const WrapperContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;

export const Content = styled.div`
  padding: 5px;
`;

export const HeaderBox = styled(Box)<Pick<HeaderBoxProps, 'parent'>>`
  display: flex;
  width: inherit;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => (p.parent ? '#ebeff3' : '#ffff')};
`;
