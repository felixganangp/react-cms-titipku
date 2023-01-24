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

export const Wrapper = styled.div<Pick<WrapperProps, 'padding' | 'margin'>>`
  width: 100%;
  padding: ${(p) => (p.padding ? p.padding : 'unset')};
  margin: ${(p) => (p.margin ? p.margin : '15px 0 0')};
  background-color: #fafafa;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Icon = styled.div<Pick<IconProps, 'rotate'>>`
  padding: 4px;
  transform: rotate(0deg);
  transition: all 0.3s ease-out;
  ${(props) => (props.rotate ? `transform: rotate(90deg)` : '')};
`;

export const ButtonAccordion = styled.button<
  Pick<ButtonAccordionProps, 'padding' | 'margin'>
>`
  width: 100%;
  padding: ${(p) => (p.padding ? p.padding : '5px')};
  margin: ${(p) => (p.margin ? p.margin : 'unset')};
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #626b79;
  width: 100%;
  color: #fff;
`;

export const Title = styled(Typography)``;

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
  width: inherit;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  display: flex;
  background-color: #626b79;
  width: 100%;
  color: #fff;
`;
