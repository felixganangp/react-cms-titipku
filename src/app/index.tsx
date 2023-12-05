import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import Toast from 'components/Toast';
import useToast from 'hooks/useToast';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function App() {
  const { state, closeToast } = useToast();

  return (
    <ErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterMoment}>
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
