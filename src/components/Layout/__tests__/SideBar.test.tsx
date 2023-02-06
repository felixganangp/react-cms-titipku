import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SideBar from '../SideBar';
import Menu from '../SideBar/Menu';

const sideBar = render(
  <Provider store={store}>
    <BrowserRouter>
      <SideBar open setOpen={() => console.log('setOpen')} userDetails={null} />
    </BrowserRouter>
  </Provider>,
);

test('sidebar is shown', async () => {
  const sideBarContainer = await sideBar.findByTestId('sidebar');
  expect(sideBarContainer).toBeInTheDocument();
});

// test('sidebar menu is shown', async () => {
//   const menuList = [
//     {
//       id: 48,
//       title: 'KUR',
//       path: '',
//       icon: <LocalAtmIcon />,
//       child: [
//         {
//           id: 52,
//           title: 'Request',
//           path: '/kur/request',
//           child: [],
//         },
//       ],
//     },
//   ];
//   const sidebarMenuList = render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Menu listOfMenu={menuList} open />
//       </BrowserRouter>
//     </Provider>,
//   );
//   const sidebar = await sidebarMenuList.findAllByTestId('sidebar-menulist');
//   expect(sidebar).toContain(menuList[0]);
// });
