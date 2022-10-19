import React, { useRef, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Checkbox } from '@mui/material';
import {
  ButtonAccordion,
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
  checked: boolean;
}

export default function AccordionOnDetails(props: AccordionOnDetailsProps) {
  const { title, children, parent, checked } = props;
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
      <ButtonAccordion onClick={toggleClick} parent={parent}>
        <HeaderBox>
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
        </HeaderBox>
        <Checkbox sx={{ color: '#d5d5d5' }} checked={checked} />
      </ButtonAccordion>
      <WrapperContent ref={contentRef}>{children}</WrapperContent>
    </Wrapper>
  );
}
