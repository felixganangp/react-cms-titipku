import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { uiAction } from 'store/slice/ui';

export interface YellowToastProps {
  open?: boolean;
  totalItem: number;
  additionalMsg?: string;
  action: string;
  error: boolean;
  onUndoAction: () => void | undefined;
}

export default function YellowToast() {
  const dispatch = useAppDispatch();
  const { open, totalItem, additionalMsg, action, error, onUndoAction } =
    useAppSelector((state) => state.ui.yellowToast);

  useEffect(() => {
    if (open) setTimeout(() => dispatch(uiAction.closeYellowToast()), 50000);
  }, [open]);

  return (
    <Box
      display={open ? 'flex' : 'none'}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#fdf1da"
      border="1px solid #e4e4e4"
      p="10.5px 16px"
      fontFamily="Montserrat"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography fontSize="16px">
          <b>{totalItem}</b>{' '}
          {`Item ${additionalMsg ? `${additionalMsg} ` : ''}`}
        </Typography>
        <Typography
          fontSize="16px"
          fontWeight="600"
          color={error ? '#bf370c' : '#269946'}
        >
          &nbsp;{action.charAt(0).toUpperCase() + action.slice(1)}
        </Typography>
        <Typography onClick={onUndoAction}>
          &nbsp;<u>Undo</u>
        </Typography>
      </Box>
      <IconButton>
        <CloseIcon onClick={() => dispatch(uiAction.closeYellowToast())} />
      </IconButton>
    </Box>
  );
}
