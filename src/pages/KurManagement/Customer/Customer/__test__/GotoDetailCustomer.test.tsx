/* eslint-disable @typescript-eslint/lines-between-class-members */
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import MockTheme from 'utils/MockTheme';
import { store } from 'store';
import { customerAction } from 'store/slice/kur/Customer';
import CustomerView from '../index';
import { MockLisCustomers } from './MockCustomer';

const openForm = (id: string, menulist?: boolean, index = 0) => {
  if (menulist) {
    const menuAction = screen.getAllByTestId('MoreVertIcon');
    fireEvent.click(menuAction[index]);

    const buttonElement = screen.getByTestId(id);
    fireEvent.click(buttonElement);
  } else {
    const buttonElement = screen.getByTestId(id);
    fireEvent.click(buttonElement);
  }
};
describe('Customer KUR Page go to details customer', async () => {
  const mockCustomer = vi.fn((data) =>
    store.dispatch(
      customerAction.fetchDataSuccess({
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
  beforeEach(() => {
    // vi.clearAllMocks();
    // const mockResponse = vi.fn();
    // Object.defineProperty(window, 'location', {
    //   value: {
    //     hash: {
    //       endsWith: mockResponse,
    //       includes: mockResponse,
    //     },
    //     assign: mockResponse,
    //   },
    //   writable: true,
    // });
    render(
      <React.Suspense fallback>
        <MockTheme>
          <CustomerView />
        </MockTheme>
      </React.Suspense>,
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
    // showFilter();
  });
  //* DETAILS */
  it('Details customer button clicked', async () => {
    await act(() => {
      mockCustomer(MockLisCustomers);
    });
    openForm('button-details-customer', true);
    const idSelectedCustomer = MockLisCustomers[0].id;
    expect(window.location.pathname).toBe(
      `/kur/customer/${idSelectedCustomer}`,
    );
  });
});
