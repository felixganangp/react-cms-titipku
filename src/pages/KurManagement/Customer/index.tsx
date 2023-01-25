import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Card,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Autocomplete,
  Collapse,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { skuManagementAction } from 'store/slice/SkuManagement';
import useModal from 'hooks/useModal';
import Table from 'components/Table';
import Modal from 'components/Modal';
import FormCustomer from './components/form';

export default function KurCustomer() {
  const [openFilter, setOpenFilter] = useState(false);

  const formModal = useModal();

  const headCell = [
    {
      id: 'customer_id',
      label: 'Cust. ID',
      align: 'left',
      format: (val: any) => <div>Customer ID</div>,
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
    {
      id: 'kur_type',
      label: 'KUR Type',
      align: 'left',
    },
    {
      id: 'create_date',
      label: 'Create Date',
      align: 'left',
    },
    {
      id: 'merchant',
      label: 'Merchant',
      align: 'left',
    },
    {
      id: 'pasar',
      label: 'Pasar',
      align: 'left',
    },
    {
      id: 'credit_score',
      label: 'Credit Score',
      align: 'left',
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
    },
  ];
  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography data-testid="header-page" variant="titlePage">
              KUR Customer
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box display="flex" gap="20px" flexWrap="wrap">
              <Box
                width="100%"
                sx={{ display: 'flex', gap: 2, alignContent: 'center' }}
              >
                <Button
                  data-testid="button-add-customer"
                  sx={{ width: '12%' }}
                  startIcon={<AddIcon />}
                  onClick={formModal.openModal}
                >
                  Add Customer
                </Button>
                <Box
                  width="90%"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <TextField
                    data-testid="search-customer"
                    placeholder="Search for customer name"
                    size="small"
                    sx={{ bgcolor: '#fafafa', maxWidth: '560px', width: '60%' }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() => setOpenFilter((prev) => !prev)}
                  >
                    Filter
                  </Button>
                </Box>
              </Box>
            </Box>

            <Collapse in={openFilter} data-testid="filter-collapse-customer">
              <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: 1,
                    }}
                  >
                    Type
                  </Typography>
                  <Autocomplete
                    data-testid="filter-type-customer"
                    id="type"
                    options={[]}
                    onChange={(e, value) => {
                      console.log('onchange');
                    }}
                    isOptionEqualToValue={(option) => {
                      return false;
                    }}
                    getOptionLabel={(option) => `${option}`}
                    value=""
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type"
                        placeholder="Select Type of KUR"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: 1,
                    }}
                  >
                    Pasar
                  </Typography>
                  <TextField
                    data-testid="filter-pasar-customer"
                    placeholder="Select Pasar"
                    size="small"
                    sx={{ bgcolor: '#fafafa' }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: 1,
                    }}
                  >
                    Credit Score
                  </Typography>
                  <TextField
                    data-testid="filter-credit-score-customer"
                    placeholder="Credit Score"
                    size="small"
                    sx={{ bgcolor: '#fafafa' }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                    }}
                  >
                    <Button variant="text">Reset</Button>
                    <Button>Apply</Button>
                  </Box>
                </Grid>
              </Grid>
            </Collapse>
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
              data={[]}
              selected={[]}
              headCells={headCell}
              page={1}
              totalData={10}
              onChangePage={(e) => console.log(e)}
              // loading
              enableCheckBox
              disableNumber
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={formModal.open}
        title="Add Customer"
        onClose={formModal.closeModal}
      >
        <FormCustomer onClose={formModal.closeModal} />
      </Modal>
    </Box>
  );
}
