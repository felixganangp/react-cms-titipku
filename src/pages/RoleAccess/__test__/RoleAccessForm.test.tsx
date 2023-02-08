import { Provider } from 'react-redux';
import { test } from 'vitest';
import { store } from 'store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RoleAccesPage from '..';
import RoleAccessForm from '../Form/Form';

afterEach(() => {
  cleanup();
});

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

test('role access form title is add when editvalue is null', async () => {
  const form = render(
    <Provider store={store}>
      <BrowserRouter>
        <RoleAccessForm
          open
          onClose={() => console.log('close')}
          editValue={null}
        />
      </BrowserRouter>
    </Provider>,
  );
  const title = form.findByTestId('role-access-form-title');
  waitFor(() => expect(title).toHaveTextContent('Add New Role Access'));
  form.unmount();
});

test('role access form title is edit when editvalue is not null', async () => {
  const editValue = {
    id: 1,
    name: 'edit',
    description: 'description',
    account_type: 'cms',
    controls: [
      {
        id: 1,
        activation: true,
      },
    ],
    is_exist: true,
  };
  const form1 = render(
    <Provider store={store}>
      <BrowserRouter>
        <RoleAccessForm
          open
          onClose={() => console.log('close')}
          editValue={editValue}
        />
      </BrowserRouter>
    </Provider>,
  );
  const title = form1.findByTestId('role-access-form-title');
  waitFor(() => expect(title).toHaveTextContent('Edit Role Access'));
  form1.unmount();
});
