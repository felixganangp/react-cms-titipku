import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useToast from 'hooks/useToast';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import Table from 'components/Table';
import Typography from '@mui/material/Typography';
import RoleAccessForm from './Form';

export default function RoleAccess() {
  const toast = useToast();

  // form
  const [open, setOpen] = useState<boolean>(false);
  const openForm = () => setOpen(!open);

  const callToast = () => {
    toast.openToast({
      headMsg: 'Successfully Add Role',
      deleted: false,
      severity: 'success',
    });
  };

  const callToast2 = () => {
    toast.openToast({
      headMsg: 'Successfully Download Role Access Data',
      deleted: false,
      severity: 'success',
    });
  };

  const headCell = [
    {
      id: 'roleName',
      label: 'Role Name',
      align: 'left',
    },
    {
      id: 'numberOfUser',
      label: 'User',
      align: 'left',
    },
  ];

  const dataTest = [
    {
      roleName: 'Super Admin',
      numberOfUser: 4,
    },
    {
      roleName: 'Manager',
      numberOfUser: 12,
    },
  ];

  const listOfMenu = [
    {
      id: 1,
      name: 'Admin Panel',
      is_checked: false,
      child: [
        {
          id: 2,
          name: 'Role User',
          is_checked: false,
          child: [],
        },
        {
          id: 3,
          name: 'Role Access',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 4,
      name: 'Products',
      is_checked: false,
      child: [
        {
          id: 5,
          name: 'Product Mangement',
          is_checked: false,
          child: [],
        },
        {
          id: 6,
          name: 'SKU Management',
          is_checked: false,
          child: [],
        },
        {
          id: 7,
          name: 'Category Management',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 8,
      name: 'Lapak',
      is_checked: false,
      child: [
        {
          id: 9,
          name: 'Area',
          is_checked: false,
          child: [],
        },
        {
          id: 10,
          name: 'Lapak',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 11,
      name: 'User',
      is_checked: false,
      child: [
        {
          id: 12,
          name: 'Nitiper',
          is_checked: false,
          child: [],
        },
        {
          id: 13,
          name: 'Jatiper',
          is_checked: false,
          child: [
            {
              id: 14,
              name: 'Jatiper Management',
              is_checked: false,
            },
            {
              id: 15,
              name: 'Jatiper Registration',
              is_checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 16,
      name: 'Transaction',
      is_checked: false,
      child: [
        {
          id: 17,
          name: 'Transaction',
          is_checked: false,
          child: [],
        },
        {
          id: 18,
          name: 'Urgent Order',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 19,
      name: 'Application',
      is_checked: false,
      child: [
        {
          id: 20,
          name: 'Notification',
          is_checked: false,
          child: [],
        },
        {
          id: 21,
          name: 'Banner',
          is_checked: false,
          child: [],
        },
        {
          id: 22,
          name: 'Event',
          is_checked: false,
          child: [],
        },
        {
          id: 23,
          name: 'Giveaway',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 24,
      name: 'Promo & Voucher',
      is_checked: false,
      child: [
        {
          id: 25,
          name: 'Promo Product',
          is_checked: false,
          child: [],
        },
        {
          id: 26,
          name: 'Join Promo',
          is_checked: false,
          child: [],
        },
        {
          id: 27,
          name: 'Voucher',
          is_checked: false,
          child: [],
        },
        {
          id: 28,
          name: 'Mass Voucher',
          is_checked: false,
          child: [],
        },
        {
          id: 29,
          name: 'Giveaway',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 30,
      name: 'Request',
      is_checked: false,
      child: [
        {
          id: 31,
          name: 'Withdraw Request',
          is_checked: false,
          child: [],
        },
        {
          id: 32,
          name: 'Join Promo Request',
          is_checked: false,
          child: [],
        },
        {
          id: 33,
          name: 'New Product Request',
          is_checked: false,
          child: [],
        },
        {
          id: 34,
          name: 'Master Data Config',
          is_checked: false,
          child: [],
        },
        {
          id: 35,
          name: 'App Service',
          is_checked: false,
          child: [],
        },
      ],
    },
  ];

  return (
    <div>
      <RoleAccessForm
        open={open}
        onClose={() => setOpen(!open)}
        listOfMenu={listOfMenu}
      />
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
                <Button startIcon={<AddIcon />} onClick={openForm}>
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
                />
                <IconButton
                  sx={{
                    borderRadius: '4px',
                    boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
                    border: 'solid 1px #ebeff3',
                  }}
                  onClick={callToast2}
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
                data={dataTest}
                selected={[]}
                headCells={headCell}
                page={1}
                totalPage={10}
                onChangePage={(e) => console.log(e)}
                // loading
                enableCheckBox
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
