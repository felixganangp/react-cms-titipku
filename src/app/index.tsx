import React from 'react';

import Toast from 'components/Toast';
import useToast from 'hooks/useToast';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function App() {
  const { state, closeToast } = useToast();

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
