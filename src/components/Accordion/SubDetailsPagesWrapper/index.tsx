import React, { useRef, useState, useEffect } from 'react';
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
  headerContent?: any;
  defaultOpen?: boolean;
}

export default function AccordionOnDetails(props: AccordionOnDetailsProps) {
  const { title, children, headerContent, defaultOpen } = props;
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

  useEffect(() => {
    if (defaultOpen) {
      toggleClick();
    }
  }, []);

  return (
    <Wrapper>
      <HeaderBox>
        <ButtonAccordion onClick={toggleClick}>
          <Icon rotate={isOpen ? 1 : 0}>
            <KeyboardArrowRightIcon sx={{ color: '#ffff', mt: '3px' }} />
          </Icon>
          <Title>{title}</Title>
        </ButtonAccordion>
        {headerContent}
      </HeaderBox>
      <WrapperContent ref={contentRef}>{children}</WrapperContent>
    </Wrapper>
  );
}

AccordionOnDetails.defaultProps = {
  defaultOpen: false,
};
