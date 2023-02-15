import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Status from 'components/Status';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import DescDetails from 'components/DescDetails';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import digitFormatter from 'utils/digitFormatter';
import moment from 'moment';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { invoiceKurAction } from 'store/slice/kur/Invoice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { InvoiceKurDetail } from 'models/kur/Invoice';

import { TitlePage, BackButton, Menu } from './details.styled';

const colorStatusUser = (string: string | undefined) => {
  let color = '#cecece';
  if (string === 'Active') {
    color = '#008e58';
  }
  if (string === 'Inactive') {
    color = '#c10000';
  }

  return color;
};
export default function DetailsInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice.details);

  useEffect(() => {
    if (id) {
      dispatch(invoiceKurAction.fetchDataDetail({ id }));
    }
  }, []);

  const headCells: HeadCells<InvoiceKurDetail>[] = [
    {
      id: 'payment',
      label: 'No. Payment',
      align: 'left',
      enableSort: true,
      format: (val) => {
        return (
          <Typography
            sx={{ color: '#0774d1', cursor: 'pointer' }}
            onClick={() => navigate(`/kur/payment/${val.id}`)}
          >
            {val.kur_payment.kur_payment_number || '-'}
          </Typography>
        );
      },
    },
    {
      id: 'paid_date',
      label: 'Paid Date',
      align: 'left',
      format: (val) => {
        return (
          <Box>
            <Typography fontSize="14px">
              {moment.unix(val.created_at).format('MMM DD, YYYY')}
            </Typography>
            <Typography fontSize="12px">
              {moment.unix(val.created_at).format('hh:mm')}
            </Typography>
          </Box>
        );
      },
    },
    {
      id: 'amount',
      label: 'Amount',
      align: 'left',
      format: (val) => {
        return (
          <Typography fontSize="14px">
            Rp {digitFormatter.format(val.kur_payment.amount || 0)}
          </Typography>
        );
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
                {invoice?.kur_request.kur_user.name}
              </Typography>
              <Status
                color={colorStatusUser(
                  invoice?.kur_request.kur_user.kur_user_status.name,
                )}
              >
                {invoice?.kur_request.kur_user.kur_user_status.name || '-'}
              </Status>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Invoice Date"
                  content={
                    invoice?.release_date
                      ? moment
                          .unix(invoice.release_date)
                          .format('MMMM DD, YYYY')
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Due Date"
                  content={
                    invoice?.due_date
                      ? moment.unix(invoice.due_date).format('MMMM DD, YYYY')
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Request Amount"
                  content={`Rp ${digitFormatter.format(
                    invoice?.request_amount || 0,
                  )}`}
                />
              </Grid>
              <Grid item xs={6} md={3} />
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Admin Fee"
                  content={`Rp ${digitFormatter.format(
                    invoice?.admin_fee || 0,
                  )}`}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="DPD Amount"
                  content={`Rp ${digitFormatter.format(
                    invoice?.total_dpd || 0,
                  )}`}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Invoice Amount"
                  content={`Rp ${digitFormatter.format(
                    invoice?.total_payment || 0,
                  )}`}
                />
              </Grid>
              <Grid item xs={6} md={3} />
              <Grid item xs={6} md={3}>
                <DescDetails
                  title="Request Number"
                  content={invoice?.kur_request.kur_request_number}
                />
              </Grid>
            </Grid>
          </Box>
        </SubDetailsPagesWrapper>
        <SubDetailsPagesWrapper title="Settlement" defaultOpen>
          <Box p="20px">
            <Table
              headCells={headCells}
              data={invoice?.kur_invoice_Detail || []}
            />
          </Box>
        </SubDetailsPagesWrapper>
      </Box>
    </div>
  );
}
