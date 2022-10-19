/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';

interface WrapperProps {
  padding?: string;
  margin?: string;
}

interface ButtonAccordionProps {
  padding?: string;
  margin?: string;
}

interface IconProps {
  rotate: number;
}

export const Wrapper = styled.div<Pick<WrapperProps, 'padding' | 'margin'>>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : 'unset')};
  margin: ${(props) => (props.margin ? props.margin : '1px 0')};
  border-bottom: solid 1px #ebeff3;
`;

export const ButtonAccordion = styled.button<
  Pick<ButtonAccordionProps, 'padding' | 'margin'>
>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : '10px 0')};
  margin: ${(props) => (props.margin ? props.margin : 'unset')};
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  color: #626b79;
  font-size: 14px;
`;

export const Icon = styled.div<Pick<IconProps, 'rotate'>>`
  padding: 4px;
  transform: rotate(0deg);
  transition: all 0.3s ease-out;
  ${({ rotate }) => (rotate ? `transform: rotate(-180deg)` : '')};
`;

export const WrapperContent = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
`;

export const Content = styled.div`
  padding: 10px;
`;
