import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import MenuList from 'components/MenuList';
import Status from 'components/Status';
import useModal from 'hooks/useModal';
import digitFormatter from 'utils/digitFormatter';
import moment from 'moment';
import debounce from 'utils/debounce';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import { InvoiceKur } from 'models/kur/Invoice';

export default function Ivoice() {
  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice);
  const [collapseFilter, setCollapseFilter] = useState(false);

  useEffect(() => {
    dispatch(invoiceKurAction.fetchData(invoice.params));
  }, [invoice.params]);

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

  const headCell: HeadCells<InvoiceKur>[] = [
    {
      id: 'kur_invoice_number',
      label: 'No. Payment',
      align: 'left',
      minWidth: '160px',
      enableSort: true,
      format: (val) => (
        <Typography sx={{ color: '#0774d1' }}>
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
      minWidth: '160px',
      enableSort: true,
      format: (val) => <Typography>{val.kur_request.kur_user.name}</Typography>,
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
          {val.kur_invoice_Detail !== null
            ? moment
                .unix(
                  val.kur_invoice_Detail[val.kur_invoice_Detail.length - 1]
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
                      // defaultValue={roleUser.params.search}
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
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Pasar
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Status
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: 1,
                        }}
                      >
                        Condition
                      </Typography>
                      <Autocomplete
                        data-testid="filter-type-customer"
                        id="type"
                        options={[]}
                        onChange={(e, value) => {
                          // setTypeKurFilter(value);
                        }}
                        // isOptionEqualToValue={(option: Type) => {
                        //   return (
                        //     option.id === customerKur.stateFilter?.typeKur?.id
                        //   );
                        // }}
                        getOptionLabel={(option) => `${option.name}`}
                        // value={customerKur?.stateFilter?.typeKur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type of KUR"
                          />
                        )}
                      />
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
