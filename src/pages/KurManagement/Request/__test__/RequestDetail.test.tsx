import { expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Person2Outlined } from '@mui/icons-material';
import CustomerData from '../components/CustomerData';
import RequestKURDetails from '../Details/index';
import RefusalReason from '../components/InputMessage';

afterEach(() => {
  cleanup();
});

// details
test('displays customer data', async () => {
  const customerData = render(
    <Provider store={store}>
      <BrowserRouter>
        <CustomerData
          icon={<Person2Outlined />}
          fieldName="unit test"
          fieldContent="unit test"
        />
      </BrowserRouter>
    </Provider>,
  );
  const customerDataName = await customerData.findByTestId(
    'customer-data-name',
  );
  const customerDataContent = await customerData.findByTestId(
    'customer-data-content',
  );
  expect(customerDataName).toHaveTextContent('unit test');
  expect(customerDataContent).toHaveTextContent('unit test');
  customerData.unmount();
});

test('display request number', async () => {
  const requestKURDetail = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKURDetails />
      </BrowserRouter>
    </Provider>,
  );
  const invoiceNumber = await screen.findByTestId('requestdtl-title-inv-numb');
  expect(invoiceNumber).toBeInTheDocument();
  requestKURDetail.unmount();
});

test('display basic info', async () => {
  const requestKURDetail = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKURDetails />
      </BrowserRouter>
    </Provider>,
  );
  const basicInfoContent = await screen.findByTestId('requestdtl-basic-info');
  expect(basicInfoContent).toBeInTheDocument();
  requestKURDetail.unmount();
});

test('not display req kur statement table if data is empty', async () => {
  const requestKURDetail = render(
    <Provider store={store}>
      <BrowserRouter>
        <RequestKURDetails />
      </BrowserRouter>
    </Provider>,
  );
  const table = await screen.findByTestId('requestdtl-table');
  expect(table).not.toBeInTheDocument();
  requestKURDetail.unmount();
});

test('disabled submit reject button', async () => {
  const id = 1;
  const reason = 'late';
  const onSubmit = (rejectid: number, rejectedReason: string) =>
    console.log(id, rejectedReason);
  const inputRefusalMessage = render(
    <Provider store={store}>
      <BrowserRouter>
        <RefusalReason id={1} onSubmitRefusal={() => onSubmit(id, reason)} />
      </BrowserRouter>
    </Provider>,
  );
  const button = await screen.findByTestId('refusal-request-button');
  expect(button).toHaveProperty('disabled');
  inputRefusalMessage.unmount();
});
