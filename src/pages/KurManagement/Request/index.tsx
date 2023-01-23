/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import { values } from 'lodash';
import FormLabel from 'components/FormLabel';
import MenuList from 'components/MenuList';
import { useAppDispatch } from 'store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  CustomerStatus,
  FilterButton,
  FilterDataBox,
  InvoiceLabel,
  InvoiceStatus,
  RowBox,
} from './request.styled';

const data = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

const areas = [
  {
    id: 15,
    name: 'Pasar Paramount',
    address: '',
  },
  {
    id: 16,
    name: 'Pasar Modern Bintaro',
    address: '',
  },
  {
    id: 17,
    name: 'Pasar Segar Graha',
    address: '',
  },
  {
    id: 18,
    name: 'Pasar Modern Town Market',
    address: '',
  },
  {
    id: 19,
    name: 'Pasar Sinpasa GS',
    address: '',
  },
  {
    id: 20,
    name: 'Pasar Laris Kosambi',
    address: '',
  },
  {
    id: 21,
    name: 'Pasar Laris Palm Paradise',
    address: '',
  },
];

const kurType = [
  {
    id: 1,
    type: 'B2B',
  },
  {
    id: 2,
    type: 'B2BWC',
  },
];

export default function RequestKUR() {
  const formModal = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // table
  const headCell = [
    {
      id: 'no_request',
      label: 'No Request',
      align: 'left',
      format: (val: any) => (
        <Link to={`/kur/request/${val.id}`} style={{ textDecoration: 'none' }}>
          <InvoiceLabel>{val.no_request}</InvoiceLabel>
        </Link>
      ),
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
                  navigate(`/kur/request/${val.id}`);
                },
              },
              {
                label: 'Approve',
                onClick: () => {
                  console.log('approve request');
                },
              },
              {
                label: 'Reject',
                onClick: () => {
                  console.log('reject request');
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

  // filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<number>();
  const [selectedKurType, setSelectedKurType] = useState<number>();
  // const [date, setDate] = React.useState<DateRange<Dayjs>>([null, null]);

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="titlePage">Request KUR</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <FilterDataBox>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                justifyContent="space-between"
              >
                <TextField
                  placeholder="Search item"
                  size="small"
                  sx={{ bgcolor: '#fafafa', maxWidth: '560px' }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FilterButton
                  endIcon={<ArrowDown />}
                  onClick={() => setOpenFilter(!openFilter)}
                >
                  Filter
                </FilterButton>
              </Box>

              <Box
                display={openFilter ? 'flex' : 'none'}
                flexDirection="row"
                width="100%"
                justifyContent="space-between"
                gap="28px"
              >
                <FormLabel text="Pasar">
                  <Autocomplete
                    id="filterPasar"
                    options={areas}
                    onChange={(e, value) => {
                      setSelectedArea(value?.id);
                    }}
                    isOptionEqualToValue={(option: any) =>
                      option === values?.name
                    }
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params: any) => (
                      <TextField {...params} placeholder="Select Pasar" />
                    )}
                    sx={{
                      display: openFilter ? 'block' : 'none',
                    }}
                    fullWidth
                  />
                </FormLabel>
                <FormLabel text="Type">
                  <Autocomplete
                    id="filterKURType"
                    options={kurType}
                    onChange={(e, value) => {
                      setSelectedKurType(value?.id);
                    }}
                    isOptionEqualToValue={(option: any) =>
                      option === values?.name
                    }
                    getOptionLabel={(option: any) => option.type}
                    renderInput={(params: any) => (
                      <TextField {...params} placeholder="Select Type of KUR" />
                    )}
                    sx={{
                      display: openFilter ? 'block' : 'none',
                    }}
                    fullWidth
                  />
                </FormLabel>
                <FormLabel text="Submit Date">
                  <TextField
                    placeholder="Select Order Date Range"
                    size="small"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateRangePicker
                      displayStaticWrapperAs="desktop"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </>
                      )}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </LocalizationProvider> */}
                </FormLabel>
              </Box>
              <Box
                display={openFilter ? 'flex' : 'none'}
                flexDirection="row"
                justifyContent="flex-end"
                width="100%"
                gap="20px"
              >
                <Button variant="text">Reset</Button>
                <FilterButton>Apply</FilterButton>
              </Box>
            </FilterDataBox>
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
