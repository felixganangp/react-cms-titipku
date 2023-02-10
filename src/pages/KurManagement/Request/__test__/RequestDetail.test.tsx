import { Suspense } from 'react';
import { expect, test } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Person2Outlined } from '@mui/icons-material';
import { requestKURAction } from 'store/slice/kur/Request';
import MockTheme from 'utils/MockTheme';
import CustomerData from '../components/CustomerData';
import RequestKURDetails from '../Details/index';
import RefusalReason from '../components/InputMessage';
import { MockRequestDetail } from './MockRequest';

const mockRequestDetail = vi.fn((data) =>
  store.dispatch(
    requestKURAction.fetchDetailsSuccess({
      timestamp: 1675988503,
      status: 'ok',
      message: 'Retrieved successfully',
      data,
    }),
  ),
);

beforeEach(() => {
  render(
    <Suspense fallback>
      <MockTheme>
        <RequestKURDetails />
      </MockTheme>
    </Suspense>,
  );
  act(() => {
    mockRequestDetail(MockRequestDetail);
  });
});
afterEach(() => {
  cleanup();
});

// header
describe('request detail header', () => {
  test('request number is shown', async () => {
    const reqNumber = await screen.findByTestId('request-kur-dtl-req-number');
    expect(reqNumber).toHaveTextContent(MockRequestDetail.kur_request_number);
  });
});

// customer basic info
// test('displays customer data', async () => {
//   const customerData = render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <CustomerData
//           icon={<Person2Outlined />}
//           fieldName="unit test"
//           fieldContent="unit test"
//         />
//       </BrowserRouter>
//     </Provider>,
//   );
//   const customerDataName = await customerData.findByTestId(
//     'customer-data-name',
//   );
//   const customerDataContent = await customerData.findByTestId(
//     'customer-data-content',
//   );
//   expect(customerDataName).toHaveTextContent('unit test');
//   expect(customerDataContent).toHaveTextContent('unit test');
//   customerData.unmount();
// });

test('display request number', async () => {
  const invoiceNumber = await screen.findByTestId('requestdtl-title-inv-numb');
  expect(invoiceNumber).toBeInTheDocument();
});

test('display basic info', async () => {
  const basicInfoContent = await screen.findByTestId('requestdtl-basic-info');
  expect(basicInfoContent).toBeInTheDocument();
});
describe('reject request modal', () => {
  // test('modal reject is shown', async () => {
  //   const inputRefusalMessage = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <RequestKURDetails />
  //       </BrowserRouter>
  //     </Provider>,
  //   );
  //   const rejectButton = await screen.findByTestId('CloseIcon');
  //   expect(rejectButton).toBeInTheDocument();
  //   await beforeAll(() => fireEvent.click(rejectButton));
  //   // const modal = screen.getByTestId('requestdtl-modal-reject');
  //   // expect(modal).toBeInTheDocument();
  //   inputRefusalMessage.unmount();
  // });
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
});
