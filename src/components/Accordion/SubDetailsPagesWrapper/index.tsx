import React, { useRef, useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';
import {
  ButtonAccordion,
  HeaderBox,
  Icon,
  Title,
  Wrapper,
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

  const toggleClick = () => {
    setIsOpen(!isOpen);
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
      <Collapse in={isOpen}>{children}</Collapse>
    </Wrapper>
  );
}

AccordionOnDetails.defaultProps = {
  defaultOpen: false,
};
