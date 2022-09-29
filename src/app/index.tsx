import React from 'react';
import Theme from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ErrorBoundary from './ErrorBoundary';
import Router from './Router';

export default function index() {
  // console.log(import.meta.env.DEV)
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
