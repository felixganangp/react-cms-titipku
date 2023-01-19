import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import debounce from 'utils/debounce';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { roleAccessAction } from 'store/slice/RoleAccess';
import { RoleAccess } from 'models/RoleAccess';
import RoleAccessForm from './Form/Form';
import MenuList from '../../components/MenuList';

export default function RoleAccesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roleAccesses = useAppSelector((state) => state.roleAccess);

  useEffect(() => {
    dispatch(roleAccessAction.fetchMenuList());
  }, []);

  useEffect(() => {
    dispatch(roleAccessAction.fetchData(roleAccesses.params));
  }, [roleAccesses.params]);

  const handleSearch = (value: string) => {
    dispatch(
      roleAccessAction.setParams({
        account_type: 'cms',
        page: 1,
        search: value,
      }),
    );
  };
  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleChangePage = (value: number) => {
    dispatch(
      roleAccessAction.setParams({
        account_type: 'cms',
        page: value,
      }),
    );
  };

  const headCell: HeadCells<RoleAccess>[] = [
    {
      id: 'name',
      label: 'Role Name',
      align: 'left',
    },
    {
      id: 'total_admin',
      label: 'User',
      align: 'left',
    },
    {
      id: 'menu',
      label: 'Action',
      align: 'left',
      width: '20px',
      format: (val) => (
        <div>
          <MenuList
            menu={[
              {
                label: 'Details',
                onClick: () => {
                  navigate(`/role-access/${val.id}`);
                },
              },
              {
                label: 'Edit',
                onClick: () => {
                  console.log(val);
                },
              },
              {
                label: 'Delete',
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
        </div>
      ),
    },
  ];

  // form
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    name: string;
    access: { [x: number]: boolean };
  }>({ name: '', access: { 0: false } });

  return (
    <div>
      <RoleAccessForm
        open={open}
        onClose={() => setOpen(!open)}
        // initialValues={formData}
        isEdit={isEdit}
      />
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="titlePage">Role Access</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Box display="flex" gap="20px" flexWrap="wrap">
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpen(!open);
                    // setFormData(getInitialData());
                    setIsEdit(false);
                  }}
                >
                  Add New
                </Button>
                <TextField
                  placeholder="Search for Role Access Name"
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
                data={roleAccesses.data}
                headCells={headCell}
                page={roleAccesses.params.page}
                totalData={roleAccesses.total}
                count={roleAccesses.params.count}
                loading={roleAccesses.loading}
                onChangePage={(page) => handleChangePage(page)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
