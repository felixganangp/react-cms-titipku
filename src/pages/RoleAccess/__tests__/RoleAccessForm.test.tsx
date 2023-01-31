import { Provider } from 'react-redux';
import { test } from 'vitest';
import { store } from 'store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoleAccesPage from '..';
import RoleAccessForm from '../Form/Form';

test('role access form is shown', async () => {
  const roleAccessList = render(
    <Provider store={store}>
      <BrowserRouter>
        <RoleAccesPage />
      </BrowserRouter>
    </Provider>,
  );
  const btnAdd = await roleAccessList.findByTestId('role-access-add-btn');
  const formModal = screen.findByTestId('role-access-modal');
  fireEvent.click(btnAdd);
  waitFor(() => expect(formModal).toBeInTheDocument());
  roleAccessList.unmount();
});
