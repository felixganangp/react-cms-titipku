/* eslint-disable no-nested-ternary */
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import FormLabel from 'components/FormLabel';
import MenuList from 'components/MenuList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import debounce from 'utils/debounce';
import { HeadCells } from 'components/Table/types';
import moment from 'moment';
import { areaAction } from 'store/slice/Area';
import { typeAction } from 'store/slice/kur/Type';
import { paymentKURAction } from 'store/slice/kur/Payment';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';
import { Bank } from 'models/kur/Bank';
import { PaymentKUR } from 'models/kur/Payment';
import digitFormatter from 'utils/digitFormatter';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Modal from 'components/Modal';
import RefusalReason from './components/InputMessage';
import {
  FilterButton,
  FilterDataBox,
  InvoiceLabel,
  InvoiceStatus,
  LabelText,
} from './payment.styled';
import PaymentForm from './components/Form';

export default function PaymentKURPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const payment = useAppSelector((state) => state.payment);

  // define filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const areas = useAppSelector((state) => state.area.data);
  const types = useAppSelector((state) => state.typeKur.data);
  const [inputValueArea, setInputValueArea] = useState('');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [paidToBank, setpaidToBank] = useState<Bank | null>(null);
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);

  useEffect(() => {
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
    if (payment.params.submit_date_start)
      setStartDate(new Date(payment.params.submit_date_start * 1000));
    if (payment.params.submit_date_end)
      setEndDate(new Date(payment.params.submit_date_end * 1000));
  }, []);

  // table
  useEffect(() => {
    dispatch(paymentKURAction.fetchData(payment.params));
  }, [
    payment.params.search,
    payment.params.order_by,
    payment.params.order_type,
    payment.params.page,
  ]);

  const handleSearch = (value: string) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        search: value,
      }),
    );
  };

  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleChangePage = (value: number) => {
    dispatch(
      paymentKURAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  const handleChangeType = (value: any) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        kur_user_type_id: value ? value?.id : null,
      }),
    );
    dispatch(
      paymentKURAction.setDisplayFilter({
        types: value,
      }),
    );
  };

  const handleChangeBank = (value: any) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        paid_to_bank: value ? value.code : null,
      }),
    );
    setpaidToBank(value);
  };

  const handleChangePasar = (value: any) => {
    const areasId: (number | undefined)[] = [];
    if (value.length > 0) value.map((item: Area) => areasId.push(item.id));
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        area_ids: areasId.length > 0 ? areasId.join(',') : undefined,
      }),
    );
    dispatch(
      paymentKURAction.setDisplayFilter({
        areas: value,
      }),
    );
  };

  const handleChangeStartDate = (value: any) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        submit_date_start: Math.floor(new Date(value).getTime() / 1000),
      }),
    );
  };

  const handleChangeEndDate = (value: any) => {
    dispatch(
      paymentKURAction.setParams({
        page: 1,
        submit_date_end: Math.floor(
          new Date(value).setHours(23, 59, 59, 59) / 1000,
        ),
      }),
    );
  };

  const handleApplyFilter = () => {
    dispatch(paymentKURAction.fetchData(payment.params));
  };

  const handleResetFilter = async () => {
    setStartDate(null);
    setEndDate(null);
    setpaidToBank(null);
    await dispatch(
      paymentKURAction.setParams({
        page: 1,
        area_ids: undefined,
        kur_user_type_id: undefined,
        submit_date_start: undefined,
        submit_date_end: undefined,
        paid_to_bank: undefined,
      }),
    );
    await dispatch(
      paymentKURAction.setDisplayFilter({
        areas: [],
        types: null,
      }),
    );
    await dispatch(
      paymentKURAction.fetchData({
        page: 1,
        search: payment.params.search,
        area_ids: undefined,
        kur_user_type_id: undefined,
        submit_date_start: undefined,
        submit_date_end: undefined,
        paid_to_bank: undefined,
      }),
    );
  };

  // action
  const rejectModal = useModal();
  const [selected, setSelected] = useState<PaymentKUR | null>(null);
  const handleApprovePayment = (id: number | string) => {
    dispatch(paymentKURAction.approvePayment({ id, detailsPage: false }));
  };
  const handleRejectPayment = (id: number | string, remarks: string) => {
    dispatch(
      paymentKURAction.rejectPayment({ id, detailsPage: false, remarks }),
    );
    rejectModal.closeModal();
  };

  const headCell: HeadCells<PaymentKUR>[] = [
    {
      id: 'kur_payment_number',
      label: 'No. Payment',
      align: 'left',
      enableSort: true,
      isSticky: true,
      format: (val) => (
        <Link to={`/kur/payment/${val.id}`} style={{ textDecoration: 'none' }}>
          <InvoiceLabel>{val.kur_payment_number}</InvoiceLabel>
        </Link>
      ),
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      enableSort: true,

      isSticky: true,
      format: (val) => <Typography>{val.kur_user.name}</Typography>,
    },
    {
      id: 'kur_type',
      label: 'KUR Type',
      align: 'left',
      isSticky: true,
      format: (val) => (
        <Typography>{val.kur_user.kur_user_type.name}</Typography>
      ),
    },
    {
      id: 'transfer_to',
      label: 'Transfer to',
      align: 'left',
      width: '200px',
      format: (val) => <Typography>{val.paid_to_bank}</Typography>,
    },
    {
      id: 'payment_amount',
      label: 'Payment Amount',
      align: 'left',
      format: (val) => (
        <Typography>Rp {digitFormatter.format(val.amount)}</Typography>
      ),
    },
    {
      id: 'outstanding_credit',
      label: 'Outstanding Credit',
      align: 'left',
      format: (val) => (
        <Typography>
          Rp {digitFormatter.format(val.kur_user.total_outstanding_amount)}
        </Typography>
      ),
    },
    {
      id: 'merchant_name',
      label: 'Merchant',
      align: 'left',
      enableSort: true,
      format: (val) => <Typography>{val.kur_user.user.name}</Typography>,
    },
    {
      id: 'area_name',
      label: 'Pasar',
      align: 'left',
      width: '300px !important',
      format: (val) => <Typography>{val.kur_user.user.area.name}</Typography>,
    },
    {
      id: 'created_at',
      label: 'Submit Date',
      align: 'left',
      format: (val) => (
        <Typography>
          {moment.unix(val.created_at).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <InvoiceStatus status={val.status}>{val.status}</InvoiceStatus>
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
            menu={
              val.status === 'pending'
                ? [
                    {
                      label: 'Details',
                      onClick: () => {
                        navigate(`/kur/payment/${val.id}`);
                      },
                    },
                    {
                      label: 'Approve',
                      onClick: () => {
                        handleApprovePayment(val.id);
                      },
                    },
                    {
                      label: 'Reject',
                      onClick: () => {
                        setSelected(val);
                        rejectModal.openModal();
                      },
                    },
                  ]
                : [
                    {
                      label: 'Details',
                      onClick: () => {
                        navigate(`/kur/payment/${val.id}`);
                      },
                    },
                  ]
            }
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
  const formModal = useModal();

  useEffect(() => {
    dispatch(paymentKURAction.setSelectedCustomer(null));
  }, [formModal.open]);

  useEffect(() => {
    dispatch(paymentKURAction.fetchBankAccount());
  }, []);

  return (
    <>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Typography variant="titlePage">KUR Payment</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <FilterDataBox>
                <Box
                  display="flex"
                  flexDirection="row"
                  width="100%"
                  justifyContent="flex-start"
                  gap="28px"
                >
                  <Button
                    sx={{ width: '12%' }}
                    startIcon={<AddIcon />}
                    onClick={() => {
                      formModal.openModal();
                    }}
                  >
                    Add Payment
                  </Button>
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
                      defaultValue={payment.params.search}
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
                    <FilterButton
                      endIcon={<ArrowDown />}
                      onClick={() => setOpenFilter(!openFilter)}
                    >
                      Filter
                    </FilterButton>
                  </Box>
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
                      multiple
                      id="filterPasar"
                      options={areas}
                      onChange={(e, value) => {
                        handleChangePasar(value);
                      }}
                      getOptionLabel={(option) => `${option.title}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Pasar"
                            variant="outlined"
                          />
                        );
                      }}
                      renderTags={(value: Area[], getTagProps) =>
                        value.map((item: Area, index: number) => (
                          <Chip
                            label={item.title}
                            {...getTagProps({ index })}
                            key={`area-${item.id}`}
                          />
                        ))
                      }
                      isOptionEqualToValue={(item: Area) => {
                        const filtered = payment?.displayFilter?.areas?.filter(
                          (el: any) => el.id === item.id,
                        );
                        if (filtered) return item.id === filtered[0]?.id;
                        return false;
                      }}
                      renderOption={(props, item) => (
                        <Box component="li" {...props} key={`area${item.id}`}>
                          {item.title}
                        </Box>
                      )}
                      value={payment?.displayFilter?.areas}
                      inputValue={inputValueArea}
                      onInputChange={(_, newInput) => {
                        setInputValueArea(newInput);
                      }}
                    />
                  </FormLabel>
                  <FormLabel text="Type">
                    <Autocomplete
                      id="filterType"
                      options={types}
                      onChange={(e, value) => {
                        handleChangeType(value);
                      }}
                      isOptionEqualToValue={(item: Type) => {
                        return item.id === payment.displayFilter?.types?.id;
                      }}
                      getOptionLabel={(item) => item.name}
                      value={payment?.displayFilter?.types}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="type"
                          placeholder="Select Type of KUR"
                        />
                      )}
                    />
                  </FormLabel>
                  <FormLabel text="Transfer To">
                    <Autocomplete
                      id="filterBank"
                      options={[
                        {
                          name: 'Bank Nobu',
                          code: 'nobu',
                        },
                        {
                          name: 'Bank BCA',
                          code: 'bca',
                        },
                      ]}
                      onChange={(e, value) => {
                        handleChangeBank(value);
                      }}
                      isOptionEqualToValue={(item: Bank) => {
                        return item.code === paidToBank?.code;
                      }}
                      getOptionLabel={(option) => `${option.name}`}
                      value={paidToBank}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="type"
                          placeholder="Select Bank"
                        />
                      )}
                    />
                  </FormLabel>
                </Box>
                <Box
                  display={openFilter ? 'flex' : 'none'}
                  flexDirection="column"
                  width="32%"
                  justifyContent="space-between"
                >
                  <LabelText>Range Date</LabelText>
                  <Box
                    display={openFilter ? 'flex' : 'none'}
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <FormLabel
                      text=""
                      error={startDate === null && endDate !== null}
                      helperText={
                        startDate === null &&
                        endDate !== null &&
                        'Start Date is required when End Date is filled'
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          open={openStartDate}
                          onClose={() => {
                            setOpenStartDate(false);
                          }}
                          onOpen={() => {
                            setOpenStartDate(true);
                          }}
                          value={startDate}
                          inputFormat="DD/MM/YYYY"
                          onChange={(value) => {
                            setStartDate(value);
                            handleChangeStartDate(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '100%' }}
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: 'Start Date',
                              }}
                              onClick={() => setOpenStartDate(true)}
                            />
                          )}
                          toolbarPlaceholder="End Date"
                          maxDate={endDate}
                        />
                      </LocalizationProvider>
                    </FormLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                      }}
                    >
                      -
                    </Box>
                    <FormLabel
                      text=""
                      error={startDate !== null && endDate === null}
                      helperText={
                        startDate !== null &&
                        endDate === null &&
                        'End Date is required when Start Date is filled'
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          open={openEndDate}
                          onClose={() => {
                            setOpenEndDate(false);
                          }}
                          onOpen={() => {
                            setOpenEndDate(true);
                          }}
                          value={endDate}
                          inputFormat="DD/MM/YYYY"
                          onChange={(value) => {
                            setEndDate(value);
                            handleChangeEndDate(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ width: '100%' }}
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: 'End Date',
                              }}
                              onClick={() => setOpenEndDate(true)}
                            />
                          )}
                          minDate={startDate}
                        />
                      </LocalizationProvider>
                    </FormLabel>
                  </Box>
                </Box>
                <Box
                  display={openFilter ? 'flex' : 'none'}
                  flexDirection="row"
                  justifyContent="flex-end"
                  width="100%"
                  gap="20px"
                >
                  <Button variant="text" onClick={() => handleResetFilter()}>
                    Reset
                  </Button>
                  <FilterButton
                    onClick={() => handleApplyFilter()}
                    disabled={
                      (startDate === null && endDate !== null) ||
                      (startDate !== null && endDate === null)
                    }
                  >
                    Apply
                  </FilterButton>
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
                data={payment.data || []}
                headCells={headCell}
                totalData={payment.total}
                loading={payment.loading}
                count={payment.params.count}
                page={payment.params.page}
                orderBy={payment.params.order_by}
                orderType={payment.params.order_type}
                onChangePage={(page) => handleChangePage(page)}
                onChangeSort={(value) => handleChangeSort(value)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={rejectModal.open}
        title="Refusal Reason"
        onClose={rejectModal.closeModal}
      >
        <RefusalReason
          onSubmitRefusal={handleRejectPayment}
          id={selected?.id || 0}
        />
      </Modal>
      <Modal
        open={formModal.open}
        title="Create Payment"
        onClose={formModal.closeModal}
      >
        <PaymentForm onClose={formModal.closeModal} />
      </Modal>
    </>
  );
}
