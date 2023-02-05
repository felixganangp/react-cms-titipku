import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme';

interface MockThemeTypes {
  children: React.ReactNode;
}

export default function MockTheme({ children }: MockThemeTypes) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
