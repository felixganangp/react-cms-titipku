import React from 'react';
// import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  title: string;
  width?: string;
  children: JSX.Element;
  padding?: string;
  onClose: () => void;
}
function Modal({ onClose, open, title, children, width, padding }: ModalProps) {
  return (
    <Dialog onClose={onClose} open={Boolean(open)}>
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
      <DialogContent sx={{ width, padding: 0 }}>
        <Box sx={{ width: '100%', p: padding }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}

Modal.defaultProps = {
  width: '600px',
  padding: '0px',
};

export default Modal;
