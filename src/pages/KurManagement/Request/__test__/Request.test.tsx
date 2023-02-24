/* eslint-disable no-promise-executor-return */
import { expect, test } from 'vitest';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
  within,
} from '@testing-library/react';
import { store } from 'store';
import { requestKURAction } from 'store/slice/kur/Request';
import { act } from 'react-dom/test-utils';
import { Suspense } from 'react';
import MockTheme from 'utils/MockTheme';
import { typeAction } from 'store/slice/kur/Type';
import { areaAction } from 'store/slice/Area';
import RequestKUR from '..';
import {
  Area,
  MockRequestList,
  MockRequestListPending,
  Type,
  MockRequestListApproved,
} from './MockRequest';

const mockRequest = vi.fn((data) =>
  store.dispatch(
    requestKURAction.fetchDataSuccess({
      timestamp: 1675755225,
      status: 'ok',
      message: 'Retrieved successfully',
      page: 1,
      count: 2,
      total: 2,
      data,
    }),
  ),
);

const mockArea = vi.fn((data) =>
  store.dispatch(
    areaAction.fetchDataSuccess({
      timestamp: 1675755225,
      status: 'ok',
      message: 'Retrieved successfully',
      page: 1,
      count: 2,
      total: 2,
      data,
    }),
  ),
);

const mockType = vi.fn((data) =>
  store.dispatch(
    typeAction.fetchDataSuccess({
      timestamp: 1675755225,
      status: 'ok',
      message: 'Retrieved successfully',
      page: 1,
      count: 2,
      total: 2,
      data,
    }),
  ),
);

const unhideFilter = async () => {
  const filterButton = screen.findByTestId('request-kur-show-filter');
  fireEvent.click(await filterButton);
};

beforeEach(() => {
  render(
    <Suspense fallback>
      <MockTheme>
        <RequestKUR />
      </MockTheme>
    </Suspense>,
  );
  unhideFilter();
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('Request KUR Page', async () => {
  // header
  it('request kur title is shown', async () => {
    const requestKURTitle = screen.getByTestId('request-kur-title');
    expect(requestKURTitle).toBeInTheDocument();
  });

  // filter and search
  it('search is shown with right placeholder', async () => {
    const search = screen.getByTestId('search-request-kur');
    const searchByPlaceHolder = screen.getByPlaceholderText('Search item');
    expect(search).toBeInTheDocument();
    expect(searchByPlaceHolder).toBeInTheDocument();
  });
  it('search request', async () => {
    const search = screen.getByTestId('search-request-kur');
    const input = within(search).getByPlaceholderText('Search item');
    fireEvent.change(input, { target: { value: 'REQ-20230209-6' } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(input).toHaveValue('REQ-20230209-6');
  });
  // it('search request by press enter', async () => {
  //   screen.getByTestId('search-request-kur').focus();
  // fireEvent.keyDown(screen.getByPlaceholderText('Search item'), {
  //   key: 'Enter',
  //   code: 'Enter',
  //   keyCode: 13,
  //   charCode: 13,
  // });
  // input.focus();
  // });
  it('all filter is shown after user click filter button', async () => {
    const filterBox = screen.getByTestId('request-kur-filter-box');
    expect(filterBox).toBeInTheDocument();
    expect(filterBox).toHaveStyle('display: flex');
    expect(filterBox).not.toHaveStyle('display: none');
  });
  it('filter pasar is shown', () => {
    expect(screen.getByTestId('request-kur-filterpasar')).toBeInTheDocument();
  });
  it('filter pasar placeholder is match with the design', () => {
    expect(screen.getByPlaceholderText('Select Pasar')).toBeInTheDocument();
  });
  it('filter type is shown', () => {
    expect(screen.getByTestId('request-kur-filtertype')).toBeInTheDocument();
  });
  it('filter type placeholder is match with the design', () => {
    expect(
      screen.getByPlaceholderText('Select Type of KUR'),
    ).toBeInTheDocument();
  });
  it('filter range date is shown', async () => {
    expect(screen.getByText('Range Date')).toBeInTheDocument();
  });
  it('filter start date placeholder is match with the design', async () => {
    expect(screen.getByPlaceholderText('Start Date')).toBeInTheDocument();
  });
  it('filter end date placeholder is match with the design', async () => {
    expect(screen.getByPlaceholderText('End Date')).toBeInTheDocument();
  });
  it('open start date and end date filter', async () => {
    const start = screen.getByPlaceholderText('Start Date');
    fireEvent.click(start);

    const end = screen.getByPlaceholderText('End Date');
    fireEvent.click(end);
  });
  it('if start date is filled and end date is empty, apply button is disabled', async () => {
    const applyButton = screen.getByTestId('request-kur-apply-btn');
    const startDate = screen.getByPlaceholderText('Start Date');
    await fireEvent.click(startDate);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(2, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(buttonDate).not.toBeInTheDocument();
    expect(applyButton).toHaveAttribute('disabled');
  });
  it('if end date is filled and start date is empty, apply button is disabled', async () => {
    const applyButton = screen.getByTestId('request-kur-apply-btn');
    const startDate = screen.getByPlaceholderText('End Date');
    await fireEvent.click(startDate);
    await waitFor(async () => {
      screen.getByRole('dialog');
    });
    const gridDate = within(screen.getByRole('dialog')).getByRole('grid');
    const rowGroupDate = within(gridDate).getByRole('rowgroup');
    const buttonDate = within(rowGroupDate).getByText(2, {
      selector: 'button',
    });
    await fireEvent.click(buttonDate);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(buttonDate).not.toBeInTheDocument();

    // warning message shown
    const helperText = screen.getByTestId('form-label-helpertext');
    expect(helperText).toHaveTextContent(
      'Start Date is required when End Date is filled',
    );
    expect(applyButton).toHaveAttribute('disabled');
  });

  // table
  it('request kur table is shown', async () => {
    const requestKurTable = screen.getByTestId('request-kur-table');
    expect(requestKurTable).toBeInTheDocument();
  });
  it('data of request kur table', async () => {
    await act(() => {
      mockRequest(MockRequestList);
    });
    const arrList = await screen.findAllByTestId(/list-table-/i);
    expect(arrList.length).toBe(2);
  });
  it('change page', async () => {
    await act(() => {
      mockRequest(MockRequestList);
    });

    const pagination = screen.getByLabelText('pagination navigation');
    const buttonPage = within(pagination).getByLabelText('page 1');

    fireEvent.click(buttonPage);
    expect(buttonPage).toHaveClass('Mui-selected');
  });
  it('choose filter pasar then hit button apply', async () => {
    await act(() => {
      mockArea(Area);
      mockRequest(MockRequestList);
    });
    const arrList = await screen.findAllByTestId(/list-table-/i);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    const applyButton = screen.getByTestId('request-kur-apply-btn');
    fireEvent.click(resetButton);
    const filterPasar = screen.getByTestId('request-kur-filterpasar');
    fireEvent.click(filterPasar);
    const pasarInput = within(filterPasar).getByRole('combobox');
    fireEvent.change(pasarInput, { target: { value: 'Pasar' } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);
    fireEvent.click(applyButton);
    expect(arrList.length).toBe(2);
  });
  it('choose filter type and then hit button apply', async () => {
    await act(() => {
      mockType(Type);
      mockRequest(MockRequestList);
    });
    const arrList = await screen.findAllByTestId(/list-table-/i);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    const applyButton = screen.getByTestId('request-kur-apply-btn');
    fireEvent.click(resetButton);
    const filterType = screen.getByTestId('request-kur-filtertype');
    fireEvent.click(filterType);
    const typeInput = within(filterType).getByRole('combobox');
    fireEvent.change(typeInput, { target: { value: 'B2B' } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    fireEvent.click(screen.getAllByRole('option')[0]);
    fireEvent.click(applyButton);
    expect(arrList.length).toBe(2);
  });
  it('sort button clicked', async () => {
    await act(() => {
      mockRequest(MockRequestList);
    });
    const bodyTable = await screen.findAllByTestId(/list-table-/i);
    expect(bodyTable.length).toBe(2);
    const idHeadTable = screen.getByTestId('header-kur_request_number');
    const sortRequestIcon = within(idHeadTable).getByTestId('SwapVertIcon');
    fireEvent.click(sortRequestIcon);
    expect(sortRequestIcon).toBeInTheDocument();
  });
  it('reject request from action menu', async () => {
    await act(() => {
      mockRequest(MockRequestListPending);
    });
    const bodyTable = await screen.findAllByTestId(/list-table-/i);
    expect(bodyTable.length).toBe(1);

    const menu = screen.getByTestId('MoreVertIcon');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('req-list-act-reject');
    fireEvent.click(menuItem);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // reject dialog is shown
    const refusalFormDialog = screen.getByTestId('request-reject-modal');
    expect(refusalFormDialog).toBeTruthy();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
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
    // fireEvent.click(submitButton);
  });
  it('approve request from action menu', async () => {
    await act(() => {
      mockRequest(MockRequestListPending);
    });
    const bodyTable = await screen.findAllByTestId(/list-table-/i);
    expect(bodyTable.length).toBe(1);

    const menu = screen.getByTestId('MoreVertIcon');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('req-list-act-approve');
    expect(menuItem).toBeInTheDocument();
    // fireEvent.click(menuItem);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
  it('go to request details (for pending request)', async () => {
    await act(() => {
      mockRequest(MockRequestListPending);
    });
    const bodyTable = await screen.findAllByTestId(/list-table-/i);
    expect(bodyTable.length).toBe(1);

    const menu = screen.getByTestId('MoreVertIcon');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('req-list-act-details');
    fireEvent.click(menuItem);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
  it('go to request details (for approved/reject request)', async () => {
    await act(() => {
      mockRequest(MockRequestListApproved);
    });
    const bodyTable = await screen.findAllByTestId(/list-table-/i);
    expect(bodyTable.length).toBe(1);

    const menu = screen.getByTestId('MoreVertIcon');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('req-list-act-details');
    fireEvent.click(menuItem);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});
