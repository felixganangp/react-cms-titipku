/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';

import Label from 'components/Label';
import { InvoiceListType } from 'models/finance/invoice';
import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import MenuList from 'components/MenuList';
import { MoreVert } from '@mui/icons-material';
import { base64toOpen } from 'utils/base64toDownload';
import {
  InvoiceType,
  KurType,
  UseAreaListService,
  UseCategoryListService,
} from '../hooks/useConfigFinance';
import FormInvoice from './Components/FormInvoice';
import {
  UseGetInvoicePDF,
  UseInvoiceService,
} from '../hooks/useInvoiceService';
import FormSetManualSettled from './Components/FormSetManualSettled';

export default function InvoicePage() {
  const navigate = useNavigate();
  // modal
  const [invoiceDetail, setinvoiceDetail] = useState<InvoiceListType | null>(
    null,
  );
  const showFilter = useModal();
  const invoiceForm = useModal();
  const [modalTypeSetManualSettled, setModalTypeSetManualSettled] = useState<
    number | null
  >(null);

  const queryInnvoice = UseInvoiceService();
  const queryArea = UseAreaListService();
  const getInoivcePDF = UseGetInvoicePDF();
  // const queryCategory = UseCategoryListService();

  const headCells: HeadCells<InvoiceListType>[] = [
    {
      id: 'invoice_number',
      label: 'Invoice Number',
      format: ({ invoice_number, user, id, created_at }) => {
        return (
          <Typography
            variant="body1"
            color="info.main"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/finance/invoice/${id}`);
            }}
          >
            {invoice_number ||
              `INV/${moment(created_at * 1000).format('YYYY')}/${
                user?.user_number
              }/${id}`}
          </Typography>
        );
      },
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      format: ({ status }) => {
        const color =
          // eslint-disable-next-line no-nested-ternary
          status === 'Late'
            ? 'error'
            : status === 'On Schedule'
            ? 'success'
            : 'info';
        return (
          <Label variant="filled" color={color}>
            {status}
          </Label>
        );
      },
    },
    {
      id: 'invoice_restructure_type',
      label: 'Restructure Type',
      align: 'center',
      format: ({ invoice_restructure_type }) => {
        return invoice_restructure_type.name;
        // </Label>
      },
    },
    {
      id: 'invoice_type',
      label: 'Invoice Type',
      format: ({ invoice_type }) => {
        return (
          <Typography variant="body1">{invoice_type?.name || '-'}</Typography>
        );
      },
    },
    {
      id: 'Name',
      label: 'Name',
      format: ({ user }) => {
        return <Typography variant="body1">{user?.merchant_name}</Typography>;
      },
    },
    {
      id: 'kur_Type',
      label: 'Kur Type',
      format: ({ user }) => {
        // @ts-ignore
        return KurType?.[user.user_type_id] || '-';
      },
    },
    {
      id: 'invoice_date',
      label: 'Invoice Date',
      format: ({ transfer_date }) => {
        return (
          <Typography variant="body1">
            {moment(transfer_date * 1000).format('DD/MM/YYYY')}
          </Typography>
        );
      },
    },
    {
      id: 'amount',
      label: 'Invoice Amount',
      format: ({ amount }) => {
        return (
          <Typography variant="body1">
            Rp. {numberSeperator(amount || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'paid_amount',
      label: 'Paid Off Amount',
      format: ({ paid_amount }) => {
        return (
          <Typography variant="body1">
            Rp. {numberSeperator(paid_amount || 0)}
          </Typography>
        );
      },
    },
    {
      id: 'due_date',
      label: 'Due Date',
      format: ({ due_date }) => {
        return (
          <Typography variant="body1">
            {moment(due_date * 1000).format('DD/MM/YYYY')}
          </Typography>
        );
      },
    },
    {
      id: 'last_paid',
      label: 'Last Paid',
      format: ({ last_paid }) => {
        return (
          <Typography variant="body1">
            {last_paid !== 0
              ? moment(last_paid * 1000).format('DD/MM/YYYY')
              : '-'}
          </Typography>
        );
      },
    },
    {
      id: 'action',
      label: 'Action',
      format: (value) => {
        return (
          <MenuList
            menu={[
              {
                label: 'Detail',
                onClick: () => {
                  navigate(`/finance/invoice/${value.id}`);
                },
              },
              {
                label: 'Cut Loss',
                hide: value.status === 'Paid Off',
                onClick: () => {
                  setModalTypeSetManualSettled(1);
                  setinvoiceDetail(value);
                },
              },
              {
                label: 'Memo Internal',
                hide: value.status === 'Paid Off',
                onClick: () => {
                  setModalTypeSetManualSettled(2);
                  setinvoiceDetail(value);
                },
              },
              {
                label: 'Restructure',
                hide: value.status === 'Paid Off',
                onClick: () => {
                  setModalTypeSetManualSettled(3);
                  setinvoiceDetail(value);
                },
              },
              {
                label: 'Generate PDF',
                onClick: () => {
                  getInoivcePDF.mutate(value.id.toString(), {
                    onSuccess: (data) => {
                      base64toOpen(data.data, `${value.invoice_number}.pdf`);
                    },
                    onError: (error) => {},
                  });
                },
              },
            ]}
          >
            <IconButton>
              <MoreVert />
            </IconButton>
          </MenuList>
        );
      },
    },
  ];
  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Typography variant="titlePage">Invoice</Typography>
        </Card>
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" alignItems="center" gap={2} flex={1}>
              <Button startIcon={<AddIcon />} onClick={invoiceForm.openModal}>
                Create Invoice
              </Button>
              <TextField
                placeholder="Search for name or email"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                defaultValue={queryInnvoice.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  queryInnvoice.handleSearch(event.target.value);
                  // debounceSearch(event.target.value);
                }}
              />
            </Stack>
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              variant="outlined"
              onClick={showFilter.toggleModal}
            >
              Filter
            </Button>
          </Stack>
          <Collapse in={showFilter.open}>
            <Grid
              container
              spacing={2}
              component="form"
              onSubmit={queryInnvoice.formikParams.handleSubmit}
            >
              <Grid item xs={12} md={4}>
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={
                      queryArea.listData.map((val) => ({
                        id: val.id,
                        name: val.title,
                      })) || []
                    }
                    noOptionsText={
                      !queryArea.searchValue
                        ? 'Type to search area'
                        : 'No option'
                    }
                    inputValue={queryArea.searchValue}
                    onInputChange={(_, newInputValue) => {
                      queryArea.handleSearch(newInputValue);
                    }}
                    loading={queryArea.isFetching}
                    getOptionLabel={(item) => item.name}
                    value={
                      queryArea.listData
                        .map((val) => ({
                          id: val.id,
                          name: val.title,
                        }))
                        .find(
                          (val) =>
                            val.id ===
                            queryInnvoice.formikParams.values.area_id,
                        ) || null
                    }
                    // value={queryInnvoice}
                    onChange={(e, value) =>
                      queryInnvoice.formikParams.setFieldValue(
                        'area_id',
                        value?.id,
                      )
                    }
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="area"
                        placeholder="Select Pasar"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              {/* <Grid item xs={12} md={4}>
                <FormLabel text="Category">
                  <Autocomplete
                    options={
                      queryCategory.listData.map((val) => ({
                        id: val.id,
                        name: val.name,
                      })) || []
                    }
                    noOptionsText={
                      !queryCategory.searchValue
                        ? 'Type to search area'
                        : 'No option'
                    }
                    inputValue={queryCategory.searchValue}
                    onInputChange={(_, newInputValue) => {
                      queryCategory.handleSearch(newInputValue);
                    }}
                    loading={queryCategory.isFetching}
                    getOptionLabel={(item) => item.name}
                    // value={formik.values.area || []}
                    // onChange={(e, value) => formik.setFieldValue('area', value)}
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="area"
                        placeholder="Example: Pasar Modern BSD"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid> */}
              <Grid item xs={12} md={4}>
                <FormLabel text="Invoice Type">
                  <Autocomplete
                    id="filterGrade"
                    value={
                      queryInnvoice.formikParams.values.invoice_type_id
                        ? {
                            id: queryInnvoice.formikParams.values
                              .invoice_type_id,
                            name: InvoiceType[
                              queryInnvoice.formikParams.values.invoice_type_id
                            ],
                          }
                        : null
                    }
                    options={Object.keys(InvoiceType).map((val) => ({
                      id: val,
                      // @ts-ignore
                      name: InvoiceType[val],
                    }))}
                    onChange={(e, value) => {
                      // handleChangeGrade(value);
                      queryInnvoice.formikParams.setFieldValue(
                        'invoice_type_id',
                        value?.id,
                      );
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="grade"
                          placeholder="Select Invoice Type"
                          variant="outlined"
                        />
                      );
                    }}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormLabel text="Status">
                  <Autocomplete
                    id="filterGrade"
                    options={['On Schedule', 'Late', 'Paid Off']}
                    onChange={(e, value) => {
                      queryInnvoice.formikParams.setFieldValue('status', value);
                    }}
                    value={
                      queryInnvoice.formikParams.values.status
                        ? queryInnvoice.formikParams.values.status
                        : null
                    }
                    getOptionLabel={(option) => `${option}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="grade"
                          placeholder="Select Status"
                          variant="outlined"
                        />
                      );
                    }}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel text="Invoice Date Range">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryInnvoice.formikParams.values.min_invoice_date ||
                          null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryInnvoice.formikParams.setFieldValue(
                            'min_invoice_date',
                            value,
                          );
                        }}
                        maxDate={
                          queryInnvoice.formikParams.values.max_invoice_date
                        }
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {queryInnvoice.formikParams.errors.min_invoice_date && (
                        <Typography color="error.main">
                          {queryInnvoice.formikParams.errors.min_invoice_date}
                        </Typography>
                      )}
                    </Stack>
                    <Box
                      sx={{
                        width: '20px',
                        borderBottom: '1px solid #000',
                        pt: 2,
                      }}
                    />
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryInnvoice.formikParams.values.max_invoice_date ||
                          null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryInnvoice.formikParams.setFieldValue(
                            'max_invoice_date',
                            value,
                          );
                        }}
                        minDate={
                          queryInnvoice.formikParams.values.min_invoice_date
                        }
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {queryInnvoice.formikParams.errors.max_invoice_date && (
                        <Typography color="error.main">
                          {queryInnvoice.formikParams.errors.max_invoice_date}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel text="Due Date Range">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryInnvoice.formikParams.values.min_due_date || null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryInnvoice.formikParams.setFieldValue(
                            'min_due_date',
                            value,
                          );
                        }}
                        maxDate={queryInnvoice.formikParams.values.max_due_date}
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {queryInnvoice.formikParams.errors.min_due_date && (
                        <Typography color="error.main">
                          {queryInnvoice.formikParams.errors.min_due_date}
                        </Typography>
                      )}
                    </Stack>
                    <Box
                      sx={{
                        width: '20px',
                        borderBottom: '1px solid #000',
                        pt: 2,
                      }}
                    />
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          queryInnvoice.formikParams.values.max_due_date || null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          queryInnvoice.formikParams.setFieldValue(
                            'max_due_date',
                            value,
                          );
                        }}
                        minDate={queryInnvoice.formikParams.values.min_due_date}
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Grade"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {queryInnvoice.formikParams.errors.max_due_date && (
                        <Typography color="error.main">
                          {queryInnvoice.formikParams.errors.max_due_date}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="end"
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      queryInnvoice.formikParams.resetForm();
                      queryInnvoice.handleResetFilter();
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Apply</Button>
                </Stack>
              </Grid>
            </Grid>
          </Collapse>
        </Card>
        <Card>
          <Table
            headCells={headCells}
            data={queryInnvoice.listData || []}
            loading={queryInnvoice.isLoading}
            page={queryInnvoice.data?.page || 0}
            count={queryInnvoice.data?.count || 0}
            totalData={queryInnvoice.data?.total || 0}
            onChangePage={(value) => {
              queryInnvoice.handleChangeParams({
                ...queryInnvoice.params,
                page: value,
              });
            }}
          />
        </Card>
      </Stack>
      <Modal
        open={invoiceForm.open}
        title="Create Invoice"
        onClose={invoiceForm.closeModal}
      >
        <FormInvoice onClose={invoiceForm.closeModal} />
      </Modal>
      <Modal
        open={Boolean(modalTypeSetManualSettled)}
        title={
          modalTypeSetManualSettled === 1
            ? 'Cut Loss'
            : modalTypeSetManualSettled === 2
            ? 'Memo Internal'
            : modalTypeSetManualSettled === 3
            ? 'Restructure'
            : 'Set Manual lunas'
        }
        onClose={() => setModalTypeSetManualSettled(null)}
      >
        <FormSetManualSettled
          typeId={modalTypeSetManualSettled || 0}
          invoiceDetail={invoiceDetail || ({} as InvoiceListType)}
          onClose={() => setModalTypeSetManualSettled(null)}
        />
      </Modal>
    </Box>
  );
}
