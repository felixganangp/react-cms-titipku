import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import Table from 'components/Table';

import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

import useToast from 'hooks/useToast';

export default function RoleUser() {
  const toast = useToast();

  const callToastExample = () => {
    toast.openToast({
      headMsg: 'Succecc Delete',
      deleted: true,
      severity: 'success',
    });
  };

  const callAnotherTypeToast = () => {
    toast.openToast({
      headMsg: 'Upload failde',
      message: 'please connect api first',
      severity: 'error',
    });
  };

  const headCell = [
    {
      id: 'name',
      label: 'Name',
      align: 'center',
    },
    {
      id: 'value',
      label: 'Value',
      align: 'center',
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
                <Button startIcon={<AddIcon />} onClick={callToastExample}>
                  Add New
                </Button>
                <TextField
                  placeholder="Search for Category Name, Category ID..."
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
                  onClick={callAnotherTypeToast}
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
                data={[{ name: 'Testign' }]}
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
