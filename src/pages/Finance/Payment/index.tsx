import { useState } from 'react';
import useModal from 'hooks/useModal';
import { Add, KeyboardArrowDown, MoreVert, Search } from '@mui/icons-material';
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
import FormLabel from 'components/FormLabel';
import Table from 'components/Table';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import Modal from 'components/Modal';
import PopupAction from 'components/PopupAction';
import MenuList from 'components/MenuList';
import useToast from 'hooks/useToast';
import { UseDeletePayment, UseGetPeyement } from '../hooks/usePaymentService';
import FormPayment from './Components/FormPayment';
import { UseInvoiceType } from '../hooks/useConfigFinance';

export default function PaymentPage() {
  const { openToast } = useToast();
  const navigate = useNavigate();
  const paymentForm = useModal();
  const showFilter = useModal();
  const deletePaymentModal = useModal();
  const [selected, setSelected] = useState<any>();
  const deletePayment = UseDeletePayment();
  const invoiceType = UseInvoiceType();

  const paymentQuery = UseGetPeyement();

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Typography variant="titlePage">Payment</Typography>
        </Card>
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" alignItems="center" gap={2} flex={1}>
              <Button startIcon={<Add />} onClick={paymentForm.openModal}>
                Create Payment
              </Button>
              <TextField
                placeholder="Search for Payment Number"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                value={paymentQuery.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  paymentQuery.handleSearch(event.target.value);
                  paymentQuery.handleToSetSearchParams(
                    'search',
                    event.target.value,
                  );

                  // debounceSearch(event.target.value);
                }}
              />
            </Stack>
            <Button
              endIcon={<KeyboardArrowDown />}
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
              onSubmit={paymentQuery.formikParams.handleSubmit}
            >
              <Grid item xs={12} md={4}>
                <FormLabel text="Category Restructure Type">
                  <Autocomplete
                    options={invoiceType.listData}
                    // @ts-ignore
                    getOptionLabel={(item) => item.name}
                    value={
                      invoiceType.listData?.filter(
                        (val) =>
                          paymentQuery.formikParams.values.invoice_type ===
                          val.name,
                      )?.[0] || null
                    }
                    // multiple
                    onChange={(e, value) => {
                      paymentQuery.formikParams.setFieldValue(
                        'invoice_type',
                        // @ts-ignore
                        // eslint-disable-next-line radix
                        value.name,
                      );
                    }}
                    onBlur={() => {
                      paymentQuery.formikParams.setFieldTouched('invoice_type');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="invoice_type"
                        placeholder="Select Category"
                        error={
                          paymentQuery.formikParams.touched?.invoice_type &&
                          Boolean(
                            paymentQuery.formikParams.errors?.invoice_type,
                          )
                        }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel text="Payment Date Range">
                  <Stack direction="row" spacing={1} alignItems="start">
                    <Stack spacing={1} width="100%">
                      <DesktopDatePicker
                        value={
                          paymentQuery.formikParams.values.min_payment_date ||
                          null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          paymentQuery.formikParams.setFieldValue(
                            'min_payment_date',
                            value,
                          );
                        }}
                        maxDate={
                          paymentQuery.formikParams.values.max_payment_date
                        }
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="min_payment_date"
                              placeholder="Select Date Payment"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {paymentQuery.formikParams.errors.min_invoice_date && (
                        <Typography color="error.main">
                          {paymentQuery.formikParams.errors.min_invoice_date}
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
                          paymentQuery.formikParams.values.max_payment_date ||
                          null
                        }
                        inputFormat="DD/MM/YYYY"
                        onChange={(value) => {
                          paymentQuery.formikParams.setFieldValue(
                            'max_payment_date',
                            value,
                          );
                        }}
                        minDate={
                          paymentQuery.formikParams.values.min_payment_date
                        }
                        // maxDate={formik.values.max_date_created}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="grade"
                              placeholder="Select Date Payment"
                              variant="outlined"
                              fullWidth
                            />
                          );
                        }}
                      />
                      {paymentQuery.formikParams.errors.max_payment_date && (
                        <Typography color="error.main">
                          {paymentQuery.formikParams.errors.max_payment_date}
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
                      paymentQuery.formikParams.resetForm();
                      paymentQuery.handleResetFilter({ whiteList: ['search'] });
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
            headCells={[
              {
                id: 'payment_number',
                label: 'No Payment',
                format: (value: any) => (
                  <Typography
                    color="info.main"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/finance/payment/${value.id}`)}
                  >
                    {value.payment_number}
                  </Typography>
                ),
              },
              {
                id: 'name',
                label: 'Name',
                format: (value: any) => value.user.merchant_name,
              },
              {
                id: 'user_number',
                label: 'User Number',
                format: (value: any) => value.user.user_number,
              },
              {
                id: 'kur_type',
                label: 'Kur Type',
                format: (value: any) => value.user_type.name,
              },
              {
                id: 'payment_date',
                label: 'Payment Date',
                format: (value: any) => (
                  <Typography variant="body1">
                    {moment(value.payment_date * 1000).format('DD/MM/YYYY')}
                  </Typography>
                ),
              },
              {
                id: 'payment_amount',
                label: 'Payment Amount',
                format: (value: any) => (
                  <Typography variant="body1">
                    Rp. {numberSeperator(value.amount || 0)}
                  </Typography>
                ),
              },
              {
                id: 'payment_method',
                label: 'Payment Method',
                format: (value: any) => (
                  <Typography variant="body1">
                    {value.payment_method.name}
                  </Typography>
                ),
              },
              {
                id: 'invoice type',
                label: 'Invoice Type',
                format: (value: any) => (
                  <Typography variant="body1">
                    {value.payment_invoice_type}
                  </Typography>
                ),
              },
              {
                id: 'action',
                label: 'Action',
                format: (value) => {
                  return (
                    <MenuList
                      menu={[
                        {
                          label: 'Delete',
                          disabled: false,
                          onClick: () => {
                            deletePaymentModal.openModal();
                            setSelected({
                              name: value.payment_number,
                              id: value.id,
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
            ]}
            data={paymentQuery.listData || []}
            loading={paymentQuery.isLoading}
            page={paymentQuery.data?.page || 0}
            count={paymentQuery.data?.count || 0}
            totalData={paymentQuery.data?.total || 0}
            onChangePage={(value) => {
              paymentQuery.handleChangeParams({
                ...paymentQuery.params,
                page: value,
              });
              paymentQuery.handleToSetSearchParams('page', value.toString());
            }}
          />
        </Card>
      </Stack>
      <Modal
        open={paymentForm.open}
        onClose={paymentForm.closeModal}
        title="Create Payment"
      >
        <FormPayment
          onClose={(isSubmitted) => {
            paymentForm.closeModal();
            if (isSubmitted) {
              paymentQuery.refetch();
            }
          }}
        />
      </Modal>
      <PopupAction
        open={deletePaymentModal.open}
        onClose={() => {
          deletePaymentModal.closeModal();
          setSelected(null);
        }}
        onSubmit={() => {
          deletePayment.mutate(selected?.id, {
            onSuccess: () => {
              openToast({
                headMsg: 'Success delete payment',
                severity: 'success',
              });
              paymentQuery.refetch();
              deletePaymentModal.closeModal();
              setSelected(null);
            },
            onError: (e) => {
              openToast({
                // @ts-ignore
                headMsg: e || 'Failed delete payment',
                severity: 'error',
              });
            },
          });
        }}
        title="Delete Payment"
        content={`Are you sure to delet this payment ${selected?.name}?`}
        buttonLabel="Delete"
      />
    </Box>
  );
}
