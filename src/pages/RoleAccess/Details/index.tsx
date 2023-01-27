import React, { useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import DescDetails from 'components/DescDetails';
import Status from 'components/Status';
import AccordionOnDetails from 'components/Accordion/Details';
import debounce from 'utils/debounce';
import moment from 'moment';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleAccessAction } from 'store/slice/RoleAccess';
import { roleUserAction } from 'store/slice/RoleUser';
import { RoleUser as RoleUserTypes } from 'models/RoleUser';

import { Bullet } from 'pages/RoleUser/roleuser.styled';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  TitlePage,
  BackButton,
  Menu,
  HorizontalContent,
  Control,
  ChildMenu,
} from './details.styled';

export default function RoleUserDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const roleAccesses = useAppSelector((state) => state.roleAccess);
  const listOfMenu = useAppSelector((state: any) => state.roleAccess.menuData);

  const roleUser = useAppSelector((state) => state.roleUser);
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    if (id) {
      dispatch(roleAccessAction.fetchDataDetail({ id }));
      // eslint-disable-next-line radix
    }
  }, []);

  useEffect(() => {
    dispatch(roleUserAction.fetchData({ ...roleUser.params, id_role: id }));
  }, [roleUser.params]);

  useEffect(() => {
    // for checked attribute on checkbox
    const access: { [x: number]: boolean } = {};
    if (listOfMenu !== undefined) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        access[listOfMenu[i].id] = listOfMenu[i].is_checked;
        if (listOfMenu[i].sub_menu !== null) {
          for (let a = 0; a < listOfMenu[i].sub_menu.length; a += 1) {
            access[listOfMenu[i].sub_menu[a].id] =
              listOfMenu[i].sub_menu[a].is_checked;
          }
        }
      }
    }
    setAccessMenu({ ...access });
  }, [listOfMenu]);

  const handleSearch = (value: string) => {
    dispatch(
      roleUserAction.setParams({
        account_type: 'cms',
        page: 1,
        search: value,
      }),
    );
  };
  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleChangePage = (value: number) => {
    dispatch(
      roleUserAction.setParams({
        account_type: 'cms',
        page: value,
      }),
    );
  };

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      roleUserAction.setParams({
        account_type: 'cms',
        page: 1,
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  const headCell: HeadCells<RoleUserTypes>[] = [
    {
      id: 'full_name',
      label: 'Name',
      align: 'left',
      enableSort: true,
      isSticky: true,
    },
    {
      id: 'email',
      label: 'Email',
      align: 'left',
      isSticky: true,
    },
    {
      id: 'role',
      label: 'Role',
      align: 'left',
      enableSort: true,
      format: (val: any) => (
        <Bullet>{`\u2022  ${val.administrator_detail[0].administrator_role.name}`}</Bullet>
      ),
    },
    {
      id: 'updated_at',
      label: 'Last Update',
      align: 'left',
      enableSort: true,
      format: (val: any) => {
        return (
          <p>{moment.unix(val.updated_at).format('MMMM DD, YYYY hh.mm A')}</p>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      enableSort: true,
      format: (val: any) => (
        <Status color="rgba(0,0,0,0.3)">
          {val.administrator_detail[0].administrator_status.name}
        </Status>
      ),
    },
  ];

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Menu>Role Access Management</Menu>
              <Link style={{ textDecoration: 'none' }} to="/role-access">
                <BackButton
                  sx={{ '&:hover': { backgroundColor: '#ffff' } }}
                  startIcon={<ArrowBackIosIcon />}
                >
                  <TitlePage>Details</TitlePage>
                </BackButton>
              </Link>
            </Card>
          </Grid>
        </Grid>
        <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
          <Box p="20px">
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="ID"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content={roleAccesses.detailsData?.id}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Role Access Name"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content={roleAccesses.detailsData?.name}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="User"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content={roleAccesses.detailsData?.total_admin}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>
        <SubDetailsPagesWrapper title="Menu Access" defaultOpen>
          <Box p="20px">
            {listOfMenu.map((parentMenu: any) => (
              <AccordionOnDetails
                title={parentMenu.menu}
                key={parentMenu.id}
                parent
                havingChild={parentMenu.sub_menu}
                headerContent={
                  <Control
                    style={{ marginRight: '0px' }}
                    label=""
                    key={parentMenu.id}
                    disabled
                    control={
                      <Checkbox
                        checked={accessMenu[parentMenu.id] || false}
                        // onChange={(e) => {
                        //   handleChangeChild(e, parentMenu.id);
                        // }}
                      />
                    }
                  />
                }
              >
                <div>
                  {parentMenu.sub_menu !== null &&
                    parentMenu.sub_menu.map((menu: any) =>
                      menu.sub_menu !== null ? (
                        <HorizontalContent key={menu.id}>
                          <Typography sx={{ ml: '40px', fontSize: '15px' }}>
                            {menu.menu}
                          </Typography>
                          <Control
                            label=""
                            key={menu.id}
                            control={
                              <Checkbox
                                disabled
                                checked={accessMenu[menu.id] || false}
                                // onChange={(e) => {
                                // handleChangeParentChild(
                                //   e,
                                //   parentMenu.id,
                                //   menu.id,
                                // );
                                // }}
                              />
                            }
                          />
                        </HorizontalContent>
                      ) : (
                        <Box sx={{ ml: '18px' }} key={menu.id}>
                          <AccordionOnDetails
                            title={menu.menu}
                            key={menu.id}
                            parent={false}
                            havingChild={menu.sub_menu}
                            headerContent={
                              <Control
                                label=""
                                key={menu.id}
                                disabled
                                control={
                                  <Checkbox
                                    checked={accessMenu[menu.id] || false}
                                    // onChange={(e) => {
                                    // handleChangeParentChild(
                                    //   e,
                                    //   parentMenu.id,
                                    //   menu.id,
                                    // );
                                    // }}
                                  />
                                }
                              />
                            }
                          >
                            <div>
                              {menu.child.map((childMenu: any) => (
                                <HorizontalContent key={childMenu.id}>
                                  <ChildMenu>{childMenu.menu}</ChildMenu>
                                  <Control
                                    label=""
                                    key={childMenu.id}
                                    control={
                                      <Checkbox
                                        checked={
                                          accessMenu[childMenu.id] || false
                                        }
                                        // onChange={(e) => {}}
                                      />
                                    }
                                  />
                                </HorizontalContent>
                              ))}
                            </div>
                          </AccordionOnDetails>
                        </Box>
                      ),
                    )}
                </div>
              </AccordionOnDetails>
            ))}
          </Box>
        </SubDetailsPagesWrapper>
        <SubDetailsPagesWrapper title="Role User List" defaultOpen>
          <Box p="20px">
            <Box display="flex" gap="20px" flexWrap="wrap" mb="20px">
              <TextField
                placeholder="Search for name or email"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  debounceSearch(event.target.value);
                }}
              />
            </Box>
            <Table
              data={roleUser.data}
              headCells={headCell}
              totalData={roleUser.total}
              loading={roleUser.loading}
              count={roleUser.params.count}
              page={roleUser.params.page}
              orderBy={roleUser.params.order_by}
              orderType={roleUser.params.order_type}
              onChangePage={(page) => handleChangePage(page)}
              onChangeSort={(value) => handleChangeSort(value)}
            />
          </Box>
        </SubDetailsPagesWrapper>
      </Box>
    </div>
  );
}
