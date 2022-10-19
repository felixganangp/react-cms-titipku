import Expand from '@mui/icons-material/Expand';
import React, { useState, useRef } from 'react';
import {
  ButtonAccordion,
  Content,
  Icon,
  Title,
  Wrapper,
  WrapperContent,
} from './accordionfilter.styled';

interface AccordionFilterProps {
  title: string;
  children: any;
}

export default function AccordionFilter(props: AccordionFilterProps) {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>();

  const toggleClick = () => {
    setIsOpen((prevState) => {
      if (!prevState)
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      else contentRef.current.style.maxHeight = 0;
      return !prevState;
    });
  };

  return (
    <Wrapper>
      <ButtonAccordion onClick={toggleClick}>
        <Title>{title}</Title>
        <Icon rotate={isOpen ? 1 : 0}>
          <Expand />
        </Icon>
      </ButtonAccordion>
      <WrapperContent ref={contentRef}>
        <Content>{children}</Content>
      </WrapperContent>
    </Wrapper>
  );
}
