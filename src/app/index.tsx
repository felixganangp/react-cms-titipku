import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Backdrop, CircularProgress } from '@mui/material';

import Toast from 'components/Toast';
import useToast from 'hooks/useToast';
import useLoadingSpinner from 'hooks/useLoadingSpinner';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function App() {
  const { state, closeToast } = useToast();
  const { isOpen: isOpenSpinner } = useLoadingSpinner();

  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isOpenSpinner}
          // onClick={()}
        >
          <CircularProgress color="primary" />
        </Backdrop>
        <Router />
        <Toast
          open={state.open}
          headMsg={state.headMsg}
          message={state.message}
          severity={state.severity}
          deleted={state.deleted}
          duration={state.duration}
          handleClose={closeToast}
        />
      </LocalizationProvider>
    </ErrorBoundary>
  );
}
