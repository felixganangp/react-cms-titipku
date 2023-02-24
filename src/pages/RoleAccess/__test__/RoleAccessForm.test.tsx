/* eslint-disable no-promise-executor-return */
import { Provider } from 'react-redux';
import { test } from 'vitest';
import { store } from 'store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import MockTheme from 'utils/MockTheme';
import RoleAccesPage from '..';
import RoleAccessForm from '../Form/Form';

const renderListPage = () => {
  render(
    <Suspense fallback>
      <MockTheme>
        <RoleAccesPage />
      </MockTheme>
    </Suspense>,
  );
};

const editValue = {
  account_type: 'cms',
  description: '',
  id: 47,
  is_exist: true,
  name: 'Role 10',
  total_admin: 0,
};

afterEach(() => {
  cleanup();
});

test('role access form is shown', async () => {
  renderListPage();
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  const btnAdd = screen.getByTestId('role-access-add-btn');
  expect(btnAdd).toBeTruthy();
  fireEvent.click(btnAdd);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  const formModal = screen.getByTestId('role-access-modal');
  expect(formModal).toBeTruthy();
});

test('role access form title is add when editvalue is null', async () => {
  renderListPage();
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  const btnAdd = screen.getByTestId('role-access-add-btn');
  expect(btnAdd).toBeTruthy();
  fireEvent.click(btnAdd);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
  const formModal = screen.getByTestId('role-access-modal');
  expect(formModal).toBeTruthy();

  const title = screen.getByTestId('role-access-form-title');
  expect(title).toHaveTextContent('Add New Role Access');
});

// test('role access form title is edit when editvalue is not null', async () => {
//   const editValue = {
//     id: 1,
//     name: 'edit',
//     description: 'description',
//     account_type: 'cms',
//     controls: [
//       {
//         id: 1,
//         activation: true,
//       },
//     ],
//     is_exist: true,
//   };
//   const form1 = render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <RoleAccessForm
//           open
//           onClose={() => console.log('close')}
//           editValue={editValue}
//         />
//       </BrowserRouter>
//     </Provider>,
//   );
//   const title = screen.findByTestId('role-access-form-title');
//   expect(title).toHaveTextContent('Edit Role Access');
//   form1.unmount();
// });
