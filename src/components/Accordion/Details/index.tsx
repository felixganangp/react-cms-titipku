import React, { useRef, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
  headerContent: any;
  havingChild?: boolean;
}

export default function AccordionOnDetails(props: AccordionOnDetailsProps) {
  const { title, children, parent, headerContent, havingChild } = props;
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
      <HeaderBox data-testid="accordion-parent" parent={parent}>
        <ButtonAccordion
          data-testid="accordion-header-button"
          onClick={toggleClick}
          parent={parent}
          type="button"
        >
          <Icon rotate={isOpen ? 1 : 0}>
            <KeyboardArrowRightIcon
              data-testid="accordion-arrow"
              sx={{
                color: parent && havingChild ? '#626b79' : 'transparent',
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
