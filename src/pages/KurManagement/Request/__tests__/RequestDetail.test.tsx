import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Person2Outlined } from '@mui/icons-material';
import CustomerData from '../components/CustomerData';

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
