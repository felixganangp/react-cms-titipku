/* eslint-disable no-promise-executor-return */
import { Suspense } from 'react';
import { expect } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from 'store';
import { requestKURAction } from 'store/slice/kur/Request';
import MockTheme from 'utils/MockTheme';
import noImage from 'assets/no-image.svg';
import RequestKURDetails from '../Details/index';
import RefusalReason from '../components/InputMessage';
import {
  MockReqDetailAccept,
  MockReqDetailPending,
  MockReqDetailRejected,
  TableDetails,
  TableDetailsNoImage,
  TableDetailsPaging,
} from './MockRequest';

vi.useRealTimers();
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

  const mockTable = vi.fn((data) =>
    store.dispatch(
      requestKURAction.fetchDetailsTableSuccess({
        timestamp: 1675988503,
        status: 'ok',
        message: 'Retrieved successfully',
        data,
        count: 12,
        total: 12,
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
    vi.clearAllMocks();
  });

  // header
  it('request number is shown', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailAccept);
    });
    const reqNumber = screen.getByTestId('request-kur-dtl-req-number');
    expect(reqNumber).toBeInTheDocument();
  });
  it('reject request', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailPending);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // check reject & approve button is shown on the page
    const actionBox = screen.getByTestId('request-kur-dtl-action-box');
    expect(actionBox).toBeTruthy();
    const rejectButton = screen.getByTestId('req-dtl-reject-btn');
    expect(rejectButton).toBeTruthy();
    // click reject button
    fireEvent.click(rejectButton);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // refusal dialog is shown
    const refusalFormDialog = screen.getByTestId('request-reject-modal');
    expect(refusalFormDialog).toBeTruthy();
    // check button is disabled if description field is empty
    const submitButton = screen.getByTestId('refusal-request-button');
    expect(submitButton).toHaveAttribute('disabled');
    // fill the form
    const descField = screen.getByTestId('input-msg-desc');
    fireEvent.change(descField, { target: { value: 'reject request' } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // check button isn't disable anymore, and submit form
    expect(submitButton).not.toHaveAttribute('disabled');
    expect(submitButton).toBeInTheDocument();
    // fireEvent.click(submitButton);
  });
  it('approve request', async () => {
    await act(() => {
      mockRequestDetail(MockReqDetailPending);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    // check reject & approve button is shown on the page
    const actionBox = screen.getByTestId('request-kur-dtl-action-box');
    expect(actionBox).toBeTruthy();
    const approveButton = screen.getByTestId('req-dtl-approve-btn');
    expect(approveButton).toBeInTheDocument();

    // click approve button
    // fireEvent.click(approveButton);
    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 0));
    // });
    // load newest data
    await act(() => {
      mockRequestDetail(MockReqDetailAccept);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(actionBox).not.toBeVisible();
  });
  // table
  it('show detail table data', async () => {
    await act(() => {
      mockTable(TableDetails);
    });
    const table = await screen.findAllByTestId(/list-table-/i);
    expect(table.length).toBe(1);
  });
  // it('show image on table', async () => {
  //   await act(() => {
  //     mockTable(TableDetails);
  //   });
  //   const image = screen.getByTestId('req-dtl-zoom-img');
  //   expect(image).toBeInTheDocument();
  // });
  // it('show error image if image is empty', async () => {
  //   await act(() => {
  //     mockTable(TableDetailsNoImage);
  //   });
  //   const image = screen.getByRole('img');
  //   fireEvent.error(image);
  //   expect(image).toHaveAttribute('src', '/src/assets/no-image.svg');
  // });
  // it('show zoomed image after image is clicked', async () => {
  //   await act(() => {
  //     mockTable(TableDetails);
  //   });
  //   const image = screen.getByTestId('req-dtl-zoom-img');
  //   fireEvent.click(image);
  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });
  //   const imageModal = screen.getByRole('presentation');
  //   expect(imageModal).toBeTruthy();

  //   fireEvent.click(imageModal);
  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });
  // });
  // it('change page', async () => {
  //   await act(() => {
  //     mockTable(TableDetails);
  //   });
  //   const pagination = screen.getByLabelText('pagination navigation');
  //   const buttonPage = within(pagination).getByLabelText('page 1');

  //   fireEvent.click(buttonPage);
  //   expect(buttonPage).toHaveClass('Mui-selected');
  // });
});
// yang belum -> click" button
