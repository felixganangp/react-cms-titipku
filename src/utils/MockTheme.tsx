import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'theme';
import { store } from 'store';

interface MockThemeTypes {
  children: React.ReactNode;
}
const persistor = persistStore(store);

export default function MockTheme({ children }: MockThemeTypes) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
