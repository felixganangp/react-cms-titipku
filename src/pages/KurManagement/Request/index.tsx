/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import {
  CustomerStatus,
  InvoiceLabel,
  InvoiceStatus,
  RowBox,
} from './request.styled';

const data = [
  {
    customer_id: 1,
    no_request: 'REQ/019221121',
    name: 'Lastri',
    kur_status: 1,
    kur: {
      id: 1,
      kur_type: 'B2B',
    },
    request_amount: 20000000,
    merchant: 'Lapak L12',
    pasar: 'Pasar Serpong',
    submit_date: 1674198628,
    status: 1,
  },
  {
    customer_id: 2,
    no_request: 'REQ/019221122',
    name: 'Har',
    kur_status: 4,
    kur: {
      id: 2,
      kur_type: 'B2BWC',
    },
    request_amount: 50000000,
    merchant: 'Lapak Sayur Har',
    pasar: 'Pasar Cinere',
    submit_date: 1674198628,
    status: 2,
  },
  {
    customer_id: 3,
    no_request: 'REQ/019221123',
    name: 'Yayok',
    kur_status: 2,
    kur: {
      id: 2,
      kur_type: 'B2BWC',
    },
    request_amount: 50000000,
    merchant: 'Lapak Soto Yayok',
    pasar: 'Pasar Modern Karawaci',
    submit_date: 1674198628,
    status: 3,
  },
  {
    customer_id: 4,
    no_request: 'REQ/019221124',
    name: 'Bowo',
    kur_status: 3,
    kur: {
      id: 2,
      kur_type: 'B2BWC',
    },
    request_amount: 50000000,
    merchant: 'Lapak Sayur Bowo',
    pasar: 'Pasar Cinere',
    submit_date: 1674198628,
    status: 2,
  },
  {
    customer_id: 5,
    no_request: 'REQ/019221125',
    name: 'Tejo',
    kur_status: 2,
    kur: {
      id: 1,
      kur_type: 'B2B',
    },
    request_amount: 100000000,
    merchant: 'Lapak Daging Beku',
    pasar: 'Pasar Bintaro',
    submit_date: 1674198628,
    status: 1,
  },
];

export default function RequestKUR() {
  const formModal = useModal();

  const headCell = [
    {
      id: 'no_request',
      label: 'No Request',
      align: 'left',
      format: (val: any) => <InvoiceLabel>{val.no_request}</InvoiceLabel>,
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      format: (val: any) => (
        <RowBox>
          <CustomerStatus status={val.kur_status}>&nbsp;</CustomerStatus>
          <Typography>{val.name}</Typography>
        </RowBox>
      ),
    },
    {
      id: 'kur_type',
      label: 'KUR Type',
      align: 'left',
      format: (val: any) => <Typography>{val.kur.kur_type}</Typography>,
    },
    {
      id: 'request_amount',
      label: 'Request Amount',
      align: 'left',
      format: (val: any) => (
        <Typography>
          Rp {new Intl.NumberFormat().format(val.request_amount)}
        </Typography>
      ),
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
      id: 'submit_date',
      label: 'Submit Date',
      align: 'left',
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      format: (val: any) => (
        <InvoiceStatus status={val.status}>
          {val.status === 1
            ? 'Pending'
            : val.status === 2
            ? 'Approved'
            : 'Rejected'}
        </InvoiceStatus>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      align: 'center',
    },
  ];

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <Card>
            <Typography variant="titlePage">KUR Customer</Typography>
          </Card>
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <Box display="flex" gap="20px" flexWrap="wrap">
              <TextField
                placeholder="Search item"
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
              totalData={10}
              onChangePage={(e) => console.log(e)}
              // loading
              enableCheckBox
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
