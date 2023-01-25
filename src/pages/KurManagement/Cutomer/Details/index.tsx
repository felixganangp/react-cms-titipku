import React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import DescDetails from 'components/DescDetails';
import Tabs from 'components/Tabs';
import Table from 'components/Table';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import Status from 'components/Status';

import TypesIcon from 'components/Icon/Types';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import { TitlePage, BackButton, Menu } from './details.styled';

export default function RoleUserDetails() {
  const [kurHistoryTab, setKurHistoryTab] = React.useState(0);

  const handleChangeKurHistoryTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setKurHistoryTab(newValue);
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
                Dea Delavena
              </Typography>
              <Status color="#c10000">Rejected</Status>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Customer ID"
                  icon={<Person2OutlinedIcon sx={{ color: '#008e58' }} />}
                  content="1289"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Phone Number"
                  icon={<PhoneIcon sx={{ color: '#008e58' }} />}
                  content="+628991241235"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Credit Limit"
                  icon={<AttachMoneyIcon sx={{ color: '#008e58' }} />}
                  content="+628991241235"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="Credit Limit" content="+628991241235" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="NIK"
                  icon={<InfoOutlinedIcon sx={{ color: '#008e58' }} />}
                  content="UJANG888"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Address (KTP)"
                  icon={<LocationOnOutlinedIcon sx={{ color: '#008e58' }} />}
                  content="Jalan H Bahri no 12 RT 12 RW 4 Kebayoran, Jakarta Serlatan"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="Admin Fee" content="4,5%" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Nobu Account Number "
                  content="NOBU - 293958292"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Birth Date"
                  icon={<DateRangeRoundedIcon sx={{ color: '#008e58' }} />}
                  content="19 August 1994"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Address (Domicile)"
                  content="Jalan H Bahri no 12 RT 12 RW 4 Kebayoran, Jakarta Serlatan"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="DPD rate" content="2%" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Join Date"
                  content="Jan 25, 2022 08:00 AM"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  icon={<MailOutlineRoundedIcon sx={{ color: '#008e58' }} />}
                  title="Join Date"
                  content="Jan 25, 2022 08:00 AM"
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
                  content="1289"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Lapak Name"
                  icon={<StorefrontOutlinedIcon sx={{ color: '#008e58' }} />}
                  content="Lapak B-12"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Lapak Area"
                  content="Pasar Modern Sinpasa"
                />
              </Grid>
            </Grid>
            {/* PHOTOS OR IMAGE  */}
            <Grid container spacing={5} mt="10px">
              <Grid item xs={6} md={4}>
                <DescDetails
                  title="KTP Image"
                  icon={
                    <AddPhotoAlternateOutlinedIcon sx={{ color: '#008e58' }} />
                  }
                  content="730823505910001"
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
              </Grid>
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
      </Box>
    </div>
  );
}
