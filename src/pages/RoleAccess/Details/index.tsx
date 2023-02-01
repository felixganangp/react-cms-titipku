import React, { useEffect, useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import MenuList from 'components/MenuList';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import SubDetailsPagesWrapper, {
  SubDetail,
} from 'components/Accordion/SubDetailsPagesWrapper';
import DescDetails from 'components/DescDetails';
import Status from 'components/Status';
import AccordionOnDetails from 'components/Accordion/Details';
import debounce from 'utils/debounce';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import moment from 'moment';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleAccessAction } from 'store/slice/RoleAccess';
import { roleUserAction } from 'store/slice/RoleUser';
import { RoleUser as RoleUserTypes } from 'models/RoleUser';

import { Bullet } from 'pages/RoleUser/roleuser.styled';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  TitlePage,
  BackButton,
  Menu,
  HorizontalContent,
  Control,
  ChildMenu,
} from './details.styled';

import DeleteConfirm from '../components/DeleteConfirm';
import RoleAccessForm from '../Form/Form';

const statusColor = (id: number, name: string) => {
  let nameCurrent = name;
  let colorCurrent = 'rgba(0,0,0,0.3)';

  if (id === 1) {
    nameCurrent = 'Active';
    colorCurrent = '#008e58';
  }

  if (id === 2) {
    nameCurrent = 'Inactive';
    colorCurrent = '#c10000';
  }

  return { nameCurrent, colorCurrent };
};

export default function RoleUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const roleAccesses = useAppSelector((state) => state.roleAccess);
  const listOfMenu = useAppSelector((state: any) => state.roleAccess.menuData);

  const roleUser = useAppSelector((state) => state.roleUser);
  const [accessMenu, setAccessMenu] = useState<{ [id: number]: boolean }>({});
  const deleteModal = useModal();
  const editModal = useModal();

  useEffect(() => {
    if (id) {
      dispatch(roleAccessAction.fetchDataDetail({ id }));
    }
  }, []);

  useEffect(() => {
    dispatch(
      roleUserAction.fetchData({ ...roleUser.params, count: 5, id_role: id }),
    );
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
    },
    {
      id: 'email',
      label: 'Email',
      align: 'left',
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
      format: (val) => {
        const status = val.administrator_detail[0].administrator_status;

        return (
          <Status color={statusColor(status.id, status.name).colorCurrent}>
            {statusColor(status.id, status.name).nameCurrent}
          </Status>
        );
      },
    },
  ];

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Menu>Role Access Management</Menu>
                  <Link style={{ textDecoration: 'none' }} to="/role-access">
                    <BackButton
                      sx={{ '&:hover': { backgroundColor: '#ffff' } }}
                      startIcon={<ArrowBackIosIcon />}
                    >
                      <TitlePage>Details</TitlePage>
                    </BackButton>
                  </Link>
                </Box>
                <div>
                  <MenuList
                    menu={[
                      {
                        label: 'Edit',
                        onClick: () => {
                          editModal.openModal();
                        },
                      },
                      {
                        label: 'Delete',
                        color: '#c10000',
                        onClick: () => {
                          deleteModal.openModal();
                        },
                      },
                    ]}
                  >
                    <Button
                      startIcon={<KeyboardArrowDownIcon />}
                      // onClick={() => setOpenFilter((prev) => !prev)}
                    >
                      Action
                    </Button>
                  </MenuList>
                </div>
              </Box>
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
        <SubDetail title="Menu Access" defaultOpen>
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
        </SubDetail>
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
      <Modal
        open={deleteModal.open}
        title="Delete Role"
        onClose={deleteModal.closeModal}
      >
        <DeleteConfirm
          onClose={() => {
            deleteModal.closeModal();
            navigate('/role-access');
          }}
          data={roleAccesses.detailsData}
        />
      </Modal>
      <RoleAccessForm
        open={editModal.open}
        onClose={() => editModal.closeModal()}
        editValue={roleAccesses.detailsData || null}
        // isEdit={isEdit}
      />
    </div>
  );
}
