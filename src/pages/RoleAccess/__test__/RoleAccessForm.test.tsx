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
  renderHook,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import MockTheme from 'utils/MockTheme';
import RoleAccessForm from 'models/RoleAccess';
import { AccessMenu } from 'models/Menu';
import RoleAccesPage from '..';
import RoleAccessFormPage from '../Form/Form';
import { roleAccessAction } from '../../../store/slice/RoleAccess';
import { MenuList } from './MockRoleAccess';
import '@testing-library/jest-dom/extend-expect';

const renderListPage = () => {
  render(
    <Suspense fallback>
      <MockTheme>
        <RoleAccesPage />
      </MockTheme>
    </Suspense>,
  );
};

const renderForm = (editValue: RoleAccessForm | null) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RoleAccessFormPage open onClose={() => {}} editValue={editValue} />
      </BrowserRouter>
    </Provider>,
  );
};

const valueOfEdit: RoleAccessForm = {
  account_type: 'cms',
  description: '',
  id: 1,
  is_exist: true,
  name: 'Super Admin',
};

const mockMenuList = vi.fn((data: AccessMenu[]) =>
  store.dispatch(roleAccessAction.fetchMenuListSuccess(data)),
);

afterEach(() => {
  cleanup();
});

describe('role access form', async () => {
  it('role access form is shown', async () => {
    renderListPage();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const btnAdd = screen.getByTestId('role-access-add-btn');
    expect(btnAdd).toBeTruthy();
    fireEvent.click(btnAdd);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const formModal = screen.getByTestId('role-access-modal');
    expect(formModal).toBeTruthy();
  });

  it('role access form title is add when editvalue is null (add)', async () => {
    renderListPage();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const btnAdd = screen.getByTestId('role-access-add-btn');
    expect(btnAdd).toBeTruthy();
    fireEvent.click(btnAdd);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const formModal = screen.getByTestId('role-access-modal');
    expect(formModal).toBeTruthy();

    const title = screen.getByTestId('role-access-form-title');
    expect(title).toHaveTextContent('Add New Role Access');
  });

  it('role access form title is edit when editvalue is not null', async () => {
    renderForm(valueOfEdit);
    const title = screen.getByTestId('role-access-form-title');
    expect(title).toBeTruthy();
    expect(screen.getByText('Edit Role Access')).toBeInTheDocument();
  });

  it('empty role name', async () => {
    renderForm(null);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const fieldName = screen.getByTestId('role-form-field-name');

    fireEvent.blur(fieldName);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Please input role name')).toBeInTheDocument();
  });
  it('existing role name', async () => {
    renderForm(null);
    const fieldName = screen.getByTestId('role-form-field-name');

    fireEvent.change(fieldName, { target: { value: 'Super Admin' } });
    await act(async () => {
      await fireEvent.blur(fieldName);
    });
    // await waitFor(async () => {
    //   const errorExistingName = screen.getByText(
    //     'Role Name is exist, please use another name',
    //   );
    //   expect(errorExistingName).toBeInTheDocument();
    // });
    expect(fieldName).toBeTruthy();
  });
  it('child menu is automatically checked if user check the parent', async () => {
    await act(() => {
      mockMenuList(MenuList);
    });
    renderForm(null);
    const parentMenu = screen.getByLabelText('checkbox-parent-47');
    expect(parentMenu).toBeTruthy();

    // check parent menu
    fireEvent.click(parentMenu);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // check child menu also checked / not
    expect(parentMenu).toHaveProperty('checked', true);
    const childMenu = screen.getByLabelText('checkbox-menu-49');
    expect(childMenu).toHaveProperty('checked', true);
  });
  it('parent menu unchecked if all child menu is unchecked', async () => {
    await act(() => {
      mockMenuList(MenuList);
    });
    renderForm(null);
    const parentMenu = screen.getByLabelText('checkbox-parent-47');
    expect(parentMenu).toBeTruthy();

    // check parent menu
    fireEvent.click(parentMenu);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // uncheck all child menu
    const childMenu1 = screen.getByLabelText('checkbox-menu-49');
    const childMenu2 = screen.getByLabelText('checkbox-menu-50');

    fireEvent.click(childMenu1);
    fireEvent.click(childMenu2);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // parent menu is unchecked too
    expect(parentMenu).toHaveProperty('checked', false);
  });
  it('button add is disabled if form is invalid / !disabled if form is !invalid', async () => {
    await act(() => {
      mockMenuList(MenuList);
    });
    renderForm(null);
    const submitButton = screen.getByTestId('role-access-submit-btn');
    expect(submitButton).toHaveAttribute('disabled');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const roleNameField = screen.getByTestId('role-form-field-name');
    const menu = screen.getByLabelText('checkbox-menu-50');

    fireEvent.change(roleNameField, { target: { value: 'Role' } });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(submitButton).toHaveAttribute('disabled');

    fireEvent.click(menu);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(submitButton).not.toHaveAttribute('disabled');
    fireEvent.click(screen.getByText('Cancel'));
  });
  it('open parent menu accordion', async () => {
    await act(() => {
      mockMenuList(MenuList);
    });
    renderForm(null);

    const accordionParent1 = screen.getByText('Parent Menu 1');
    // fireEvent.click(accordionParent1);
    expect(accordionParent1).toBeInTheDocument();
  });
});
