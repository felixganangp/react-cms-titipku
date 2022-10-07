import React from 'react';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { selectUIToast, uiAction } from 'store/slice/ui';
import Toast from 'components/Toast';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function App() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(selectUIToast);

  const handleCloseToast = () => {
    dispatch(uiAction.closeToast());
  };

  return (
    <ErrorBoundary>
      <Router />
      <Toast
        open={toast.open}
        headMsg={toast.headMsg}
        message={toast.message}
        severity={toast.severity}
        deleted={toast.deleted}
        duration={toast.duration}
        handleClose={handleCloseToast}
      />
    </ErrorBoundary>
  );
}
