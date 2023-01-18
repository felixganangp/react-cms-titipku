/**
 *
 * Toast
 *
 */

import React from 'react';
// import styled from 'styled-components';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface ToastProsp {
  open?: boolean;
  duration?: number;
  severity?: AlertColor;
  headMsg: string;
  message?: string | undefined;
  deleted?: boolean;
}

interface ToastProspExtend extends ToastProsp {
  handleClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void | undefined;
}
function Toast({
  open,
  handleClose,
  duration,
  severity,
  headMsg,
  message,
  deleted,
}: ToastProspExtend) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={duration || 3000}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        iconMapping={{
          success: deleted ? (
            <DeleteOutlinedIcon />
          ) : (
            <CheckCircleOutlineIcon />
          ),
        }}
        sx={{
          width: '100%',
          '& .MuiAlert-action': {
            padding: '2px 0 0 16px',
          },
          borderRadius: '10px',
          ...(severity !== 'success' && {
            '& .MuiAlert-action': {
              display: 'flex',
              alignItems: 'center',
              padding: '0 0 0 16px',
              button: {
                padding: '0 5px',
              },
            },
            '& .MuiAlert-icon': {
              display: 'flex',
              alignItems: 'center',
            },
          }),
        }}
      >
        {headMsg}
        <Typography
          sx={{
            fontSize: '14px',
            fontFamily: 'Roboto',
          }}
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

// Toast.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   severity: PropTypes.string.isRequired,
//   headMsg: PropTypes.string,
//   message: PropTypes.string.isRequired,
//   duration: PropTypes.number,
//   deleted: PropTypes.bool,
// };

Toast.defaultProps = {
  open: false,
  duration: 3000,
  message: '',
  deleted: false,
  severity: 'success',
};
export default Toast;
