import React from 'react';
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

export default function RoleAccess() {
  const toast = useToast();

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
                <Button startIcon={<AddIcon />} onClick={callToast}>
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
