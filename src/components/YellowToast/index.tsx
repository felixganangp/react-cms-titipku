import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { uiAction } from 'store/slice/ui';

export interface YellowToastProps {
  open?: boolean;
  totalItem?: number;
  additionalMsg?: string;
  action: string;
  error: boolean;
  onUndoAction?: () => void | undefined;
  noUndo?: boolean;
  itemType?: string;
}

export default function YellowToast() {
  const dispatch = useAppDispatch();
  const {
    open,
    totalItem,
    additionalMsg,
    action,
    error,
    onUndoAction,
    noUndo,
    itemType,
  } = useAppSelector((state) => state.ui.yellowToast);

  setTimeout(() => dispatch(uiAction.closeYellowToast()), 20000);

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
        {totalItem ? (
          <>
            <Typography fontSize="16px">
              <b>{totalItem}</b> {` ${itemType || ''} `}
              {`${additionalMsg ? `${additionalMsg} ` : ''}`}
            </Typography>
            <Typography
              fontSize="16px"
              fontWeight="600"
              color={error ? '#bf370c' : '#000000'}
            >
              &nbsp;{action.charAt(0).toUpperCase() + action.slice(1)}
            </Typography>
            {!noUndo && (
              <Typography onClick={onUndoAction} sx={{ cursor: 'pointer' }}>
                &nbsp;<u>Undo</u>
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography
              fontSize="16px"
              fontWeight="600"
              color={error ? '#bf370c' : '#269946'}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}&nbsp;
            </Typography>
            <Typography fontSize="16px">
              {`${additionalMsg ? `${additionalMsg} ` : ''}`}
            </Typography>
          </>
        )}
      </Box>
      <IconButton>
        <CloseIcon onClick={() => dispatch(uiAction.closeYellowToast())} />
      </IconButton>
    </Box>
  );
}
