import React, { useEffect, useState } from 'react';
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
import RoleAccessForm from './Form/Form';
import useModal from '../../hooks/useModal';
import MenuList from '@/components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RoleAccess() {
  const toast = useToast();
  const formModal = useModal();

  // data table
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
    {
      id: 'menu',
      label: 'Action',
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
          id: 101,
          name: 'Role User',
          is_checked: false,
          child: [],
        },
        {
          id: 102,
          name: 'Role Access',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: 'Products',
      is_checked: false,
      child: [
        {
          id: 201,
          name: 'Product Mangement',
          is_checked: false,
          child: [],
        },
        {
          id: 202,
          name: 'SKU Management',
          is_checked: false,
          child: [],
        },
        {
          id: 203,
          name: 'Category Management',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 3,
      name: 'Lapak',
      is_checked: false,
      child: [
        {
          id: 301,
          name: 'Area',
          is_checked: false,
          child: [],
        },
        {
          id: 302,
          name: 'Lapak',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 4,
      name: 'User',
      is_checked: false,
      child: [
        {
          id: 401,
          name: 'Nitiper',
          is_checked: false,
          child: [],
        },
        {
          id: 402,
          name: 'Jatiper',
          is_checked: false,
          child: [
            {
              id: 40201,
              name: 'Jatiper Management',
              is_checked: false,
            },
            {
              id: 40202,
              name: 'Jatiper Registration',
              is_checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'Transaction',
      is_checked: false,
      child: [
        {
          id: 501,
          name: 'Transaction',
          is_checked: false,
          child: [],
        },
        {
          id: 502,
          name: 'Urgent Order',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 6,
      name: 'Application',
      is_checked: false,
      child: [
        {
          id: 601,
          name: 'Notification',
          is_checked: false,
          child: [],
        },
        {
          id: 602,
          name: 'Banner',
          is_checked: false,
          child: [],
        },
        {
          id: 603,
          name: 'Event',
          is_checked: false,
          child: [],
        },
        {
          id: 604,
          name: 'Giveaway',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 7,
      name: 'Promo & Voucher',
      is_checked: false,
      child: [
        {
          id: 701,
          name: 'Promo Product',
          is_checked: false,
          child: [],
        },
        {
          id: 702,
          name: 'Join Promo',
          is_checked: false,
          child: [],
        },
        {
          id: 703,
          name: 'Voucher',
          is_checked: false,
          child: [],
        },
        {
          id: 704,
          name: 'Mass Voucher',
          is_checked: false,
          child: [],
        },
        {
          id: 705,
          name: 'Giveaway',
          is_checked: false,
          child: [],
        },
      ],
    },
    {
      id: 8,
      name: 'Request',
      is_checked: false,
      child: [
        {
          id: 801,
          name: 'Withdraw Request',
          is_checked: false,
          child: [],
        },
        {
          id: 802,
          name: 'Join Promo Request',
          is_checked: false,
          child: [],
        },
        {
          id: 803,
          name: 'New Product Request',
          is_checked: false,
          child: [],
        },
        {
          id: 804,
          name: 'Master Data Config',
          is_checked: false,
          child: [],
        },
        {
          id: 805,
          name: 'App Service',
          is_checked: false,
          child: [],
        },
      ],
    },
  ];

  // form
  const [open, setOpen] = useState<boolean>(false);
  const openForm = () => setOpen(!open);
  // const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    name: string;
    access: { [x: number]: boolean };
  }>({ name: '', access: { 0: false } });
  const [categorizedMenu, setCategorizedMenu] = useState<
    {
      parent: number;
      menu: number[];
    }[]
  >([]);

  const getInitialData = () => {
    const accessMenu: { [x: number]: boolean } = {};
    accessMenu[listOfMenu[0].child[0].id] = false;
    if (listOfMenu !== undefined) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        accessMenu[listOfMenu[i].id] = false;
        if (listOfMenu[i].child.length > 0) {
          for (let a = 0; a < listOfMenu[i].child.length; a += 1) {
            accessMenu[listOfMenu[i].child[a].id] = false;
            if (listOfMenu[i].child[a].child.length > 0) {
              for (let b = 0; b < listOfMenu[i].child[a].child.length; b += 1) {
                accessMenu[listOfMenu[i].child[a].child[b].id] = false;
              }
            }
          }
        }
      }
    }
    return { name: '', access: accessMenu };
  };

  useEffect(() => {
    const mappedData: {
      parent: number;
      menu: number[];
    }[] = [];
    if (listOfMenu.length > 0) {
      for (let i = 0; i < listOfMenu.length; i += 1) {
        if (listOfMenu[i].child.length > 0) {
          mappedData.push({
            parent: listOfMenu[i].id,
            menu: listOfMenu[i].child.map((a) => a.id),
          });
        }
      }
    }
    setCategorizedMenu(mappedData);
  }, []);

  return (
    <div>
      <RoleAccessForm
        open={open}
        onClose={() => setOpen(!open)}
        initialValues={formData}
        categorizedMenu={categorizedMenu}
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
                    setFormData(getInitialData());
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
