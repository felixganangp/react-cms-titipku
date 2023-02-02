import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Table from 'components/Table';
import MenuList from 'components/MenuList';
import useModal from 'hooks/useModal';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Ivoice() {
  const formModal = useModal();

  const headCell = [
    {
      id: 'id',
      label: 'ID',
      align: 'left',
      enableSort: true,
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
      format: (val) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Details',
                onClick: () => {},
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
      <Box>
        <Box p="20px" bgcolor="#F5F7FA">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <Typography variant="titlePage">Invoice Managemet</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Box display="flex" gap="20px" flexWrap="wrap">
                  <Button startIcon={<AddIcon />} onClick={formModal.openModal}>
                    Add New
                  </Button>
                  <Box flex="1">
                    <TextField
                      placeholder="Search for name or email"
                      size="small"
                      sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                      fullWidth
                      // defaultValue={roleUser.params.search}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(event) => {
                        // debounceSearch(event.target.value);
                      }}
                    />
                  </Box>
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={formModal.openModal}
                  >
                    Filter
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box
                bgcolor="#fff"
                p="7px"
                borderRadius="5px"
                boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
                data-testid="table-customer"
              >
                <Table
                  data={[{ data: '1' }]}
                  headCells={headCell}
                  // page={customerKur.params.page}
                  // totalData={customerKur.total}
                  // count={customerKur.params.count}
                  // orderBy={customerKur.params.order_by}
                  // orderType={customerKur.params.order_type}
                  // onChangePage={(val) => handleChangePage(val)}
                  // onChangeSort={(val) => handleChangeSort(val)}
                  // enableCheckBox
                  // disableNumber
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
