/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import MenuList from 'components/MenuList';
import FormLabel from 'components/FormLabel';
import Status from 'components/Status';
import digitFormatter from 'utils/digitFormatter';
import moment from 'moment';
import debounce from 'utils/debounce';
import { getColorCreditScore } from 'utils/creditScoreColor';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import { InvoiceKur } from 'models/kur/Invoice';
import { areaAction } from 'store/slice/Area';
import { typeAction } from 'store/slice/kur/Type';
import { Area } from 'models/Area';
import { Type } from 'models/kur/Type';

export default function Ivoice() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice);

  // define filter
  const [collapseFilter, setCollapseFilter] = useState(false);
  const areasData = useAppSelector((state) => state.area.data);
  const typesData = useAppSelector((state) => state.typeKur.data);
  const [inputValueArea, setInputValueArea] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState({
    deliveryStart: false,
    deliveryEnd: false,
    invoiceStart: false,
    invoiceEnd: false,
    dueStart: false,
    dueEnd: false,
  });

  useEffect(() => {
    dispatch(invoiceKurAction.fetchData(invoice.params));
  }, [invoice.params]);

  useEffect(() => {
    dispatch(typeAction.fetchData());
    dispatch(areaAction.fetchData());
    dispatch(invoiceKurAction.fetchDataConditionInvoice());
    dispatch(invoiceKurAction.fetchDataStatusInvoice());
  }, []);

  const handleChangePage = (value: number) => {
    dispatch(
      invoiceKurAction.setParams({
        page: value,
      }),
    );
  };

  const handleSearch = (value: string) => {
    dispatch(
      invoiceKurAction.setParams({
        page: 1,
        search: value,
      }),
    );
  };

  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      invoiceKurAction.setParams({
        order_by: value.orderBy,
        page: 1,
        order_type: value.orderType,
      }),
    );
  };

  const handleChangeType = (value: Type) => {
    dispatch(
      invoiceKurAction.setDisplayFilter({
        type: value,
      }),
    );
  };

  const handleChangePasar = (value: Area[]) => {
    dispatch(
      invoiceKurAction.setDisplayFilter({
        areas: value,
      }),
    );
  };

  const handleChangeStatus = (value: string | null) => {
    dispatch(
      invoiceKurAction.setDisplayFilter({
        status: value,
      }),
    );
  };

  const handleChangeCondition = (value: string | null) => {
    dispatch(
      invoiceKurAction.setDisplayFilter({
        condition: value,
      }),
    );
  };

  const handleChangeDate = (type: string, value: Date | null) => {
    dispatch(
      invoiceKurAction.setDisplayFilter({
        [type]: value,
      }),
    );
  };

  const handleOpenDatePicker = (type: string, value: boolean) => {
    setOpenDatePicker({
      ...openDatePicker,
      [type]: value,
    });
  };

  const handleApplyFilter = () => {
    const { areas, type, condition, status, ...date } = invoice.displayFilter;
    const newParams = { ...invoice.params, page: 1 };

    if (type !== null) {
      newParams.kur_user_type_id = type?.id;
    }

    if (areas && areas?.length > 0) {
      newParams.area_ids = areas.map((val) => val.id).join(',');
    }

    if (condition !== null) {
      newParams.condition = condition;
    }

    if (status !== null) {
      newParams.paid_status = status;
    }

    if (date.delivery_date_start) {
      newParams.delivery_date_start = Math.floor(
        new Date(date.delivery_date_start).getTime() / 1000,
      );
    }

    if (date.delivery_date_end) {
      newParams.delivery_date_end = Math.floor(
        new Date(date.delivery_date_end).setHours(23, 59, 59, 59) / 1000,
      );
    }

    if (date.invoice_date_start) {
      newParams.invoice_date_start = Math.floor(
        new Date(date.invoice_date_start).getTime() / 1000,
      );
    }

    if (date.invoice_date_end) {
      newParams.invoice_date_end = Math.floor(
        new Date(date.invoice_date_end).setHours(23, 59, 59, 59) / 1000,
      );
    }

    if (date.due_date_start) {
      newParams.due_date_start = Math.floor(
        new Date(date.due_date_start).getTime() / 1000,
      );
    }

    if (date.due_date_end) {
      newParams.due_date_end = Math.floor(
        new Date(date.due_date_end).setHours(23, 59, 59, 59) / 1000,
      );
    }
    dispatch(invoiceKurAction.setParams(newParams));
  };

  const handleResetFilter = () => {
    dispatch(invoiceKurAction.setResetParams());
    dispatch(invoiceKurAction.setResetDisplayFilter());
  };

  const headCell: HeadCells<InvoiceKur>[] = [
    {
      id: 'kur_invoice_number',
      label: 'No. Invoice',
      align: 'left',
      minWidth: '160px',
      enableSort: true,
      format: (val) => (
        <Typography
          sx={{ color: '#0774d1', cursor: 'pointer' }}
          onClick={() => navigate(`/kur/invoice/${val.id}`)}
        >
          {val.kur_invoice_number}
        </Typography>
      ),
    },
    {
      id: 'condition',
      label: 'Condition',
      align: 'left',
      width: '160px',
      format: (val) => {
        const color = () => {
          let result = '#cecece';
          if (val.condition === 'on_schedule') {
            result = '#008e58';
          }

          if (val.condition === 'late') {
            result = '#c10000';
          }

          return result;
        };
        return (
          <Status color={color()}>{val.condition.replaceAll('_', ' ')}</Status>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      width: '160px',
      format: (val) => {
        const color = () => {
          let result = '#cecece';
          if (val.paid_status === 'paid_off') {
            result = '#008e58';
          }

          if (val.paid_status === 'debt') {
            result = '#c10000';
          }
          return result;
        };
        return (
          <Status color={color()}>
            {val.paid_status.replaceAll('_', ' ')}
          </Status>
        );
      },
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      minWidth: '190px',
      enableSort: true,
      format: (val) => {
        return (
          <Box display="flex" alignItems="center" gap="10px">
            <Box
              width="10px"
              height="10px"
              borderRadius="100%"
              bgcolor={getColorCreditScore(
                val.kur_request.kur_user.kur_user_credit_score.id,
              )}
            />
            <Typography>{val.kur_request.kur_user.name}</Typography>
          </Box>
        );
      },
    },
    {
      id: 'kur_user_type',
      label: 'KUR Type',
      align: 'left',
      format: (val) => <Typography>{val.kur_user_type.name}</Typography>,
    },
    {
      id: 'request_amount',
      label: 'Request Amount',
      align: 'left',
      minWidth: '160px',
      format: (val) => (
        <Typography>Rp {digitFormatter.format(val.request_amount)}</Typography>
      ),
    },
    {
      id: 'delivery_date',
      label: 'Delivery Date',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <Typography>
          {moment.unix(val.created_at).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      id: 'invoice_date',
      label: 'Invoice Date',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <Typography>
          {moment.unix(val.release_date).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      id: 'invoice_amount',
      label: 'Invoice Amount',
      align: 'left',
      minWidth: '160px',
      format: (val) => (
        <Typography>
          Rp{' '}
          {digitFormatter.format(
            val.request_amount +
              val.total_admin_fee +
              val.total_dpd +
              val.total_adjustment,
          )}
        </Typography>
      ),
    },
    {
      id: 'due_date',
      label: 'Due date',
      align: 'left',
      format: (val) => (
        <Typography>
          {moment.unix(val.due_date).format('DD/MM/YYYY')}
        </Typography>
      ),
    },
    {
      id: 'last_paid',
      label: 'Last Paid',
      align: 'left',
      format: (val) => (
        <Typography>
          {val.kur_invoice_detail !== null
            ? moment
                .unix(
                  val.kur_invoice_detail[val.kur_invoice_detail.length - 1]
                    .created_at,
                )
                .format('DD/MM/YYYY')
            : '-'}
        </Typography>
      ),
    },
    {
      id: 'paid_amount',
      label: 'Paid Amount',
      align: 'left',
      minWidth: '160px',
      format: (val) => (
        <Typography>Rp {digitFormatter.format(val.total_payment)}</Typography>
      ),
    },
    {
      id: 'menu',
      label: 'Action',
      align: 'left',
      format: (val) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Detail',
                onClick: () => {
                  navigate(`/kur/invoice/${val.id}`);
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
                  <Box flex="1">
                    <TextField
                      placeholder="Search for name or email"
                      size="small"
                      sx={{ bgcolor: '#ebeff3', maxWidth: '560px' }}
                      fullWidth
                      defaultValue={invoice.params.search}
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
                  </Box>
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={() => setCollapseFilter(!collapseFilter)}
                  >
                    Filter
                  </Button>
                </Box>
                <Collapse in={collapseFilter}>
                  <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
                    <Grid item xs={3}>
                      <FormLabel text="Type">
                        <Autocomplete
                          id="filterType"
                          options={typesData}
                          onChange={(e, value) => {
                            const selected = value as Type;
                            handleChangeType(selected);
                          }}
                          isOptionEqualToValue={(item: Type) => {
                            return item.id === invoice.displayFilter?.type?.id;
                          }}
                          getOptionLabel={(item) => item.name}
                          value={invoice?.displayFilter?.type}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="type"
                              placeholder="Select Type of KUR"
                            />
                          )}
                        />
                      </FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <FormLabel text="Pasar">
                        <Autocomplete
                          multiple
                          id="filterPasar"
                          options={areasData}
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
                          isOptionEqualToValue={(item: Area) => {
                            const filtered =
                              invoice?.displayFilter?.areas?.filter(
                                (el: any) => el.id === item.id,
                              );
                            if (filtered) return item.id === filtered[0]?.id;
                            return false;
                          }}
                          renderOption={(props, item) => (
                            <Box
                              component="li"
                              {...props}
                              key={`area${item.id}`}
                            >
                              {item.title}
                            </Box>
                          )}
                          value={invoice?.displayFilter?.areas}
                          inputValue={inputValueArea}
                          onInputChange={(_, newInput) => {
                            setInputValueArea(newInput);
                          }}
                        />
                      </FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <FormLabel text="Status">
                        <Autocomplete
                          data-testid="filter-type-customer"
                          id="type"
                          options={invoice.stateFilter.status}
                          onChange={(e, value) => {
                            handleChangeStatus(value);
                          }}
                          getOptionLabel={(item) => item.replaceAll('_', ' ')}
                          value={invoice?.displayFilter?.status}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="type"
                              placeholder="Select Type of KUR"
                            />
                          )}
                        />
                      </FormLabel>
                    </Grid>
                    <Grid item xs={3}>
                      <FormLabel text="Condition">
                        <Autocomplete
                          data-testid="filter-type-customer"
                          id="type"
                          options={invoice.stateFilter.condition}
                          onChange={(e, value) => {
                            handleChangeCondition(value);
                          }}
                          getOptionLabel={(item) => item.replaceAll('_', ' ')}
                          value={invoice?.displayFilter?.condition}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="type"
                              placeholder="Select Type of KUR"
                            />
                          )}
                        />
                      </FormLabel>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Delivery Date Range
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        width="100%"
                        justifyContent="space-between"
                      >
                        <FormLabel
                          text=""
                          error={
                            invoice.displayFilter.delivery_date_start ===
                              null &&
                            invoice.displayFilter.delivery_date_end !== null
                          }
                          helperText={
                            invoice.displayFilter.delivery_date_start ===
                              null &&
                            invoice.displayFilter.delivery_date_end !== null &&
                            'Start Date is required when End Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.deliveryStart}
                              onClose={() => {
                                handleOpenDatePicker('deliveryStart', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('deliveryStart', true);
                              }}
                              value={invoice.displayFilter.delivery_date_start}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('delivery_date_start', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'Start Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('deliveryStart', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="Start Date"
                              maxDate={invoice.displayFilter.delivery_date_end}
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
                          error={
                            invoice.displayFilter.delivery_date_start !==
                              null &&
                            invoice.displayFilter.delivery_date_end === null
                          }
                          helperText={
                            invoice.displayFilter.delivery_date_start !==
                              null &&
                            invoice.displayFilter.delivery_date_end === null &&
                            'End Date is required when Start Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.deliveryEnd}
                              onClose={() => {
                                handleOpenDatePicker('deliveryEnd', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('deliveryEnd', true);
                              }}
                              value={invoice.displayFilter.delivery_date_end}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('delivery_date_end', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'End Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('deliveryEnd', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="End Date"
                              minDate={
                                invoice.displayFilter.delivery_date_start
                              }
                            />
                          </LocalizationProvider>
                        </FormLabel>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Invoice Date Range
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        width="100%"
                        justifyContent="space-between"
                      >
                        <FormLabel
                          text=""
                          error={
                            invoice.displayFilter.invoice_date_start === null &&
                            invoice.displayFilter.invoice_date_end !== null
                          }
                          helperText={
                            invoice.displayFilter.invoice_date_start === null &&
                            invoice.displayFilter.invoice_date_end !== null &&
                            'Start Date is required when End Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.invoiceStart}
                              onClose={() => {
                                handleOpenDatePicker('invoiceStart', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('invoiceStart', true);
                              }}
                              value={invoice.displayFilter.invoice_date_start}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('invoice_date_start', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'Start Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('invoiceStart', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="Start Date"
                              maxDate={invoice.displayFilter.invoice_date_end}
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
                          error={
                            invoice.displayFilter.invoice_date_start !== null &&
                            invoice.displayFilter.invoice_date_end === null
                          }
                          helperText={
                            invoice.displayFilter.invoice_date_start !== null &&
                            invoice.displayFilter.invoice_date_end === null &&
                            'End Date is required when Start Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.invoiceEnd}
                              onClose={() => {
                                handleOpenDatePicker('invoiceEnd', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('invoiceEnd', true);
                              }}
                              value={invoice.displayFilter.invoice_date_end}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('invoice_date_end', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'End Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('invoiceEnd', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="End Date"
                              minDate={invoice.displayFilter.invoice_date_start}
                            />
                          </LocalizationProvider>
                        </FormLabel>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Due Date Range
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        width="100%"
                        justifyContent="space-between"
                      >
                        <FormLabel
                          text=""
                          error={
                            invoice.displayFilter.due_date_start === null &&
                            invoice.displayFilter.due_date_end !== null
                          }
                          helperText={
                            invoice.displayFilter.due_date_start === null &&
                            invoice.displayFilter.due_date_end !== null &&
                            'Start Date is required when End Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.dueStart}
                              onClose={() => {
                                handleOpenDatePicker('dueStart', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('dueStart', true);
                              }}
                              value={invoice.displayFilter.due_date_start}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('due_date_start', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'Start Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('dueStart', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="Start Date"
                              maxDate={invoice.displayFilter.due_date_end}
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
                          error={
                            invoice.displayFilter.due_date_start !== null &&
                            invoice.displayFilter.due_date_end === null
                          }
                          helperText={
                            invoice.displayFilter.due_date_start !== null &&
                            invoice.displayFilter.due_date_end === null &&
                            'End Date is required when Start Date is filled'
                          }
                        >
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                              open={openDatePicker.dueEnd}
                              onClose={() => {
                                handleOpenDatePicker('dueEnd', false);
                              }}
                              onOpen={() => {
                                handleOpenDatePicker('dueEnd', true);
                              }}
                              value={invoice.displayFilter.due_date_end}
                              inputFormat="DD/MM/YYYY"
                              onChange={(value) => {
                                handleChangeDate('due_date_end', value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  sx={{ width: '100%' }}
                                  {...params}
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: 'End Date',
                                  }}
                                  onClick={() =>
                                    handleOpenDatePicker('dueEnd', true)
                                  }
                                />
                              )}
                              toolbarPlaceholder="End Date"
                              minDate={invoice.displayFilter.due_date_start}
                            />
                          </LocalizationProvider>
                        </FormLabel>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-end" gap="20px">
                        <Button
                          variant="text"
                          onClick={() => handleResetFilter()}
                        >
                          Reset
                        </Button>
                        <Button onClick={() => handleApplyFilter()}>
                          Apply
                        </Button>
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
                  loading={invoice.loading}
                  data={invoice.data}
                  headCells={headCell}
                  page={invoice.params.page}
                  totalData={invoice.total}
                  count={invoice.params.count}
                  orderBy={invoice.params.order_by}
                  orderType={invoice.params.order_type}
                  onChangePage={(val) => handleChangePage(val)}
                  onChangeSort={(val) => handleChangeSort(val)}
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

const data = [
  {
    kurType: 'B2B',
    amount: 'Rp.100',
  },
];
