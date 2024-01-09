/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import moment from 'moment';

import DescDetails from 'components/DescDetails';
import Tabs from 'components/Tabs';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import Status from 'components/Status';
import digitFormatter from 'utils/digitFormatter';

import TypesIcon from 'components/Icon/Types';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallIcon from '@mui/icons-material/Call';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import { useParams, useNavigate } from 'react-router-dom';
import { customerAction } from 'store/slice/kur/Customer';
import { requestKURAction } from 'store/slice/kur/Request';
import { paymentKURAction } from 'store/slice/kur/Payment';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RequestKUR } from 'models/kur/Request';
import { PaymentKUR } from 'models/kur/Payment';
import { InvoiceKur, InvoiceKurDetail } from 'models/kur/Invoice';

import { CalendarMonth } from '@mui/icons-material';
import { Button } from 'react-day-picker';
import { TitlePage, BackButton, Menu } from './details.styled';

function StatusColor(string: string | undefined) {
  let color = '#008e58';

  if (string === 'Reject') color = '#c10000';

  return color;
}

const Document = ['KTP', 'NIB', 'NPWP', 'SKU', 'KTP Pasangan', 'Surat Cerai'];

interface ModalImageTypes {
  open: boolean;
  filePath: string | null;
}
export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customerKur = useAppSelector((state) => state.customerKur);
  const request = useAppSelector((state) => state.request);
  const payment = useAppSelector((state) => state.payment);
  const invoice = useAppSelector((state) => state.invoice);
  const [kurHistoryTab, setKurHistoryTab] = useState(0);
  const [modalImage, setModalImage] = useState<ModalImageTypes>({
    open: false,
    filePath: null,
  });

  useEffect(() => {
    if (id) {
      const idCust = parseInt(id);
      // Fetch
      dispatch(customerAction.fetchDataDetail({ id }));
      dispatch(
        requestKURAction.fetchData({
          ...request.params,
          kur_user_id: idCust,
          count: 5,
        }),
      );
      dispatch(
        paymentKURAction.fetchData({
          ...payment.params,
          kur_user_id: idCust,
          count: 5,
        }),
      );
      dispatch(
        invoiceKurAction.fetchData({
          ...invoice.params,
          kur_user_id: idCust,
          count: 5,
        }),
      );
      // Set Params
      dispatch(
        requestKURAction.setParams({
          kur_user_id: idCust,
          count: 5,
        }),
      );
      dispatch(
        paymentKURAction.setParams({
          kur_user_id: idCust,
          count: 5,
        }),
      );
      dispatch(
        invoiceKurAction.setParams({
          kur_user_id: idCust,
          count: 5,
        }),
      );
    }

    return () => {
      dispatch(requestKURAction.setResetParams());
      dispatch(paymentKURAction.setResetParams());
      dispatch(invoiceKurAction.setResetParams());
    };
  }, []);

  const handleChangeKurHistoryTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setKurHistoryTab(newValue);
  };

  const handleChangePageRequest = (value: number) => {
    dispatch(
      requestKURAction.fetchData({
        ...request.params,
        page: value,
      }),
    );
    dispatch(
      requestKURAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangePagePayment = (value: number) => {
    dispatch(
      paymentKURAction.fetchData({
        ...payment.params,
        page: value,
      }),
    );
    dispatch(
      paymentKURAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangePageInvoice = (value: number) => {
    dispatch(
      invoiceKurAction.fetchData({
        ...invoice.params,
        page: value,
      }),
    );
    dispatch(
      invoiceKurAction.setParams({
        page: value,
      }),
    );
  };

  const handleViewDetailImage = (open: boolean, filePath: string | null) => {
    setModalImage({ open, filePath });
  };

  const countDiffDate = (start: number | undefined) => {
    const date1 = new Date((start || 1) * 1000);
    const date2 = new Date(Date.now());
    const years = date2.getFullYear() - date1.getFullYear();
    const months = date2.getMonth() - date1.getMonth();
    return `${years} year(s) ${months} month(s)`;
  };

  const headCellRequest: HeadCells<RequestKUR>[] = [
    {
      id: 'id',
      label: 'Order Number',
      align: 'left',
      format: (val) => (
        <Typography
          sx={{ color: '#0774d1', cursor: 'pointer' }}
          onClick={() => navigate(`/kur/request/${val.id}`)}
        >
          {val.kur_request_number}
        </Typography>
      ),
    },
    {
      id: 'created_at',
      label: 'Request Date',
      align: 'left',
      format: (val) => (
        <Box>
          <Typography>
            {moment.unix(val.created_at).format('MMM DD, YYYY')}
          </Typography>
          <Typography fontSize="12px">
            {moment.unix(val.created_at).format('hh:mm')}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'decision_date',
      label: 'Delivery Date',
      align: 'left',
      format: (val) => {
        if (val.decision_date === 0) {
          return <span>-</span>;
        }
        return (
          <Box>
            <Typography>
              {moment.unix(val.decision_date).format('MMM DD, YYYY')}
            </Typography>
            <Typography fontSize="12px">
              {moment.unix(val.decision_date).format('hh:mm')}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
      format: (val) => (
        <Typography>Rp {digitFormatter.format(val.amount)}</Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      width: '150px',
      format: (val) => {
        const color = (status: string) => {
          let result = '#C10000';
          if (status === 'pending') {
            result = '#FF8F00';
          }
          if (status === 'approved') {
            result = '#008E58';
          }

          return result;
        };
        return <Status color={color(val.status)}>{val.status}</Status>;
      },
    },
  ];

  const headCellPayment: HeadCells<PaymentKUR>[] = [
    {
      id: 'kur_payment_number',
      label: 'No. Payment',
      align: 'left',
      minWidth: '160px',
      format: (val) => (
        <Typography
          sx={{ color: '#0774d1', cursor: 'pointer' }}
          onClick={() => navigate(`/kur/payment/${val.id}`)}
        >
          {val.kur_payment_number}
        </Typography>
      ),
    },
    {
      id: 'paid_to_account_number',
      label: 'Transfer To',
      align: 'left',
      minWidth: '200px',
      format: (val) => (
        <Typography>
          {val.paid_to_account_number} - {val.paid_to_bank}
        </Typography>
      ),
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
      id: 'decision_date',
      label: 'Approve Date',
      align: 'left',
      format: (val) => (
        <Typography>
          {val.decision_date !== 0 && val.decision_date !== null
            ? moment.unix(val.decision_date).format('DD/MM/YYYY')
            : '-'}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      width: '160px',
      format: (val) => {
        const color = () => {
          let result = '#cecece';
          if (val.status === 'approved') {
            result = '#008e58';
          }
          if (val.status === 'pending') {
            result = '#FF8F00';
          }
          if (val.status === 'rejected') {
            result = '#c10000';
          }
          return result;
        };
        return (
          <Status color={color()}>{val.status.replaceAll('_', ' ')}</Status>
        );
      },
    },
  ];

  const headCellInvoice: HeadCells<InvoiceKur>[] = [
    {
      id: 'kur_payment_number',
      label: 'No. Invoice',
      align: 'left',
      minWidth: '160px',
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
      format: (val) => {
        if (val.kur_invoice_detail?.length > 0) {
          const getLast: InvoiceKurDetail = val.kur_invoice_detail?.filter(
            (e: InvoiceKurDetail) => e.is_last,
          )[0];
          return (
            <Typography>
              {moment.unix(getLast.created_at).format('DD/MM/YYYY')}
            </Typography>
          );
        }

        return <span>-</span>;
      },
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

  const renameDocument = (value: string) => {
    let term = value;

    if (term === 'kk') {
      term = 'Kartu Keluarga C1';
    } else if (term === 'sku') {
      term = 'Surat Keterangan Usaha';
    } else {
      term = term.toLocaleUpperCase().replaceAll('_', ' ');
    }
    return term;
  };
  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Menu>Kredit Usaha Rakyat</Menu>
              <Box
                style={{ textDecoration: 'none' }}
                onClick={() => navigate(-1)}
              >
                <BackButton
                  sx={{ '&:hover': { backgroundColor: '#ffff' } }}
                  startIcon={<ArrowBackIosIcon />}
                >
                  <TitlePage>Customer Detail</TitlePage>
                </BackButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* BASIC INFO */}
        <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
          <Box p="20px">
            <Box display="flex" mb="30px" gap="10px">
              <Typography variant="h1" fontWeight="700">
                {customerKur.details?.debtor_name}
              </Typography>
              <Status
                color={StatusColor(customerKur.details?.user_status.name)}
              >
                {customerKur.details?.user_status.name || '-'}
              </Status>
            </Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <DescDetails
                  title="Customer ID"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.user_number}
                />
                <DescDetails
                  title="Merchant Name"
                  icon={<StorefrontOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.merchant_name}
                />
                <DescDetails
                  title="Merchant Category"
                  icon={<StorefrontOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.category_jelajah_name}
                />
                <DescDetails
                  title="Area"
                  icon={<LocationOnOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.area_name}
                />
                <DescDetails
                  title="Business Lifetime"
                  icon={<CalendarMonth sx={{ color: '#008e58' }} />}
                  content={
                    <Box>
                      <Typography>
                        {countDiffDate(customerKur.details?.business_lifetime)}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#8b95a5' }}>
                        {`Since: ${
                          customerKur.details?.business_lifetime
                            ? moment
                                .unix(customerKur.details?.business_lifetime)
                                .format('MMM DD, YYYY')
                            : '-'
                        }`}
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <DescDetails
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  title="User Type"
                  content={customerKur.details?.user_type?.name}
                />
                <DescDetails
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  title="Merchant Titipku"
                  content={
                    customerKur.details?.is_merchant_titipku ? 'Yes' : 'No'
                  }
                />
                <DescDetails
                  icon={<CallIcon sx={{ color: '#008e58' }} />}
                  title="Phone Number"
                  content={customerKur.details?.phone_number}
                />
                <DescDetails
                  icon={<CallIcon sx={{ color: '#008e58' }} />}
                  title="Family Phone Number"
                  content={customerKur.details?.family_phone_number}
                />
                <DescDetails
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  title="Mariage Status"
                  content={customerKur.details?.marriage_status}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                {/* <DescDetails
                  title="Created Date"
                  content={
                    customerKur.details?.created_at
                      ? moment
                          .unix(customerKur.details?.created_at)
                          .format('MMM DD, YYYY hh:mm A')
                      : '-'
                  }
                /> */}
                <DescDetails
                  title="Credit Limit Plafon"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.limit_request_plafon}
                />
                <DescDetails
                  title="Credit Limit Cash"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.limit_request_cash}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="IDIR Document" defaultOpen>
          <Box p="20px">
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <DescDetails
                  title="IDIR Number"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.user_idir?.IdirNumber}
                />
                <DescDetails
                  title="IDIR Score"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.user_idir?.IdirScore}
                />
                <DescDetails
                  title="GMV"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.GMV || 0,
                  )}`}
                />
                <DescDetails
                  title="Office Rent"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.OfficeRent || 0,
                  )}`}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <DescDetails
                  title="Electricity"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.Electricity || 0,
                  )}`}
                />
                <DescDetails
                  title="Education Expense"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.EducationExpense || 0,
                  )}`}
                />
                <DescDetails
                  title="Household Expense"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.HouseholdExpense || 0,
                  )}`}
                />
                <DescDetails
                  title="Employee Expense"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.EmployeeExpense || 0,
                  )}`}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                gap="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
              >
                <DescDetails
                  title="Another Loan"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    customerKur.details?.user_idir?.AnotherLoan || 0,
                  )}`}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="User Documents" defaultOpen>
          <Stack direction="row" flexWrap="wrap" gap={2} p={1}>
            {customerKur.details?.user_documents.map((val) => (
              <Stack key={val.id} gap={0.6}>
                <Typography
                  fontSize={12}
                  fontWeight="bold"
                  color="primary.main"
                >
                  {Document[val.document_type_id]}
                </Typography>
                <Typography fontSize={16}>
                  {val.document_number ? val.document_number : '-'}
                </Typography>
                <Box
                  component="img"
                  // onClick={() =>
                  //   setImagePreview(VITE_APP_IMAGE_URL + val.image_filepath)
                  // }
                  src={val.image_filepath}
                  sx={{
                    aspectRatio: '1/1',
                    border: 'unset',
                    objectFit: 'contain',
                    bgcolor: '#cecece',
                  }}
                  width="250px"
                />
              </Stack>
            ))}
          </Stack>
        </SubDetailsPagesWrapper>

        {/* <SubDetailsPagesWrapper title="KUR History" defaultOpen>
          <Box p="20px">
            <Tabs.Container
              value={kurHistoryTab}
              onChange={handleChangeKurHistoryTab}
              aria-label="basic tabs example"
              variant="fullWidth"
              sx={{ mb: 1 }}
            >
              <Tabs.Item label="Request" />
              <Tabs.Item label="Payment" />
              <Tabs.Item label="Invoice" />
            </Tabs.Container>
            {kurHistoryTab === 0 && (
              <Table
                data={request.data}
                headCells={headCellRequest}
                count={request.params.count}
                page={request.params.page}
                totalData={request.total}
                onChangePage={(page) => handleChangePageRequest(page)}
              />
            )}
            {kurHistoryTab === 1 && (
              <Table
                data={payment.data}
                headCells={headCellPayment}
                count={payment.params.count}
                page={payment.params.page}
                totalData={payment.total}
                onChangePage={(page) => handleChangePagePayment(page)}
              />
            )}
            {kurHistoryTab === 2 && (
              <Table
                data={invoice.data}
                headCells={headCellInvoice}
                count={invoice.params.count}
                page={invoice.params.page}
                totalData={invoice.total}
                onChangePage={(page) => handleChangePageInvoice(page)}
              />
            )}
          </Box>
        </SubDetailsPagesWrapper> */}
        {/* <Modal
          open={modalImage.open}
          onClose={() => setModalImage({ open: false, filePath: null })}
        >
          <Box
            position="absolute"
            maxHeight="70vh"
            maxWidth="90vw"
            component="img"
            bgcolor="#cecece"
            top="50%"
            left="50%"
            sx={{
              objectFit: 'contain',
              transform: 'translate(-50%, -50%)',
            }}
            src={modalImage.filePath || undefined}
          />
        </Modal> */}
      </Box>
    </div>
  );
}
