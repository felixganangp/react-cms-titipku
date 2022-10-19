import React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import {
  Actions,
  CancelButton,
  Content,
  ContentWrapper,
  HeaderWrapper,
  SubmitButton,
  Title,
} from './popupaction.styled';

interface PopupActionProps {
  open: boolean;
  onClose(): void;
  title: string | any;
  content: string | any;
  onSubmit(): void;
  buttonLabel: string;
  isGreenButton: boolean;
}

export default function PopupAction(props: PopupActionProps) {
  const {
    open,
    onClose,
    title,
    content,
    onSubmit,
    buttonLabel,
    isGreenButton,
  } = props;
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <HeaderWrapper>
        {typeof title === 'string' ? <Title>{title}</Title> : title}
        <CloseIcon onClick={() => onClose()} />
      </HeaderWrapper>
      <ContentWrapper>
        {typeof content === 'string' ? <Content>{content}</Content> : content}
      </ContentWrapper>
      <Actions>
        <CancelButton
          sx={{
            '&:hover': {
              backgroundColor: '#EBEFF3',
            },
          }}
          isGreenFont={isGreenButton}
          onClick={() => onClose()}
        >
          Cancel
        </CancelButton>
        <SubmitButton isGreenButton={!isGreenButton} onClick={() => onSubmit()}>
          {buttonLabel}
        </SubmitButton>
      </Actions>
    </Dialog>
  );
}
