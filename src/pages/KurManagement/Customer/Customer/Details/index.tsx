/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Stack,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
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
import Label from 'components/Label';

import { useParams, useNavigate } from 'react-router-dom';
import { customerAction } from 'store/slice/kur/Customer';
import { requestKURAction } from 'store/slice/kur/Request';
import { paymentKURAction } from 'store/slice/kur/Payment';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RequestKUR } from 'models/kur/Request';
import { PaymentKUR } from 'models/kur/Payment';
import { InvoiceKur, InvoiceKurDetail } from 'models/kur/Invoice';
import { KurType } from 'pages/Finance/hooks/useConfigFinance';
import numberSeperator from 'utils/numberSeperator';
import {
  CalendarMonth,
  DocumentScanner,
  DocumentScannerSharp,
  KeyboardArrowDown,
  MoreVert,
} from '@mui/icons-material';
import MenuList from 'components/MenuList';
import { useMutation } from '@tanstack/react-query';
import { getDownloadPdfUser } from 'service/Kur/Customer';
import useLoadingSpinner from 'hooks/useLoadingSpinner';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';
import useToast from 'hooks/useToast';
import { base64toOpen } from 'utils/base64toDownload';
import {
  useInvoiceDetails,
  useInvoiceUserDetails,
  useLimitHistoryUserDetails,
  usePaymentUserDetails,
} from 'pages/Finance/hooks/useInvoiceService';
import FormTopUpLimit from 'pages/Finance/UserMerchant/Components/FormTopUpLimit';
import { TitlePage, BackButton, Menu } from './details.styled';
import { Document } from '@/pages/Finance/hooks/constumer.config';

function StatusColor(string: string | undefined) {
  let color = '#008e58';

  if (string === 'Reject') color = '#c10000';

  return color;
}

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
  const generatePDF = useMutation(getDownloadPdfUser);
  const { setLoading } = useLoadingSpinner();
  const { openToast } = useToast();
  const invoiceList = useInvoiceUserDetails(id);
  const paymentList = usePaymentUserDetails(id);
  const limitHistoryList = useLimitHistoryUserDetails(id);
  const topUpModal = useModal();

  useEffect(() => {
    if (id) {
      const idCust = parseInt(id);
      // Fetch
      dispatch(customerAction.fetchDataDetail({ id }));
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
  const countDiffDate = (start: number | undefined) => {
    const month = Math.round(
      (new Date().getTime() - (start || 0) * 1000) / 1000 / 60 / 60 / 24 / 30,
    );
    const year = Math.round(
      (new Date().getTime() - (start || 0) * 1000) /
        1000 /
        60 /
        60 /
        24 /
        365.25,
    );
    return `${month} month(s) ${year} year(s)`;
  };

  const getLimit = () => {
    if (customerKur.details?.user_status_id !== 6) {
      return {
        invoice: customerKur.details?.limit_request_plafon,
        cash: customerKur.details?.limit_request_cash,
      };
    }
    return {
      invoice: customerKur.details?.limit_plafon,
      cash: customerKur.details?.limit_cash,
    };
  };

  const getBiCheckingNotes = (biId: number | undefined) => {
    let stat = '';
    if (biId === 1) {
      stat = 'Conforming';
    } else if (biId === 2) {
      stat = 'Conforming with notes';
    } else if (biId === 3) {
      stat = 'Not Conforming';
    }
    return stat;
  };

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
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
                </Box>
                <MenuList
                  menu={[
                    {
                      label: `Genenerate Invoice`,
                      onClick: () => {
                        setLoading(true);
                        // @ts-ignore
                        generatePDF.mutate(id.toString(), {
                          onSuccess: (data) => {
                            setLoading(false);
                            openToast({
                              headMsg: 'Success to generate PDF',
                              severity: 'success',
                            });
                            base64toOpen(
                              // @ts-ignore
                              data.data,
                              `${customerKur.details?.user_number} - ${customerKur.details?.debtor_name}(${customerKur.details?.merchant_name}).pdf`,
                            );
                          },
                          onError: (error) => {
                            openToast({
                              headMsg: 'Failed to generate PDF',
                              severity: 'error',
                            });
                            setLoading(false);
                          },
                        });
                      },
                      dataId: 'button-edit-customer',
                    },
                    {
                      label: 'Top Up Limit',
                      onClick: () => {
                        topUpModal.openModal();
                      },
                      dataId: 'button-top-up-limit',
                    },
                  ]}
                >
                  <Button endIcon={<KeyboardArrowDown />}>Action</Button>
                </MenuList>
              </Stack>
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
                <DescDetails
                  title="Join Date"
                  icon={<CalendarMonth sx={{ color: '#008e58' }} />}
                  content={
                    customerKur.details?.created_at
                      ? moment
                          .unix(customerKur.details?.created_at)
                          .format('MMM DD, YYYY hh:mm A')
                      : '-'
                  }
                />
                <DescDetails
                  title={`Limit ${
                    customerKur.details?.user_status_id !== 6 ? 'Request' : ''
                  } Plafon`}
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(
                    getLimit().invoice || 0,
                  )}`}
                />
                <DescDetails
                  title={`Limit ${
                    customerKur.details?.user_status_id !== 6 ? 'Request' : ''
                  } Cash`}
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={`RP ${digitFormatter.format(getLimit().cash || 0)}`}
                />
                <DescDetails
                  title="Bank"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.bank_name}
                />
                <DescDetails
                  title="Bank"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.bank_account}
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
            {customerKur.details?.user_documents
              .slice()
              .sort((a, b) => {
                // @ts-ignore
                const titleDocA = Document[a.document_type_id] || '';
                // @ts-ignore
                const titleDocB = Document[b.document_type_id] || '';
                const isFormA = titleDocA.includes('Form');
                const isFormB = titleDocB.includes('Form');

                if (isFormA && !isFormB) return 1; // Move A (Form) towards the end
                if (!isFormA && isFormB) return -1; // Keep B (Form) towards the end
                return 0; // No change in order
              })
              .map((val) => {
                // @ts-ignore
                const titleDoc = Document[val.document_type_id] || '';
                return (
                  <Stack key={val.id} gap={0.6}>
                    <Typography
                      fontSize={12}
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {titleDoc}
                    </Typography>
                    {titleDoc.includes('Form') ? (
                      <Stack
                        direction="row"
                        gap={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button
                          startIcon={<DocumentScannerSharp />}
                          onClick={() => {
                            window.open(val.image_filepath, '_blank');
                          }}
                        >
                          View File
                        </Button>
                      </Stack>
                    ) : (
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
                    )}
                    {val.document_number && (
                      <Typography
                        align="center"
                        fontSize={11}
                        sx={{
                          color: '#8b95a5',
                        }}
                      >
                        ({val.document_number})
                      </Typography>
                    )}
                  </Stack>
                );
              })}
          </Stack>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="Verification Data" defaultOpen>
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
                  title="BI Checking Status"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={getBiCheckingNotes(
                    customerKur.details?.bi_checking_status_id,
                  )}
                />
                <DescDetails
                  title="BI Checking Notes"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.bi_checking_notes}
                />
                <DescDetails
                  title="Komite Notes"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.komite_notes}
                />
                <DescDetails
                  title="Reject Notes"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.reject_notes}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="KUR History" defaultOpen>
          <Box p="20px">
            <Tabs.Container
              value={kurHistoryTab}
              onChange={handleChangeKurHistoryTab}
              aria-label="basic tabs example"
              variant="fullWidth"
              sx={{ mb: 1 }}
            >
              {/* <Tabs.Item label="Request" /> */}
              <Tabs.Item label="Invoice" />
              <Tabs.Item label="Payment" />
              <Tabs.Item label="History Limit" />
            </Tabs.Container>
            {/* {kurHistoryTab === 0 && (
              <Table
                data={request.data}
                headCells={headCellRequest}
                count={request.params.count}
                page={request.params.page}
                totalData={request.total}
                onChangePage={(page) => handleChangePageRequest(page)}
              />
            )} */}
            {kurHistoryTab === 0 && (
              <Table
                data={invoiceList.listData}
                headCells={[
                  {
                    id: 'invoice_number',
                    label: 'Invoice Number',
                    format: ({ invoice_number, user, created_at, ...data }) => {
                      return (
                        <Typography
                          variant="body1"
                          color="info.main"
                          sx={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
                          onClick={() => {
                            navigate(`/finance/invoice/${data.id}`);
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
                    id: 'invoice_date',
                    label: 'Transfer Date',
                    format: ({ transfer_date }) => {
                      return (
                        <Typography variant="body1">
                          {transfer_date
                            ? moment(transfer_date * 1000).format('DD/MM/YYYY')
                            : '-'}
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
                          {due_date
                            ? moment(due_date * 1000).format('DD/MM/YYYY')
                            : '-'}
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'amount',
                    label: 'Transfer Amount',
                    minWidth: '150px',
                    format: ({ transfer_amount }) => {
                      return (
                        <Typography variant="body1">
                          Rp. {numberSeperator(transfer_amount || 0)}
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'interest_per_today',
                    label: 'Interest Daily',
                    minWidth: '150px',
                    format: ({ interest_per_today }) => {
                      return (
                        <Typography variant="body1">
                          Rp. {numberSeperator(interest_per_today || 0)}
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'interes_rate',
                    label: 'Interest Rate',
                    minWidth: '150px',
                    format: ({ amount, admin_fee, interest_rate }) => {
                      return (
                        <Typography variant="body1">
                          {interest_rate}%
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'paid_amount',
                    label: 'Paid Off Amount',
                    minWidth: '150px',
                    format: ({ paid_amount }) => {
                      return (
                        <Typography variant="body1">
                          Rp. {numberSeperator(paid_amount || 0)}
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
                    id: 'invoice_restructure_type',
                    label: 'Restructure Type',
                    align: 'center',
                    format: ({ invoice_restructure_type }) => {
                      return (
                        <Typography variant="body1">
                          {invoice_restructure_type.name || '-'}
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'invoice_type',
                    label: 'Invoice Type',
                    format: ({ invoice_type }) => {
                      return (
                        <Typography variant="body1">
                          {invoice_type?.name || '-'}
                        </Typography>
                      );
                    },
                  },
                  {
                    id: 'status',
                    label: 'Status',
                    align: 'center',
                    format: ({ status }) => {
                      if (!status) {
                        return (
                          <Label variant="filled" color="default">
                            -
                          </Label>
                        );
                      }
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
                ]}
                count={invoiceList.data?.count || 0}
                page={invoiceList.params.page}
                totalData={invoiceList.data?.total || 0}
                onChangePage={(page) =>
                  invoiceList.handleChangeParams({
                    page,
                  })
                }
              />
            )}
            {kurHistoryTab === 1 && (
              <Table
                data={paymentList.listData}
                headCells={[
                  {
                    id: 'id',
                    label: 'Order Number',
                    align: 'left',
                    format: (val) => (
                      <Typography
                        sx={{ color: '#0774d1', cursor: 'pointer' }}
                        // onClick={() => navigate(`/kur/request/${val.id}`)}
                      >
                        {val.payment_number}
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
                          {moment.unix(val.payment_date).format('MMM DD, YYYY')}
                        </Typography>
                        <Typography fontSize="12px">
                          {moment.unix(val.payment_date).format('hh:mm')}
                        </Typography>
                      </Box>
                    ),
                  },
                  {
                    id: 'id',
                    label: 'Amount',
                    align: 'left',
                    format: (val) => (
                      <Typography>
                        Rp {numberSeperator(val.amount || '0')}
                      </Typography>
                    ),
                  },
                  {
                    id: 'id',
                    label: 'Payment Method',
                    align: 'left',
                    format: (val) => (
                      <Typography>{val.payment_method?.name || '-'}</Typography>
                    ),
                  },
                ]}
                count={paymentList.data?.count || 0}
                page={paymentList.params.page}
                totalData={paymentList.data?.total || 0}
                onChangePage={(page) =>
                  paymentList.handleChangeParams({
                    page,
                  })
                }
              />
            )}
            {kurHistoryTab === 2 && (
              <Table
                data={limitHistoryList.listData}
                headCells={[
                  {
                    id: 'id',
                    label: 'Old Limit Cash',
                    align: 'left',
                    format: (val) => (
                      <Typography>
                        Rp {numberSeperator(val?.old_limit_cash || '0')}
                      </Typography>
                    ),
                  },
                  {
                    id: 'id',
                    label: 'New Limit Cash',
                    align: 'left',
                    format: (val) => (
                      <Typography>
                        Rp {numberSeperator(val?.new_limit_cash || '0')}
                      </Typography>
                    ),
                  },
                  {
                    id: 'id',
                    label: 'Old Limit Plafon',
                    align: 'left',
                    format: (val) => (
                      <Typography>
                        Rp {numberSeperator(val?.old_limit_plafon || '0')}
                      </Typography>
                    ),
                  },
                  {
                    id: 'id',
                    label: 'New Limit Plafon',
                    align: 'left',
                    format: (val) => (
                      <Typography>
                        Rp {numberSeperator(val?.new_limit_plafon || '0')}
                      </Typography>
                    ),
                  },
                ]}
                count={paymentList.data?.count || 0}
                page={paymentList.params.page}
                totalData={paymentList.data?.total || 0}
                onChangePage={(page) =>
                  paymentList.handleChangeParams({
                    page,
                  })
                }
              />
            )}
          </Box>
        </SubDetailsPagesWrapper>
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
      <Modal
        open={topUpModal.open}
        onClose={topUpModal.closeModal}
        title="Top Up Limit"
      >
        <FormTopUpLimit
          id={id}
          handleClose={(isSubmite) => {
            if (isSubmite) {
              dispatch(
                customerAction.fetchData({
                  status: 6,
                  search: customerKur.params.search,
                }),
              );
              limitHistoryList.refetch();
            }
            topUpModal.closeModal();
          }}
          openModal={topUpModal.open}
        />
      </Modal>
    </div>
  );
}
