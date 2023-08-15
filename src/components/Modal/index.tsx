import React from 'react';
// import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint } from '@mui/material';

interface ModalProps {
  open: boolean;
  title?: string;
  width?: string;
  maxWidth?: false | Breakpoint;
  children: JSX.Element;
  padding?: string;
  onClose: () => void;
  noTitle?: boolean;
  disableOutsideClose?: boolean;
}
function Modal({
  onClose,
  open,
  title,
  children,
  width,
  maxWidth,
  padding,
  noTitle,
  disableOutsideClose,
}: ModalProps) {
  return (
    <Dialog
      onClose={() => {
        if (!disableOutsideClose) onClose();
      }}
      open={Boolean(open)}
      maxWidth={maxWidth}
    >
      {!noTitle && (
        <DialogTitle
          fontSize="20px"
          fontWeight="500"
          // textTransform="capitalize"
          sx={{ boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)' }}
        >
          {title}
          <IconButton
            onClick={() => onClose()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#232933',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent sx={{ width, padding: 0 }}>
        <Box sx={{ width: '100%', p: padding }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}

Modal.defaultProps = {
  width: '600px',
  maxWidth: 'sm',
  padding: '0px',
  noTitle: false,
  title: '',
};

export default Modal;
