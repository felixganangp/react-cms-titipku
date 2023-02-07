import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Status from 'components/Status';
import Table from 'components/Table';
import DescDetails from 'components/DescDetails';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Link, useParams } from 'react-router-dom';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import { TitlePage, BackButton, Menu } from './details.styled';

export default function DetailsInvoice() {
  const { id } = useParams();

  const HeadCells = [
    {
      id: 'payment',
      label: 'No. Payment',
      align: 'left',
      enableSort: true,
      format: () => {
        return (
          <Link to="/" style={{ textDecoration: 'none', color: '#0774d1' }}>
            INV/192323934
          </Link>
        );
      },
    },
    {
      id: 'paid_date',
      label: 'Paid Date',
      align: 'left',
      enableSort: true,
      format: () => {
        return (
          <Box>
            <Typography fontSize="14px">Feb 4, 2022</Typography>
            <Typography fontSize="12px">10.00 </Typography>
          </Box>
        );
      },
    },
    {
      id: 'paid_date',
      label: 'Paid Date',
      align: 'left',
      format: () => {
        return (
          <Box>
            <Typography fontSize="14px">Feb 4, 2022</Typography>
            <Typography fontSize="12px">10.00 </Typography>
          </Box>
        );
      },
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
      format: () => {
        return <Typography fontSize="14px">Rp 230,000.00</Typography>;
      },
    },
  ];
  return (
    <div>
      <Box p="20px" bgcolor="#F5F7FA">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Menu>Invoice Detail</Menu>
                  <Link style={{ textDecoration: 'none' }} to="/kur/invoice">
                    <BackButton
                      sx={{ '&:hover': { backgroundColor: '#ffff' } }}
                      startIcon={<ArrowBackIosIcon />}
                    >
                      <TitlePage>Details</TitlePage>
                    </BackButton>
                  </Link>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <SubDetailsPagesWrapper title="Request" defaultOpen>
          <Box p="20px">
            <Box display="flex" mb="30px" gap="10px">
              <Typography variant="h1" fontWeight="700">
                Dea Delavena
              </Typography>
              <Status color="#c10000">Macet</Status>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails title="Invoice Date" content="January 10, 2022" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="Due Date" content="January 10, 2022" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Request Amount"
                  content="Rp 20,000,000.00"
                />
              </Grid>
              <Grid item xs={6} md={3} />
              <Grid item xs={6} md={3}>
                <DescDetails title="Admin Fee" content="Rp 20,000,000.00" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="DPD Amount" content="Rp 20,000,000.00" />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails title="DPD Amount" content="Rp 20,000,000.00" />
              </Grid>
              <Grid item xs={6} md={3} />
              <Grid item xs={6} md={3}>
                <DescDetails title="Request Number" content="REQ/019221123" />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>
        <SubDetailsPagesWrapper title="Settlement" defaultOpen>
          <Box p="20px">
            <Table headCells={HeadCells} data={[1, 2, 2, 2]} />
          </Box>
        </SubDetailsPagesWrapper>
      </Box>
    </div>
  );
}
