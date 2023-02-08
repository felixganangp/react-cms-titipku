import { expect, test } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'store';
import RequestKUR from '..';

const persistor = persistStore(store);

test('request kur table is shown', async () => {
  const requestKUR = render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RequestKUR />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  );
  const requestKurTable = await requestKUR.findByTestId('request-kur-table');
  expect(requestKurTable).toBeInTheDocument();
  requestKUR.unmount();
});

test('request kur title is shown', async () => {
  const requestKUR = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKUR />
      </BrowserRouter>
    </Provider>,
  );
  const requestKURTitle = await requestKUR.findByTestId('request-kur-title');
  expect(requestKURTitle).toBeInTheDocument();
  requestKUR.unmount();
});

test('all filter is shown', async () => {
  const requestKUR = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKUR />
      </BrowserRouter>
    </Provider>,
  );
  const filterButton = await requestKUR.findByTestId('request-kur-show-filter');
  const filterBox = await requestKUR.findByTestId('request-kur-filter-box');
  fireEvent.click(filterButton);
  expect(filterBox).toBeInTheDocument();
  requestKUR.unmount();
});
