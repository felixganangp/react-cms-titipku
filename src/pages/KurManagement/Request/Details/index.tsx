import { Box, Card, Grid, Button, Typography, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

import DefaultModal from '@mui/material/Modal';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import digitFormatter from 'utils/digitFormatter';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { requestKURAction } from 'store/slice/kur/Request';
import moment from 'moment';
import noImage from 'assets/no-image.svg';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import {
  DetailsHeader,
  BackButton,
  ContentGrid,
  Field,
  DescriptionBox,
  FieldName,
  FieldContent,
  Amount,
  InvoiceStatus,
  CustomerStatusDetail,
} from '../request.styled';
import RefusalReason from '../components/InputMessage';
import CustomerData from '../components/CustomerData';

export default function RequestKURDetails() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const requestDetails = useAppSelector((state) => state.request.detailsData);
  const creditBalance = useAppSelector((state) => state.request.creditBalance);
  const details = useAppSelector((state) => state.request);

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
      width: '130px',
      format: (val: any) => (
        <Box onClick={() => handleZoomImage(true, val.image_filepath)}>
          <img
            src={val.image_filepath}
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
      id: 'amount',
      label: 'Amount',
      align: 'left',
      width: '230px',
      format: (val: any) => (
        <Typography color="#008E58">
          Rp {digitFormatter.format(val.amount)}
        </Typography>
      ),
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left',
      format: (val: any) => (
        <Box>
          <Typography>{val.description || '-'}</Typography>
        </Box>
      ),
    },
  ];

  // get details
  useEffect(() => {
    if (id) {
      dispatch(requestKURAction.fetchDetails({ id }));
    }
  }, []);

  // table's
  useEffect(() => {
    if (id)
      dispatch(
        requestKURAction.fetchDetailsTable({
          id,
          params: details.detailParams,
        }),
      );
  }, [details.detailParams]);

  const handleChangePage = (value: number) => {
    dispatch(requestKURAction.setDetailsTableParams({ page: value }));
  };

  useEffect(() => {
    if (requestDetails) {
      let total = 0;
      if (requestDetails.kur_request_detail) {
        // eslint-disable-next-line array-callback-return
        requestDetails.kur_request_detail.some((item: any) => {
          total += item.amount;
        });
      }
      setTotalAmount(total);
    }
  }, [requestDetails]);

  // action
  const formModal = useModal();

  const handleApproveRequest = async (approvedId: number | string) => {
    dispatch(
      requestKURAction.approveRequest({ id: approvedId, detailsPage: true }),
    );
  };

  const handleRejectRequest = (
    rejectedId: number | string,
    remarks: string,
  ) => {
    dispatch(
      requestKURAction.rejectRequest({
        id: rejectedId,
        detailsPage: true,
        remarks,
      }),
    );
    formModal.closeModal();
  };

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        {/* header */}
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
                  <DetailsHeader>Request</DetailsHeader>
                  {/* <Link style={{ textDecoration: 'none' }} to="/kur/request"> */}
                  <BackButton
                    sx={{
                      '&:hover': { bgcolor: '#fff' },
                    }}
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(-1)}
                  >
                    {requestDetails?.kur_request_number}
                  </BackButton>
                </Box>
                <Box
                  display={
                    requestDetails?.status === 'pending' ? 'flex' : 'none'
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
                      if (id) handleApproveRequest(id);
                    }}
                  >
                    Approve
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* basic info */}
        <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
          <Box p="20px">
            <Box display="flex" flexDirection="column" gap="40px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
              >
                <Typography fontWeight={700} variant="h1">
                  {requestDetails?.kur_user?.name}
                </Typography>
                <CustomerStatusDetail
                  status={
                    requestDetails &&
                    requestDetails.kur_user.kur_user_credit_score.id
                      ? requestDetails.kur_user.kur_user_credit_score.id
                      : 1
                  }
                >
                  {requestDetails?.kur_user.kur_user_credit_score.name}
                </CustomerStatusDetail>
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
                    fieldContent={requestDetails?.kur_user?.user_id}
                  />

                  <CustomerData
                    icon={
                      <ErrorOutlineOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="NIK"
                    fieldContent={requestDetails?.kur_user?.nik}
                  />

                  <CustomerData
                    icon={
                      <CalendarTodayOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Birth Date"
                    fieldContent={
                      requestDetails
                        ? moment
                            .unix(requestDetails.kur_user.birth_date || 0)
                            .format('DD MMMM YYYY')
                        : '-'
                    }
                  />

                  <CustomerData
                    icon={
                      <EmailOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                    }
                    fieldName="Email"
                    fieldContent={requestDetails?.kur_user?.email}
                  />
                </ContentGrid>

                <ContentGrid>
                  <CustomerData
                    icon={
                      <CallOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                    }
                    fieldName="Phone Number"
                    fieldContent={requestDetails?.kur_user.phone_number}
                  />

                  <CustomerData
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Address (KTP)"
                    fieldContent={requestDetails?.kur_user.registered_address}
                  />

                  <CustomerData
                    icon={
                      <LocationOnOutlinedIcon
                        sx={{ color: '#008e58', mr: '4px' }}
                      />
                    }
                    fieldName="Address (Domicile)"
                    fieldContent={requestDetails?.kur_user.living_address}
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
                          requestDetails?.kur_user.credit_limit || 0,
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
                        {requestDetails?.kur_user.admin_fee}%
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
                        {requestDetails?.kur_user.dpd_rate}%
                      </FieldContent>
                    </DescriptionBox>
                  </Field>
                </ContentGrid>

                <ContentGrid>
                  <Field>
                    <DescriptionBox>
                      <FieldName>Primary Account Number</FieldName>
                      <FieldContent>
                        {requestDetails?.kur_user.user_bank} -{' '}
                        {requestDetails?.kur_user.user_account_number}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Nobu Account Number</FieldName>
                      <FieldContent>
                        NOBU - {requestDetails?.kur_user.nobu_account_number}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Join Date</FieldName>
                      <FieldContent>
                        {requestDetails
                          ? moment
                              .unix(requestDetails.kur_user.join_date || 0)
                              .format('DD MMMM YYYY hh:mm:ss A')
                          : '-'}
                      </FieldContent>
                    </DescriptionBox>
                  </Field>

                  <Field>
                    <DescriptionBox>
                      <FieldName>Request Status</FieldName>
                      <FieldContent>
                        <InvoiceStatus status={requestDetails?.status}>
                          {requestDetails?.status}
                        </InvoiceStatus>
                      </FieldContent>
                    </DescriptionBox>
                  </Field>
                </ContentGrid>
              </Box>
            </Box>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="Statement" defaultOpen>
          <Box p="20px">
            <Typography>Total Amount</Typography>
            <Amount>{digitFormatter.format(totalAmount || 0)}</Amount>
            <Table
              data={details.detailsTableData || []}
              selected={[]}
              count={details.detailParams.count}
              headCells={headCell}
              page={details.detailParams.page}
              totalData={details.totalDetailsTable}
              onChangePage={(page) => handleChangePage(page)}
            />
          </Box>
        </SubDetailsPagesWrapper>
      </Box>
      {/* modals */}
      <Modal
        open={formModal.open}
        title="Refusal Reason"
        onClose={formModal.closeModal}
      >
        <RefusalReason onSubmitRefusal={handleRejectRequest} id={id || 0} />
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
    </div>
  );
}
