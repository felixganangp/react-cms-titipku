/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ButtonAccordionProps {
  parent: boolean;
  padding?: string;
  margin?: string;
}

interface WrapperProps {
  padding?: string;
  margin?: string;
}

interface IconProps {
  rotate: number | string;
}

export const Wrapper = styled.div<Pick<WrapperProps, 'padding' | 'margin'>>`
  width: 100%;
  padding: ${(p) => (p.padding ? p.padding : 'unset')};
  margin: ${(p) => (p.margin ? p.margin : '1px 0')};
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
  height: 30px;
  padding: ${(p) => (p.padding ? p.padding : '10px 0')};
  margin: ${(p) => (p.margin ? p.margin : 'unset')};
  background-color: ${(p) => (p.parent ? '#ebeff3' : 'transparent')};
  transparent;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
