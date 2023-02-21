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
import RequestKUR from '..';
import { MockRequestList } from './MockRequest';

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

const mockRequestFilter = vi.fn((filter) =>
  store.dispatch(requestKURAction.setParams(filter)),
);

const unhideFilter = async () => {
  const filterButton = await screen.findByTestId('request-kur-show-filter');
  fireEvent.click(filterButton);
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
afterEach(cleanup);

// header
test('request kur title is shown', async () => {
  const requestKURTitle = await screen.findByTestId('request-kur-title');
  expect(requestKURTitle).toBeInTheDocument();
});

// filter and search
test('search is shown with right placeholder', async () => {
  const search = await screen.findByTestId('search-request-kur');
  const searchByPlaceHolder = screen.getByPlaceholderText('Search item');
  expect(search).toBeInTheDocument();
  expect(searchByPlaceHolder).toBeInTheDocument();
});
it('search request', async () => {
  const search = screen.getByTestId('search-request-kur');
  const input = within(search).getByPlaceholderText('Search item');
  fireEvent.change(input, { target: { value: 'REQ-20230209-6' } });
  await act(async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  expect(input).toHaveValue('REQ-20230209-6');
});
test('all filter is shown after user click filter button', async () => {
  // unhideFilter();
  const filterBox = await screen.findByTestId('request-kur-filter-box');
  expect(filterBox).toBeInTheDocument();
  expect(filterBox).toHaveStyle('display: flex');
  expect(filterBox).not.toHaveStyle('display: none');
});
test('filter pasar is shown', () => {
  // unhideFilter();
  waitFor(() =>
    expect(screen.findByTestId('request-kur-filterpasar')).toBeInTheDocument(),
  );
});
test('filter pasar placeholder is match with the design', () => {
  // unhideFilter();
  waitFor(() =>
    expect(screen.findByPlaceholderText('Select Pasar')).toBeInTheDocument(),
  );
});
test('filter type is shown', () => {
  // unhideFilter();
  waitFor(() =>
    expect(screen.findByTestId('request-kur-filtertype')).toBeInTheDocument(),
  );
});
test('filter type placeholder is match with the design', () => {
  // unhideFilter();
  waitFor(() =>
    expect(
      screen.findByPlaceholderText('Select Type of KUR'),
    ).toBeInTheDocument(),
  );
});
test('filter range date is shown', async () => {
  // await unhideFilter();
  waitFor(() =>
    expect(screen.findByTestId('request-kur-range-date')).toBeInTheDocument(),
  );
});
test('filter start date placeholder is match with the design', async () => {
  // unhideFilter();
  waitFor(() =>
    expect(screen.findByPlaceholderText('Start Date')).toBeInTheDocument(),
  );
});
test('filter end date placeholder is match with the design', async () => {
  // unhideFilter();
  waitFor(() =>
    expect(screen.findByPlaceholderText('End Date')).toBeInTheDocument(),
  );
});
test('if start date is filled and end date is empty, apply button is disabled', async () => {
  const applyButton = screen.findByTestId('request-kur-apply-btn');
  // await unhideFilter();
  await act(() => {
    mockRequestFilter({ submit_date_start: 1675844640 });
  });
  waitFor(() => expect(applyButton).toHaveAttribute('disabled'));
});
test('if end date is filled and start date is empty, apply button is disabled', async () => {
  const applyButton = screen.findByTestId('request-kur-apply-btn');
  // await unhideFilter();
  act(() => {
    mockRequestFilter({ submit_date_end: 1675844640 });
  });
  await unhideFilter();
  waitFor(() => expect(applyButton).toHaveAttribute('disabled'));
});
test('if end date and start date is not empty, apply button is not disabled', async () => {
  const applyButton = screen.findByTestId('request-kur-apply-btn');
  // await unhideFilter();
  act(() => {
    mockRequestFilter({
      submit_date_start: 1675844640,
      submit_date_end: 1675844640,
    });
  });
  await unhideFilter();
  waitFor(() => expect(applyButton).not.toHaveAttribute('disabled'));
});

// table
test('request kur table is shown', async () => {
  const requestKurTable = screen.findByTestId('request-kur-table');
  waitFor(() => expect(requestKurTable).toBeInTheDocument());
});
it('data of request kur table', async () => {
  await act(() => {
    mockRequest(MockRequestList);
  });
  const arrList = await screen.findAllByTestId(/list-table-/i);
  expect(arrList.length).toBe(2);
  vi.clearAllMocks();
});
