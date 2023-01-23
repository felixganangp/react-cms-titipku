import { Box, Card, Grid, Button, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Face2Icon from '@mui/icons-material/Face2';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { ExpandMore } from '@mui/icons-material';
import Table from 'components/Table';
import PageNotFound from '../../../../assets/page-not-found.svg';
import {
  DetailsHeader,
  BackButton,
  Header,
  Content,
  ContentGrid,
  ProfileContainer,
  CustomerStatusDetail,
  Field,
  DescriptionBox,
  FieldName,
  FieldContent,
  RequestStatus,
  Amount,
} from '../request.styled';

interface RequestKURProps {
  id: number;
}

const data = [
  {
    id: 1,
    image: PageNotFound,
    amount: 'Rp 2,000,000.00',
    desc: 'Description here',
  },
  {
    id: 2,
    image: PageNotFound,
    amount: 'Rp 2,000,000.00',
    desc: 'Description here',
  },
  {
    id: 3,
    image: PageNotFound,
    amount: 'Rp 2,100,000.00',
    desc: 'Description here',
  },
];

export default function RequestKURDetails(props: RequestKURProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id } = props;
  const customerStatus = 3;

  const headCell = [
    {
      id: 'image',
      label: 'Image',
      align: 'left',
      format: (val) => (
        <img
          src={val.img}
          alt="statement img"
          style={{ height: '80px', width: '80px' }}
        />
      ),
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
    },
    {
      id: 'desc',
      label: 'Description',
      align: 'left',
    },
  ];

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
                  <Link style={{ textDecoration: 'none' }} to="/kur/request">
                    <BackButton
                      sx={{
                        '&:hover': { bgcolor: '#fff' },
                      }}
                      startIcon={<ArrowBack />}
                    >
                      REQ/10029312
                    </BackButton>
                  </Link>
                </Box>
                <Box
                  display="flex"
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
                  >
                    Approve
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* basic info */}
        <Header>
          <ExpandMore sx={{ mr: '5px' }} />
          <span>Basic Info</span>
        </Header>
        <Content>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            height="100%"
          >
            {/* <img
              src={<Face2Icon />}
              style={{ width: '120px', height: '120px' }}
              alt="Profile Pict"
            /> */}
            <ProfileContainer>
              <Face2Icon
                sx={{
                  backgroundColor: '#fafafa',
                  borderRadius: '50%',
                  width: '120px',
                  height: '120px',
                  border: '1px solid #626b79',
                }}
              />
              <Typography style={{ fontSize: '16px', fontWeight: 500 }}>
                Customer Name
              </Typography>
              <CustomerStatusDetail status={customerStatus}>
                Customer Status
              </CustomerStatusDetail>
            </ProfileContainer>
            <ContentGrid>
              <Field>
                <Person2OutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                <DescriptionBox>
                  <FieldName>Customer ID</FieldName>
                  <FieldContent>1892</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <ErrorOutlineOutlinedIcon
                  sx={{ color: '#008e58', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>NIK</FieldName>
                  <FieldContent>7351823736857485956</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <CalendarTodayOutlinedIcon
                  sx={{ color: '#008e58', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>Birth Date</FieldName>
                  <FieldContent>19 August 1992</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <EmailOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                <DescriptionBox>
                  <FieldName>Email</FieldName>
                  <FieldContent>customer.email@gmail.com</FieldContent>
                </DescriptionBox>
              </Field>
            </ContentGrid>

            <ContentGrid>
              <Field>
                <CallOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                <DescriptionBox>
                  <FieldName>Phone Number</FieldName>
                  <FieldContent>+62836349393</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <LocationOnOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                <DescriptionBox>
                  <FieldName>Address (KTP)</FieldName>
                  <FieldContent>
                    Foresta Business Loft 2 unit 29, Jl. BSD Raya Utama,
                    Tangerang, Banten
                  </FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <LocationOnOutlinedIcon
                  sx={{ color: 'transparent', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>Address (Domicile)</FieldName>
                  <FieldContent>
                    Foresta Business Loft 2 unit 29, Jl. BSD Raya Utama,
                    Tangerang, Banten
                  </FieldContent>
                </DescriptionBox>
              </Field>
            </ContentGrid>

            <ContentGrid>
              <Field>
                <AttachMoneyOutlinedIcon sx={{ color: '#008e58', mr: '4px' }} />
                <DescriptionBox>
                  <FieldName>Credit Limit</FieldName>
                  <FieldContent>Rp 50,000,000.00</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <AttachMoneyOutlinedIcon
                  sx={{ color: 'transparent', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>Credit Balance</FieldName>
                  <FieldContent>Rp 45,000,000.00</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <AttachMoneyOutlinedIcon
                  sx={{ color: 'transparent', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>Admin Fee</FieldName>
                  <FieldContent>4,5%</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <AttachMoneyOutlinedIcon
                  sx={{ color: 'transparent', mr: '4px' }}
                />
                <DescriptionBox>
                  <FieldName>DPD Rate</FieldName>
                  <FieldContent>2%</FieldContent>
                </DescriptionBox>
              </Field>
            </ContentGrid>

            <ContentGrid>
              <Field>
                <DescriptionBox>
                  <FieldName>Primary Account Number</FieldName>
                  <FieldContent>BCA - 293958292</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <DescriptionBox>
                  <FieldName>Nobu Account Number</FieldName>
                  <FieldContent>NOBU - 293847834442</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <DescriptionBox>
                  <FieldName>Join Date</FieldName>
                  <FieldContent>Jan, 25, 2022 08:00 AM</FieldContent>
                </DescriptionBox>
              </Field>

              <Field>
                <DescriptionBox>
                  <FieldName>Request Status</FieldName>
                  <FieldContent>
                    <RequestStatus>Pending</RequestStatus>
                  </FieldContent>
                </DescriptionBox>
              </Field>
            </ContentGrid>
          </Box>
        </Content>

        <Header>
          <ExpandMore sx={{ mr: '5px' }} />
          <span>Statement</span>
        </Header>
        <Content>
          <Typography>Total Amount</Typography>
          <Amount>11,280,200.00</Amount>
          <Table
            data={data}
            selected={[]}
            headCells={headCell}
            page={1}
            totalPage={1}
            onChangePage={(e) => console.log(e)}
          />
        </Content>
      </Box>
    </div>
  );
}
