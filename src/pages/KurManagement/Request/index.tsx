/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  DialogContent,
  Dialog,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import FormLabel from 'components/FormLabel';
import MenuList from 'components/MenuList';
import { useAppDispatch } from 'store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  CustomerStatus,
  DateButton,
  FilterButton,
  FilterDataBox,
  FooterDatePicker,
  InvoiceLabel,
  InvoiceStatus,
  RangeDatePicker,
  RowBox,
  SelectedDate,
} from './request.styled';
import 'react-day-picker/dist/style.css';

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

const today = new Date();

export default function RequestKUR() {
  const formModal = useModal();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
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
      format: (val: any) => (
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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [selectedKurType, setSelectedKurType] = useState<string[]>([]);

  const handleChangeFilterPasar = (
    event: SelectChangeEvent<typeof selectedArea>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedArea(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeFilterKurType = (
    event: SelectChangeEvent<typeof selectedKurType>,
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedKurType(typeof value === 'string' ? value.split(',') : value);
  };

  const defaultSelected: DateRange = {
    from: today,
    to: today,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const closeDatePicker = () => {
    if (!range?.to) {
      setRange((prevState: DateRange | undefined) => {
        const next = {
          from: prevState?.from,
          to: prevState?.from,
        };
        return next;
      });
    }
    setOpenDatePicker(!openDatePicker);
  };

  let footer = <p>Please pick start date</p>;
  if (range?.from) {
    if (!range.to) {
      footer = (
        <FooterDatePicker>
          <SelectedDate>
            {format(range.from, 'PPP')} - pick end date
          </SelectedDate>
          <DateButton onClick={() => closeDatePicker()}>OK</DateButton>
        </FooterDatePicker>
      );
    } else if (range.to) {
      footer = (
        <FooterDatePicker>
          <SelectedDate>
            {format(range.from, 'PPP')} - {format(range.to, 'PPP')}
          </SelectedDate>
          <DateButton onClick={() => closeDatePicker()}>OK</DateButton>
        </FooterDatePicker>
      );
    }
  }

  return (
    <>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="titlePage" data-testid="request-kur-title">
                Request KUR
              </Typography>
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
                    data-testid="search-request-kur"
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
                    data-testid="request-kur-show-filter"
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
                  data-testid="request-kur-filter-box"
                >
                  <FormLabel text="Pasar">
                    <FormControl
                      sx={{ width: 'inherit', maxWidth: 'inherit', height: 20 }}
                    >
                      <Select
                        multiple
                        displayEmpty
                        value={selectedArea}
                        onChange={handleChangeFilterPasar}
                        input={
                          <OutlinedInput
                            placeholder="Select Pasar"
                            size="small"
                            fullWidth
                          />
                        }
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                        fullWidth
                      >
                        <MenuItem disabled value="">
                          <em>Select Pasar</em>
                        </MenuItem>
                        {areas.map((pasar) => (
                          <MenuItem key={pasar.name} value={pasar.name}>
                            <Checkbox
                              checked={selectedArea.indexOf(pasar.name) > -1}
                            />
                            <ListItemText primary={pasar.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormLabel>
                  <FormLabel text="Type">
                    <FormControl
                      sx={{ width: 'inherit', maxWidth: 'inherit', height: 20 }}
                    >
                      <Select
                        multiple
                        displayEmpty
                        value={selectedKurType}
                        onChange={handleChangeFilterKurType}
                        input={
                          <OutlinedInput
                            placeholder="Select Type of KUR"
                            size="small"
                            fullWidth
                          />
                        }
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                        fullWidth
                      >
                        <MenuItem disabled value="">
                          <em>Select Type of KUR</em>
                        </MenuItem>
                        {kurType.map((type) => (
                          <MenuItem key={type.type} value={type.type}>
                            <Checkbox
                              checked={selectedKurType.indexOf(type.type) > -1}
                            />
                            <ListItemText primary={type.type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormLabel>
                  <FormLabel text="Submit Date">
                    <div>
                      <TextField
                        data-testid="request-kur-filter-date"
                        value={
                          range?.from && range?.to && range?.from !== range?.to
                            ? `${format(range.from, 'dd MMM yyyy')} - ${format(
                                range.to,
                                'dd MMM yyyy',
                              )}`
                            : range?.from &&
                              `${format(range?.from, 'dd MMM yyyy')}`
                        }
                        placeholder={
                          range?.from && range?.to
                            ? `${format(range.from, 'dd/mm/yyyy')} - ${format(
                                range.to,
                                'dd/mm/yyyy',
                              )}`
                            : 'Select Date'
                        }
                        size="small"
                        fullWidth
                        onClick={() => setOpenDatePicker(!openDatePicker)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
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
              data-testid="request-kur-table"
            >
              <Table
                data={data}
                headCells={headCell}
                page={1}
                totalData={10}
                onChangePage={(e) => console.log(e)}
                count={data.length}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDatePicker} onClose={() => closeDatePicker()}>
        <DialogContent>
          <RangeDatePicker
            data-testid="datepicker-range"
            mode="range"
            defaultMonth={today}
            selected={range}
            footer={footer}
            onSelect={setRange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
