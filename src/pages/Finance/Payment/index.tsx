import useModal from 'hooks/useModal';
import { Add, KeyboardArrowDown, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Collapse,
  Grid,
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
import { UseGetPeyement } from '../hooks/usePaymentService';
import FormPayment from './Components/FormPayment';

export default function PaymentPage() {
  const navigate = useNavigate();
  const paymentForm = useModal();
  const showFilter = useModal();

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
              <Grid item xs={12} md={6}>
                <FormLabel text="Invoice Date Range">
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
    </Box>
  );
}
