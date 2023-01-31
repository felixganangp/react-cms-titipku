import { expect, test } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import RequestKUR from '..';

test('request kur table is shown', async () => {
  const requestKUR = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKUR />
      </BrowserRouter>
    </Provider>,
  );
  const requestKurTable = await requestKUR.findByTestId('request-kur-table');
  expect(requestKurTable).toBeInTheDocument();
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

test('date picker modal is shown', async () => {
  const requestKUR = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKUR />
      </BrowserRouter>
    </Provider>,
  );
  const filterDateField = await requestKUR.findByTestId(
    'request-kur-filter-date',
  );
  const datePickerModal = screen.findByTestId('datepicker-range');
  fireEvent.click(filterDateField);
  waitFor(() => expect(datePickerModal).toBeInTheDocument());
  requestKUR.unmount();
});
