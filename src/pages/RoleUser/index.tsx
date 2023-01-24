import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import Modal from 'components/Modal';
import MenuList from 'components/MenuList';
import useModal from 'hooks/useModal';
import debounce from 'utils/debounce';
import moment from 'moment';

import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
// import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleUserAction } from 'store/slice/RoleUser';
import { RoleAccess } from 'models/RoleAccess';
import { CreateRoleUser } from 'models/RoleUser';
import FormRoleUser from './components/form';

import { Bullet, Status } from './roleuser.styled';

interface FormDataType {
  isEdit: boolean;
  data: CreateRoleUser;
}
export default function RoleUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roleUser = useAppSelector((state) => state.roleUser);

  const formModal = useModal();
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

  const headCell: HeadCells<RoleAccess>[] = [
    {
      id: 'full_name',
      label: 'Name',
      align: 'left',
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
      format: (val: any) => (
        <Bullet>{`\u2022  ${val.administrator_detail[0].administrator_role.name}`}</Bullet>
      ),
    },
    {
      id: 'last_update',
      label: 'Last Update',
      align: 'left',
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
      format: (val: any) => (
        <Status status={val.status}>
          <span>{val.status ? 'Active' : 'Inactive'}</span>
        </Status>
      ),
    },
    {
      id: 'menu',
      label: '',
      align: 'left',
      format: (val: any) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Edit',
                onClick: () => {
                  setFormData(val);
                  const data: FormDataType = {
                    isEdit: true,
                    data: {
                      name: val.full_name,
                      email: val.email,
                      roleAccess:
                        val.administrator_detail[0].administrator_role,
                      id: val.id,
                      id_status: 1,
                      account_type: 'cms',
                    },
                  };
                  setFormData(data);
                  formModal.openModal();
                },
              },
              {
                label: `Set to Inactive`,
                color: '#c10000',
                onClick: () => {
                  console.log(val);
                  console.log('set active inactive');
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
                page={roleUser.params.page}
                totalData={roleUser.total}
                count={roleUser.params.count}
                loading={roleUser.loading}
                onChangePage={(page) => handleChangePage(page)}

                // handleRequestSort={(e) => {
                //   setOrderBy(e.orderBy);
                //   setOrderType(e.orderType);
                // }}
                // orderType={orderType}
                // orderBy={orderBy}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={formModal.open}
        title="Add New Role User"
        onClose={formModal.closeModal}
      >
        <FormRoleUser
          onClose={onCloseForm}
          data={formData.data}
          isEdit={formData.isEdit}
        />
      </Modal>
    </div>
  );
}
