import { expect, test } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ManageAccountIcon from '@mui/icons-material/ManageAccountsOutlined';
import ChildrenMenu from '../SideBar/ChildMenu';

afterEach(() => {
  cleanup();
});

const menuList = [
  {
    id: 48,
    title: 'KUR',
    path: '',
    icon: <LocalAtmIcon />,
    child: [
      {
        id: 52,
        title: 'Request',
        path: '/kur/request',
        child: [],
      },
      {
        id: 53,
        title: 'Payment',
        path: '/kur/payment',
        child: [],
      },
      {
        id: 54,
        title: 'Invoice Management',
        path: '/kur/invoice',
        child: [],
      },
      {
        id: 51,
        title: 'Customer',
        path: '/kur/customer',
        child: [],
      },
    ],
  },
  {
    id: 47,
    title: 'Admin Panel',
    path: '',
    icon: <ManageAccountIcon />,
    child: [
      {
        id: 49,
        title: 'Role User',
        path: '/role-user',
        child: [],
      },
      {
        id: 50,
        title: 'Role Access',
        path: '/role-access',
        child: [],
      },
    ],
  },
];

test('sidebar is shown', async () => {
  const sideBarContainer = screen.findByTestId('sidebar');
  waitFor(() => expect(sideBarContainer).toBeInTheDocument());
});

test('sidebar menu is shown', async () => {
  const parentMenu = screen.findByTestId('side-bar-parentmenu');
  waitFor(() => expect(parentMenu).toContainEqual(menuList[0].title));
});

test('sidebar child menu is shown', async () => {
  const childMenu = screen.findByTestId('side-bar-childmenu');
  waitFor(() => expect(childMenu).toContainEqual(menuList[0].child[0].title));
});

test('child menu background is different when this menu is active', async () => {
  const child = [
    {
      id: 1,
      title: 'Test Child Menu',
      path: '',
      child: [],
    },
  ];
  const childMenu = render(
    <Provider store={store}>
      <BrowserRouter>
        <ChildrenMenu
          child={child}
          open
          onSetCurrentMenu={(id) => {
            console.log(id);
          }}
          currentActiveMenu={child[0].id}
        />
      </BrowserRouter>
    </Provider>,
  );
  const childMenuButton = await childMenu.findByTestId(
    'sidebar-childmenu-button',
  );
  waitFor(() =>
    expect(childMenuButton).toHaveStyle('backgroundColor: #ebeff3'),
  );
  childMenu.unmount();
});
