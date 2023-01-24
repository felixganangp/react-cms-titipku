import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import React from 'react';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import AccordionOnDetails from 'components/Accordion/Details';
import DescDetails from 'components/DescDetails';
import Table from 'components/Table';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';

import FileDownload from 'assets/file-download-outline.svg';

import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import {
  TitleWrapper,
  ContentWrapper,
  TableWrapper,
  TitlePage,
  ContentGrid,
  FieldBox,
  DescriptionBox,
  BackButton,
  FieldName,
  FieldContent,
  Menu,
  TablesProperty,
  Search,
  DownloadButton,
} from './details.styled';

interface RoleUserDetailsProps {
  id: number;
}

export default function RoleUserDetails(props: RoleUserDetailsProps) {
  const { id } = props;

  const contentOfTable = [
    {
      name: 'Full Name 1',
      email: 'full.name@titipku.com',
      lastUpdate: 'January 8, 2022 12.00 AM',
    },
  ];

  const headOfTable = [
    {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
    {
      id: 'email',
      label: 'Email Address',
      align: 'left',
    },
    {
      id: 'lastUpdate',
      label: 'Last Update',
      align: 'left',
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
          <Box p="15px">
            <Grid container>
              <Grid item xs={12} md={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <AccountCircleRoundedIcon
                    sx={{ color: '#cecece', fontSize: '120px' }}
                  />
                  <Typography fontWeight="500" fontSize="25">
                    No Name
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={10}>
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
                      icon={
                        <LocationOnOutlinedIcon sx={{ color: '#008e58' }} />
                      }
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
                      icon={
                        <MailOutlineRoundedIcon sx={{ color: '#008e58' }} />
                      }
                      title="Join Date"
                      content="Jan 25, 2022 08:00 AM"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>

        <TitleWrapper>
          <ExpandMore sx={{ marginRight: '5px' }} />
          <span>Basic Info</span>
        </TitleWrapper>
        <ContentWrapper>
          <ContentGrid container spacing={1}>
            <FieldBox>
              <Person2OutlinedIcon sx={{ color: '#008e58' }} />
              <DescriptionBox>
                <FieldName>ID</FieldName>
                <FieldContent>1</FieldContent>
              </DescriptionBox>
            </FieldBox>

            <FieldBox>
              <Person2OutlinedIcon sx={{ color: '#008e58' }} />
              <DescriptionBox>
                <FieldName>Role Access Name</FieldName>
                <FieldContent>Super Admin</FieldContent>
              </DescriptionBox>
            </FieldBox>

            <FieldBox>
              <Person2OutlinedIcon sx={{ color: '#008e58' }} />
              <DescriptionBox>
                <FieldName>User</FieldName>
                <FieldContent>10</FieldContent>
              </DescriptionBox>
            </FieldBox>
          </ContentGrid>
        </ContentWrapper>

        <TitleWrapper>
          <ExpandMore sx={{ marginRight: '5px' }} />
          <span>Role User List</span>
        </TitleWrapper>
        <TableWrapper>
          <TablesProperty>
            <Search
              placeholder="Search for name or email"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DownloadButton>
              <img
                style={{ width: '24px', height: '24px' }}
                src={FileDownload}
                alt="Download data"
              />
            </DownloadButton>
          </TablesProperty>
          <Table
            data={contentOfTable}
            selected={[]}
            headCells={headOfTable}
            page={1}
            totalPage={1}
            onChangePage={(e) => console.log(e)}
            enableCheckBox
          />
        </TableWrapper>
      </Box>
    </div>
  );
}
