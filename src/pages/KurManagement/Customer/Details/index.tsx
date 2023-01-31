import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import moment from 'moment';

import DescDetails from 'components/DescDetails';
import Tabs from 'components/Tabs';
import Table from 'components/Table';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import Status from 'components/Status';

import TypesIcon from 'components/Icon/Types';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import { Link, useParams } from 'react-router-dom';
import { customerAction } from 'store/slice/kur/Customer';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { TitlePage, BackButton, Menu } from './details.styled';

interface ModalImageTypes {
  open: boolean;
  filePath: string | null;
}
export default function RoleUserDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const customerKur = useAppSelector((state) => state.customerKur);
  const [kurHistoryTab, setKurHistoryTab] = useState(0);
  const [modalImage, setModalImage] = useState<ModalImageTypes>({
    open: false,
    filePath: null,
  });

  useEffect(() => {
    if (id) {
      dispatch(customerAction.fetchDataDetail({ id }));
    }
  }, []);

  const handleChangeKurHistoryTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setKurHistoryTab(newValue);
  };

  const handleViewDetailImage = (open: boolean, filePath: string | null) => {
    setModalImage({ open, filePath });
  };

  const headCell = [
    {
      id: 'id',
      label: 'Order Number',
      align: 'left',
      format: () => (
        <Typography sx={{ color: '#0774d1' }}>REQ/019221123</Typography>
      ),
    },
    {
      id: 'req_date',
      label: 'Request Date',
      align: 'left',
    },
    {
      id: 'delive_date',
      label: 'Delivery Date',
      align: 'left',
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      format: (val: any) => <Status color="#c10000">dskeke</Status>,
    },
  ];

  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Menu>Role Access Management</Menu>
              <Link style={{ textDecoration: 'none' }} to="/role-access">
                <BackButton
                  sx={{ '&:hover': { backgroundColor: '#ffff' } }}
                  startIcon={<ArrowBackIosIcon />}
                >
                  <TitlePage>Details</TitlePage>
                </BackButton>
              </Link>
            </Card>
          </Grid>
        </Grid>
        {/* BASIC INFO */}
        <SubDetailsPagesWrapper title="Basic Info" defaultOpen>
          <Box p="20px">
            <Box display="flex" mb="30px" gap="10px">
              <Typography variant="h1" fontWeight="700">
                {customerKur.details?.name}
              </Typography>
              <Status color="#c10000">Rejected</Status>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Customer ID"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.id}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Phone Number"
                  icon={<PhoneIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.phone_number}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Credit Limit"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.credit_limit}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Primary Account Number "
                  content={`${customerKur.details?.user_bank} - ${customerKur.details?.user_account_number} `}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="NIK"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.nik}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Address (KTP)"
                  icon={<LocationOnOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.registered_address}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Admin Fee"
                  content={customerKur.details?.admin_fee}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Nobu Account Number "
                  content={`NOBU - ${customerKur.details?.nobu_account_number}`}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Birth Date"
                  icon={<DateRangeRoundedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.birth_date}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Address (Domicile)"
                  content={customerKur.details?.living_address}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="DPD rate"
                  content={`${customerKur.details?.dpd_rate || '-'} %`}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Join Date"
                  // content="Jan 25, 2022 08:00 AM"
                  content={
                    customerKur.details?.join_date
                      ? moment
                          .unix(customerKur.details?.join_date)
                          .format('MMM DD, YYYY hh:mm A')
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  icon={<MailOutlineRoundedIcon sx={{ color: '#008e58' }} />}
                  title="Email"
                  content={customerKur.details?.email}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="KUR Registration Data" defaultOpen>
          <Box p="20px">
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Type KUR"
                  icon={
                    <TypesIcon sx={{ color: '#008e58', fontSize: '40px' }} />
                  }
                  content={customerKur.details?.kur_user_type.name}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Lapak Name"
                  icon={<StorefrontOutlinedIcon sx={{ color: '#008e58' }} />}
                  content={customerKur.details?.user.name}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Lapak Area"
                  content={customerKur.details?.user.area.name}
                />
              </Grid>
            </Grid>
            {/* PHOTOS OR IMAGE  */}
            <Grid container spacing={5} mt="10px">
              {customerKur.details?.kur_user_document?.map((val, i) => (
                <Grid item xs={6} md={4} key={val.id}>
                  <DescDetails
                    title={val.document_type
                      .toLocaleUpperCase()
                      .replaceAll('_', ' ')}
                    icon={
                      <AddPhotoAlternateOutlinedIcon
                        sx={{ color: '#008e58' }}
                      />
                    }
                    content={val.document_number}
                  />
                  {val.document_filepath ? (
                    <Box
                      component="img"
                      width="100%"
                      height="242px"
                      bgcolor="#cecece"
                      borderRadius="3px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        objectFit: 'contain',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        handleViewDetailImage(true, val.document_filepath);
                      }}
                      src={val.document_filepath}
                    />
                  ) : (
                    <Box
                      width="100%"
                      height="242px"
                      bgcolor="#cecece"
                      borderRadius="3px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <HideImageOutlinedIcon
                        sx={{ fontSize: '60px', color: '#ffff' }}
                      />
                    </Box>
                  )}
                </Grid>
              ))}

              {/* <Grid item xs={6} md={4}>
                <DescDetails
                  title="Kartu Keluarga C1"
                  icon={
                    <AddPhotoAlternateOutlinedIcon sx={{ color: '#008e58' }} />
                  }
                  content="7162348761287236"
                />
                <Box
                  width="100%"
                  height="242px"
                  bgcolor="#cecece"
                  borderRadius="3px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <HideImageOutlinedIcon
                    sx={{ fontSize: '60px', color: '#ffff' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <DescDetails
                  title="NPWP Image"
                  icon={
                    <AddPhotoAlternateOutlinedIcon sx={{ color: '#008e58' }} />
                  }
                  content="809895501002000"
                />
                <Box
                  width="100%"
                  height="242px"
                  bgcolor="#cecece"
                  borderRadius="3px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <HideImageOutlinedIcon
                    sx={{ fontSize: '60px', color: '#ffff' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <DescDetails
                  title="NPWP Image"
                  icon={
                    <AddPhotoAlternateOutlinedIcon sx={{ color: '#008e58' }} />
                  }
                  content="809895501002000"
                />
                <Box
                  width="100%"
                  height="242px"
                  bgcolor="#cecece"
                  borderRadius="3px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <HideImageOutlinedIcon
                    sx={{ fontSize: '60px', color: '#ffff' }}
                  />
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <SubDetailsPagesWrapper title="KUR Registration Data" defaultOpen>
          <Box p="20px">
            <Tabs.Container
              value={kurHistoryTab}
              onChange={handleChangeKurHistoryTab}
              aria-label="basic tabs example"
              variant="fullWidth"
              sx={{ mb: 1 }}
            >
              <Tabs.Item label="Rejected" />
              <Tabs.Item label="Settlement" />
              <Tabs.Item label="Invoice" />
            </Tabs.Container>
            <Table
              data={[
                {
                  order_id: 11111,
                },
              ]}
              headCells={headCell}

              // handleRequestSort={(e) => {
              //   setOrderBy(e.orderBy);
              //   setOrderType(e.orderType);
              // }}
              // orderType={orderType}
              // orderBy={orderBy}
            />
          </Box>
        </SubDetailsPagesWrapper>
        <Modal
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
        </Modal>
      </Box>
    </div>
  );
}

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
