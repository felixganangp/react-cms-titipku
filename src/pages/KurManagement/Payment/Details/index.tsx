import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Table from 'components/Table';
import DefaultModal from '@mui/material/Modal';

import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import digitFormatter from 'utils/digitFormatter';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { paymentKURAction } from 'store/slice/kur/Payment';
import moment from 'moment';
import noImage from 'assets/no-image.svg';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import {
  BackButton,
  Content,
  ContentGrid,
  Field,
  DescriptionBox,
  FieldName,
  FieldContent,
  InvoiceStatus,
  CreditScore,
} from '../payment.styled';
import RefusalReason from '../components/InputMessage';
import CustomerData from '../components/CustomerData';

export default function PaymentKURDetails() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const navigate = useNavigate();
  const { id } = useParams();
  const isPaginationDisable = true;
  const dispatch = useAppDispatch();
  const paymentDetails = useAppSelector((state) => state.payment.detailsData);
  const statement = useAppSelector((state) => state.payment.detailsTableData);
  const creditBalance = useAppSelector((state) => state.payment.creditBalance);
  const formModal = useModal();

  useEffect(() => {
    if (id) dispatch(paymentKURAction.fetchDetails({ id }));
  }, []);

  const handleApprovePayment = (paymentId: number | string) => {
    dispatch(
      paymentKURAction.approvePayment({ id: paymentId, detailsPage: true }),
    );
  };

  const handleRejectPayment = (paymentId: number | string, remarks: string) => {
    dispatch(
      paymentKURAction.rejectPayment({
        id: paymentId,
        detailsPage: true,
        remarks,
      }),
    );
    formModal.closeModal();
  };
  const [modalImage, setModalImage] = useState<{
    open: boolean;
    filePath: string | null;
  }>({
    open: false,
    filePath: null,
  });

  const handleZoomImage = (open: boolean, filePath: string | null) => {
    setModalImage({ open, filePath });
  };

  const headCell = [
    {
      id: 'image',
      label: 'Image',
      align: 'left',
      format: (val: any) => (
        <Box onClick={() => handleZoomImage(true, val.proof_of_payment)}>
          <img
            src={val.proof_of_payment}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = noImage;
            }}
            alt="statement img"
            style={{ height: '80px', width: '80px' }}
          />
        </Box>
      ),
    },
    {
      id: 'submit_date',
      label: 'Submit Date',
      align: 'left',
      format: (val: any) => (
        <Typography>
          {moment.unix(val.created_at).format('MMMM DD, YYYY')}
        </Typography>
      ),
    },
    {
      id: 'transfer_to',
      label: 'Transfer to',
      align: 'left',
      format: (val: any) => <Typography> {val.paid_to_bank}</Typography>,
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
      format: (val: any) => (
        <Typography style={{ color: '#008e58' }}>
          Rp {digitFormatter.format(val.amount)}
        </Typography>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left',
      format: (val: any) => <Typography>{val.description || '-'}</Typography>,
    },
  ];

  return (
    <>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="titlePage">Payment Detail</Typography>
                  <BackButton
                    sx={{
                      '&:hover': { bgcolor: '#fff' },
                    }}
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(-1)}
                  >
                    {paymentDetails?.kur_payment_number}
                  </BackButton>
                </Box>

                <Box
                  display={
                    paymentDetails?.status === 'pending' ? 'flex' : 'none'
                  }
                  flexDirection="row"
                  gap="13px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      padding: '8px 30px',
                    }}
                    startIcon={
                      <CloseIcon
                        sx={{
                          color: '#C10000',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                        }}
                      />
                    }
                    onClick={formModal.openModal}
                  >
                    Reject
                  </Button>
                  <Button
                    style={{
                      padding: '8px 30px',
                    }}
                    startIcon={
                      <CheckIcon
                        sx={{
                          color: '#008E58',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                        }}
                      />
                    }
                    onClick={() => {
                      if (id) handleApprovePayment(id);
                    }}
                  >
                    Approve
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
          <Content>
            <Box display="flex" flexDirection="column" gap="40px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
              >
                <Typography fontWeight={700} variant="h1">
                  {paymentDetails?.kur_user?.name}
                </Typography>
                <FieldContent sx={{ marginLeft: '20px' }}>
                  <CreditScore
                    status={
                      paymentDetails?.kur_user?.kur_user_credit_score?.name
                    }
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {paymentDetails?.kur_user?.kur_user_credit_score?.name}
                  </CreditScore>
                </FieldContent>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                height="100%"
              >
                <ContentGrid>
                  <CustomerData
                    icon={
                      <Person2OutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Customer ID"
                    fieldContent={paymentDetails?.kur_user_id}
                  />

                  <CustomerData
                    icon={
                      <CalendarTodayOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Birth Date"
                    fieldContent={
                      paymentDetails
                        ? moment
                            .unix(paymentDetails.kur_user.birth_date || 0)
                            .format('DD MMMM YYYY')
                        : '-'
                    }
                  />

                  <CustomerData
                    icon={
                      <EmailOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                    }
                    fieldName="Email"
                    fieldContent={paymentDetails?.kur_user?.email}
                  />

                  <CustomerData
                    icon={
                      <CallOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                    }
                    fieldName="Phone Number"
                    fieldContent={paymentDetails?.kur_user.phone_number}
                  />
                </ContentGrid>

                <ContentGrid>
                  <CustomerData
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Address (KTP)"
                    fieldContent={paymentDetails?.kur_user.registered_address}
                  />

                  <CustomerData
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Address (Domicile)"
                    fieldContent={paymentDetails?.kur_user.living_address}
                  />
                </ContentGrid>

                <ContentGrid>
                  <Field>
                    <AttachMoneyOutlinedIcon
                      sx={{ color: '#008e58', mr: '4px' }}
                    />
                    <DescriptionBox>
                      <FieldName>Credit Limit</FieldName>
                      <FieldContent>
                        Rp{' '}
                        {digitFormatter.format(
                          paymentDetails?.kur_user.credit_limit || 0,
                        )}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <AttachMoneyOutlinedIcon
                      sx={{ color: 'transparent', mr: '4px' }}
                    />
                    <DescriptionBox>
                      <FieldName>Credit Balance</FieldName>
                      <FieldContent>
                        Rp {digitFormatter.format(creditBalance)}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <AttachMoneyOutlinedIcon
                      sx={{ color: 'transparent', mr: '4px' }}
                    />
                    <DescriptionBox>
                      <FieldName>Admin Fee</FieldName>
                      <FieldContent>
                        {paymentDetails?.kur_user.admin_fee}%
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <AttachMoneyOutlinedIcon
                      sx={{ color: 'transparent', mr: '4px' }}
                    />
                    <DescriptionBox>
                      <FieldName>DPD Rate</FieldName>
                      <FieldContent>
                        {paymentDetails?.kur_user.dpd_rate}%
                      </FieldContent>
                    </DescriptionBox>
                  </Field>
                </ContentGrid>

                <ContentGrid>
                  <Field>
                    <DescriptionBox>
                      <FieldName>Primary Account Number</FieldName>
                      <FieldContent>
                        {paymentDetails?.kur_user.user_bank} -{' '}
                        {paymentDetails?.kur_user.user_account_number}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Nobu Account Number</FieldName>
                      <FieldContent>
                        NOBU - {paymentDetails?.kur_user.nobu_account_number}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Join Date</FieldName>
                      <FieldContent>
                        {paymentDetails
                          ? moment
                              .unix(paymentDetails.kur_user.join_date || 0)
                              .format('MMM DD, YYYY hh:mm A')
                          : '-'}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Request Status</FieldName>
                      <FieldContent>
                        <InvoiceStatus
                          sx={{ textTransform: 'capitalize' }}
                          status={paymentDetails?.status}
                        >
                          {paymentDetails?.status}
                        </InvoiceStatus>
                      </FieldContent>
                    </DescriptionBox>
                  </Field>
                </ContentGrid>
              </Box>
            </Box>
          </Content>
        </SubDetailsPagesWrapper>
        <SubDetailsPagesWrapper title="Statement" defaultOpen>
          <Content>
            <Table
              data={statement || []}
              selected={[]}
              count={1}
              headCells={headCell}
              page={1}
              totalData={1}
              disablePagination={isPaginationDisable}
            />
          </Content>
        </SubDetailsPagesWrapper>
      </Box>
      {/* modals */}
      <Modal
        open={formModal.open}
        title="Refusal Reason"
        onClose={formModal.closeModal}
      >
        <RefusalReason onSubmitRefusal={handleRejectPayment} id={id || 0} />
      </Modal>
      <DefaultModal
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
      </DefaultModal>
    </>
  );
}
