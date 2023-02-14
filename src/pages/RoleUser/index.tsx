import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import Modal from 'components/Modal';
import Status from 'components/Status';
import MenuList from 'components/MenuList';
import useModal from 'hooks/useModal';
import debounce from 'utils/debounce';
import moment from 'moment';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleUserAction } from 'store/slice/RoleUser';
import { CreateRoleUser, RoleUser as RoleUserTypes } from 'models/RoleUser';
import FormRoleUser from './components/form';
import SetStatusUser from './components/SetStatusUser';

import { Bullet } from './roleuser.styled';

interface FormDataType {
  isEdit: boolean;
  data: CreateRoleUser;
}

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
export default function RoleUser() {
  const dispatch = useAppDispatch();
  const roleUser = useAppSelector((state) => state.roleUser);

  const formModal = useModal();
  const setStatusUserModal = useModal();
  const [formData, setFormData] = useState<FormDataType>({
    isEdit: false,
    data: {
      account_type: 'cms',
      email: '',
      id_status: 1,
      name: '',
      roleAccess: {
        account_type: 'cms',
        is_exist: true,
        name: '',
        total_admin: 0,
      },
    },
  });
  // const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc');
  // const [orderBy, setOrderBy] = useState<string | null>(null);

  const onCloseForm = async () => {
    await dispatch(roleUserAction.fetchData(roleUser.params));
    setFormData({
      isEdit: false,
      data: {
        account_type: 'cms',
        email: '',
        id_status: 1,
        name: '',
        roleAccess: {
          account_type: 'cms',
          is_exist: true,
          name: '',
        },
      },
    });
    formModal.closeModal();
  };
  React.useEffect(() => {
    dispatch(roleUserAction.fetchData(roleUser.params));
  }, [roleUser.params]);

  const handleSearch = (value: string) => {
    dispatch(
      roleUserAction.setParams({
        account_type: 'cms',
        page: 1,
        // defaultSearch: value,
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
      label: 'Email Address',
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
    {
      id: 'menu',
      label: '',
      align: 'left',
      format: (val) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Edit',
                onClick: () => {
                  const data: FormDataType = {
                    isEdit: true,
                    data: {
                      name: val.full_name,
                      email: val.email,
                      roleAccess:
                        val.administrator_detail[0].administrator_role,
                      id: val.id,
                      id_status:
                        val.administrator_detail[0].administrator_status.id,
                      account_type: 'cms',
                    },
                  };
                  setFormData(data);
                  formModal.openModal();
                },
              },
              {
                label: `Set to ${
                  val.administrator_detail[0].administrator_status.id === 1
                    ? 'Inactive'
                    : 'Active'
                }`,
                color:
                  val.administrator_detail[0].administrator_status.id === 1
                    ? '#c10000'
                    : '#008e58',
                onClick: () => {
                  const data: FormDataType = {
                    isEdit: true,
                    data: {
                      name: val.full_name,
                      email: val.email,
                      roleAccess:
                        val.administrator_detail[0].administrator_role,
                      id: val.id,
                      id_status:
                        val.administrator_detail[0].administrator_status.id,
                      account_type: 'cms',
                    },
                  };
                  setFormData(data);
                  setStatusUserModal.openModal();
                },
              },
            ]}
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuList>
        </>
      ),
    },
  ];

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="titlePage">Role User</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Box display="flex" gap="20px" flexWrap="wrap">
                <Button startIcon={<AddIcon />} onClick={formModal.openModal}>
                  Add New
                </Button>
                <TextField
                  placeholder="Search for name or email"
                  size="small"
                  sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                  fullWidth
                  defaultValue={roleUser.params.search}
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
                {/* <IconButton
                  sx={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
                    border: 'solid 1px #ebeff3',
                  }}
                  onClick={formModal2.openModal}
                >
                  <SimCardDownloadOutlinedIcon />
                </IconButton> */}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box
              bgcolor="#fff"
              p="7px"
              borderRadius="5px"
              boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
            >
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
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={formModal.open}
        title={`${formData.isEdit ? 'Edit ' : 'Add New '} Role User`}
        onClose={onCloseForm}
      >
        <FormRoleUser
          onClose={onCloseForm}
          data={formData.data}
          isEdit={formData.isEdit}
        />
      </Modal>
      <Modal
        open={setStatusUserModal.open}
        title={`Set to ${
          formData.data.id_status === 1 ? 'Inactive' : 'Active'
        }`}
        onClose={setStatusUserModal.closeModal}
      >
        <SetStatusUser
          onClose={setStatusUserModal.closeModal}
          data={formData.data}
        />
      </Modal>
    </div>
  );
}
