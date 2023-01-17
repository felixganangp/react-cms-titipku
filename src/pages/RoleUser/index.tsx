import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Table from 'components/Table';
import Modal from 'components/Modal';
import useToast from 'hooks/useToast';
import useModal from 'hooks/useModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleUserAction } from 'store/slice/RoleUser';

import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

import MenuList from 'components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormRoleUser from './components/form';

import { Bullet, Status } from './roleuser.styled';

export default function RoleUser() {
  // const toast = useToast();
  const formModal = useModal();
  const formModal2 = useModal();
  const dispatch = useAppDispatch();
  const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string | null>(null);

  React.useEffect(() => {
    dispatch(roleUserAction.fetchData());
  }, []);

  const headCell = [
    {
      id: 'name',
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
      format: (val: any) => <Bullet>{`\u2022  ${val.role}`}</Bullet>,
    },
    {
      id: 'last_update',
      label: 'Last Update',
      align: 'left',
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
                label: 'Change Role Access',
                onClick: () => {
                  console.log('change role access');
                },
              },
              {
                label: `Set to Inactive`,
                color: '#c10000',
                onClick: () => {
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

  const data = [
    {
      id: 1,
      name: 'Role User Name',
      email: 'email@titipku.com',
      role: 'Super Admin',
      status: false,
      last_update: 'Januari, 8, 2023 12:00 AM',
    },
    {
      id: 2,
      name: 'Role User Name',
      email: 'email@titipku.com',
      role: 'Super Admin',
      status: true,
      last_update: 'Januari, 8, 2023 12:00 AM',
    },
    {
      id: 3,
      name: 'Role User Name',
      email: 'email@titipku.com',
      role: 'Super Admin',
      status: true,
      last_update: 'Januari, 8, 2023 12:00 AM',
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
                />
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
                    border: 'solid 1px #ebeff3',
                  }}
                  onClick={formModal2.openModal}
                >
                  <SimCardDownloadOutlinedIcon />
                </IconButton>
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
                data={data}
                selected={[]}
                headCells={headCell}
                page={1}
                totalPage={10}
                onChangePage={(e) => console.log(e)}
                handleRequestSort={(e) => {
                  setOrderBy(e.orderBy);
                  setOrderType(e.orderType);
                }}
                orderType={orderType}
                orderBy={orderBy}
                enableCheckBox
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={formModal.open}
        title="Role User"
        onClose={formModal.closeModal}
      >
        <FormRoleUser />
      </Modal>
    </div>
  );
}
