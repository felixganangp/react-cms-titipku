import { Suspense } from 'react';
import { expect, test } from 'vitest';
import {
  cleanup,
  findAllByTestId,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from 'store';
import { requestKURAction } from 'store/slice/kur/Request';
import MockTheme from 'utils/MockTheme';
import RequestKURDetails from '../Details/index';
import RefusalReason from '../components/InputMessage';
import {
  MockReqDetailAccept,
  MockReqDetailPending,
  MockReqDetailRejected,
} from './MockRequest';

describe('request detail test', async () => {
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
  it('request number is shown', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailAccept);
    });
    const reqNumber = await screen.getByTestId('request-kur-dtl-req-number');
    expect(reqNumber).toBeInTheDocument();
  });
  // table
  it('show details table', async () => {
    const table = screen.findByTestId('req-detail-table');
    waitFor(() => expect(table).toBeInTheDocument());
  });
  it('show detail table data', async () => {
    waitFor(() =>
      expect(screen.findAllByTestId(/list-table-/i).then((a) => a.length)).toBe(
        3,
      ),
    );
  });
  it('show image on table', async () => {
    waitFor(() =>
      expect(screen.findByTestId('req-dtl-zoom-img-30')).toBeInTheDocument(),
    );
  });
  it('show right amount', async () => {
    waitFor(async () =>
      expect(await screen.findByTestId('req-dtl-amount-30')).toHaveStyle(
        'color: #008E58',
      ),
    );
    waitFor(async () =>
      expect(await screen.findByTestId('req-dtl-amount-30')).toHaveTextContent(
        'Rp 20,000.00',
      ),
    );
  });
  it('show - if description is empty', async () => {
    waitFor(async () =>
      expect(await screen.findByTestId('req-dtl-desc-30')).toHaveTextContent(
        '-',
      ),
    );
  });
});

// it('show accept and reject button when request status is pending', async () => {
//   await act(() => {
//     mockRequestDetail(MockReqDetailPending);
//   });
//   await act(async () => {
//     // eslint-disable-next-line no-promise-executor-return
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   });
//   expect(screen.findByTestId('request-kur-dtl-action-box')).toHaveStyle(
//     'display: flex',
//   );
//   vi.clearAllMocks();
// });
// test('didnt show accept and reject button if status is accepted', async () => {
//   await act(() => {
//     mockRequestDetail(MockReqDetailAccept);
//   });
//   await act(async () => {
//     // eslint-disable-next-line no-promise-executor-return
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   });
//   waitFor(() =>
//     expect(screen.findByTestId('request-kur-dtl-action-box')).toHaveStyle(
//       'display: none',
//     ),
//   );
//   vi.clearAllMocks();
// });

// it('display container basic info', async () => {
//   const basicInfoContent = await screen.findByTestId('requestdtl-basic-info');
//   expect(basicInfoContent).toBeInTheDocument();
// });
// it('show customer name', async () => {
//   await act(() => {
//     mockRequestDetail(MockReqDetailAccept);
//   });
//   const custName = screen.findByTestId('req-kur-dtl-cust-name');
//   waitFor(() =>
//     expect(custName).toHaveTextContent(MockReqDetailAccept.kur_user.name),
//   );
//   vi.clearAllMocks();
// });
// it('show red request status if status is rejected', async () => {
//   await act(() => {
//     mockRequestDetail(MockReqDetailRejected);
//   });
//   const statusBox = await screen.getByTestId('request-kur-dtl-status');
//   waitFor(() => expect(statusBox).toBeInTheDocument());
//   waitFor(() => expect(statusBox).toHaveStyle("background-color: '#C10000'"));
//   vi.clearAllMocks();
// });

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
// it('disabled submit reject button', async () => {
//   const id = 1;
//   const reason = 'late';
//   const onSubmit = (rejectid: number, rejectedReason: string) =>
//     console.log(id, rejectedReason);
//   const inputRefusalMessage = render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <RefusalReason id={1} onSubmitRefusal={() => onSubmit(id, reason)} />
//       </BrowserRouter>
//     </Provider>,
//   );
//   const button = await screen.findByTestId('refusal-request-button');
//   expect(button).toHaveProperty('disabled');
//   inputRefusalMessage.unmount();
// });

// refuse request pop up
// it('description textfield', async () => {
//   const desc = screen.getByTestId('refusal-req-desc');
// });
