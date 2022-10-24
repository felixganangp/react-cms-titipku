import React, { useRef, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import {
  ButtonAccordion,
  Content,
  HeaderBox,
  Icon,
  Title,
  Wrapper,
  WrapperContent,
} from './accordionondetails.styled';

interface AccordionOnDetailsProps {
  title: string;
  children: any;
  parent: boolean;
  headerContent: any;
}

export default function AccordionOnDetails(props: AccordionOnDetailsProps) {
  const { title, children, parent, headerContent } = props;
  // content
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<any>();

  const toggleClick = () => {
    setIsOpen((prevState) => {
      if (!prevState) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = 0;
      }
      return !prevState;
    });
  };

  return (
    <Wrapper>
      <HeaderBox parent={parent}>
        <ButtonAccordion onClick={toggleClick} parent={parent}>
          <Icon rotate={isOpen ? 1 : 0}>
            <KeyboardArrowRightIcon
              sx={{
                color: parent ? '#626b79' : '#ffff',
                width: '16px',
                height: '16px',
              }}
            />
          </Icon>
          <Title>{title}</Title>
        </ButtonAccordion>
        {headerContent}
      </HeaderBox>
      <WrapperContent ref={contentRef}>{children}</WrapperContent>
    </Wrapper>
  );
}
