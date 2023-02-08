import { Box, Card, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import digitFormatter from 'utils/digitFormatter';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { paymentKURAction } from 'store/slice/kur/Payment';
import moment from 'moment';
import noImage from 'assets/no-image.svg';
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
} from '../payment.styled';
import CustomerData from '../components/CustomerData';

export default function PaymentKURDetails() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id } = useParams();
  const isPaginationDisable = true;
  const dispatch = useAppDispatch();
  const paymentDetails = useAppSelector((state) => state.payment.detailsData);
  const statement = useAppSelector((state) => state.payment.detailsTableData);

  const headCell = [
    {
      id: 'image',
      label: 'Image',
      align: 'left',
      format: (val: any) => (
        <img
          src={noImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = noImage;
          }}
          alt="statement img"
          style={{ height: '80px', width: '80px' }}
        />
      ),
    },
    {
      id: 'submit_date',
      label: 'Submit Date',
      align: 'left',
      format: (val: any) => (
        <Typography>
          {moment.unix(val.created_at).format('DD/MM/YYYY')}
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
        <Typography> Rp {digitFormatter.format(val.amount)}</Typography>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left',
      format: (val: any) => <Typography>{val.description || '-'}</Typography>,
    },
  ];

  // get details
  useEffect(() => {
    if (id) dispatch(paymentKURAction.fetchDetails({ id }));
  }, []);

  // action
  const formModal = useModal();

  return (
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
                <Link style={{ textDecoration: 'none' }} to="/kur/payment">
                  <BackButton
                    sx={{
                      '&:hover': { bgcolor: '#fff' },
                    }}
                    startIcon={<ArrowBack />}
                  >
                    {paymentDetails?.kur_payment_number}
                  </BackButton>
                </Link>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
        <Content>
          <Box display="flex" flexDirection="column" gap="40px">
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              <Typography fontWeight={700} variant="h1">
                {paymentDetails?.kur_user?.name}
              </Typography>
              <FieldContent sx={{ marginLeft: '20px' }}>
                <InvoiceStatus status={paymentDetails?.status}>
                  {paymentDetails?.status}
                </InvoiceStatus>
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
                    <Person2OutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                  }
                  fieldName="Customer ID"
                  fieldContent={paymentDetails?.kur_user?.user_id}
                />

                <CustomerData
                  icon={
                    <ErrorOutlineOutlinedIcon
                      sx={{ color: '#008e58', mr: '4px' }}
                    />
                  }
                  fieldName="NIK"
                  fieldContent={paymentDetails?.kur_user?.nik}
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
              </ContentGrid>

              <ContentGrid>
                <CustomerData
                  icon={
                    <CallOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                  }
                  fieldName="Phone Number"
                  fieldContent={paymentDetails?.kur_user.phone_number}
                />

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
                    <FieldContent>-</FieldContent>
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
                            .format('DD MMMM YYYY hh:mm:ss A')
                        : '-'}
                    </FieldContent>
                  </DescriptionBox>
                </Field>

                <Field>
                  <DescriptionBox>
                    <FieldName>Request Status</FieldName>
                    <FieldContent>
                      <InvoiceStatus status={paymentDetails?.status}>
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
      <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
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
  );
}
