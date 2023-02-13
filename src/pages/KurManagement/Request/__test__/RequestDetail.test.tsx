import { Suspense } from 'react';
import { expect, test } from 'vitest';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
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
import {
  MockReqDetailAccept,
  MockReqDetailPending,
  MockReqDetailRejected,
} from './MockRequest';

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
});
afterEach(() => {
  cleanup();
});

// header
describe('request detail header', () => {
  test('request number is shown', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailAccept);
    });
    const reqNumber = await screen.findByTestId('request-kur-dtl-req-number');
    expect(reqNumber).toHaveTextContent(MockReqDetailAccept.kur_request_number);
    vi.clearAllMocks();
  });
  test('show accept and reject button when request status is pending', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailPending);
    });
    waitFor(() =>
      expect(
        screen.findByTestId('request-kur-dtl-action-box'),
      ).toBeInTheDocument(),
    );
    vi.clearAllMocks();
  });
  // test('didnt show accept and reject button if status is accepted', async () => {
  //   await act(() => {
  //     mockRequestDetail(MockReqDetailAccept);
  //   });
  //   waitFor(() =>
  //     expect(screen.findByTestId('request-kur-dtl-action-box')).toHaveStyle(
  //       'display: none',
  //     ),
  //   );
  // });
});

describe('customer basic info', async () => {
  test('display container basic info', async () => {
    const basicInfoContent = await screen.findByTestId('requestdtl-basic-info');
    expect(basicInfoContent).toBeInTheDocument();
  });
  test('show customer name', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailAccept);
    });
    const custName = screen.findByTestId('req-kur-dtl-cust-name');
    waitFor(() =>
      expect(custName).toHaveTextContent(MockReqDetailAccept.kur_user.name),
    );
    vi.clearAllMocks();
  });
  test('show red request status if status is rejected', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailRejected);
    });
    const statusBox = await screen.getByTestId('request-kur-dtl-status');
    waitFor(() => expect(statusBox).toBeInTheDocument());
    waitFor(() => expect(statusBox).toHaveStyle("background-color: '#C10000'"));
    vi.clearAllMocks();
  });
  // test('show green request status if status is accepted', async () => {
  //   await act(() => {
  //     mockRequestDetail(MockReqDetailAccept);
  //   });
  //   const status = await screen.findByTestId('request-kur-dtl-status');
  //   waitFor(() => expect(status).toBeInTheDocument());
  //   waitFor(() => expect(status).toHaveStyle("background-color: '#008E58'"));
  // });
  // test('show yellow request status if status is pending', async () => {
  //   await act(() => {
  //     mockRequestDetail(MockReqDetailPending);
  //   });
  //   const status = await screen.findByTestId('request-kur-dtl-status');
  //   waitFor(() => expect(status).toBeInTheDocument());
  //   waitFor(() => expect(status).toHaveStyle("background-color: '#FF8F00'"));
  // });
});

// customer basic info component
// test('displays customer data component', async () => {
// const customerData = render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <CustomerData
//         icon={<Person2Outlined />}
//         fieldName="unit test name"
//         fieldContent="unit test content"
//       />
//     </BrowserRouter>
//   </Provider>,
// );
// waitFor(() =>
//   expect(customerData.findByTestId('customer-data-name')).toHaveTextContent(
//     'unit test name',
//   ),
// );
// waitFor(() =>
//   expect(
//     customerData.findByTestId('customer-data-content'),
//   ).toHaveTextContent('unit test content'),
// );
// customerData.unmount();
// });

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
