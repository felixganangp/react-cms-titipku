/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Table from 'components/Table';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccordionOnDetails from 'components/Accordion/SubDetailsPagesWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import bankData from 'data/list-bank.json';

import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import Label from 'components/Label';
import MenuList from 'components/MenuList';
import { base64toOpen } from 'utils/base64toDownload';
import Modal from 'components/Modal';
import { InvoiceListType } from 'models/finance/invoice';

import {
  UseGetInvoicePDF,
  useInvoiceDetails,
} from '../hooks/useInvoiceService';
import {
  useGetSettlements,
  usePaymentDetails,
} from '../hooks/usePaymentService';

export default function InvoiceDetails() {
  const navigate = useNavigate();
  const { idPayment } = useParams();
  const invoiceDetails = useInvoiceDetails(idPayment);
  const payment = usePaymentDetails(idPayment);
  const settlementQuery = useGetSettlements({
    payment_id: idPayment,
  });

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography color="#626B79">Payment Detail</Typography>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="titlePage">
                  {payment.details?.payment_number}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
        <AccordionOnDetails defaultOpen title="Invoice">
          <Card>
            <Typography variant="h2" fontWeight="bold">
              {payment.details?.user.merchant_name}
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6} sm={9}>
                <Grid container spacing={2}>
                  <Grid item sm={4}>
                    <Typography color="primary">Payment Date</Typography>
                    <Typography>
                      {moment(
                        (payment.details?.payment_date || 0) * 1000,
                      ).format('MMMM DD, YYYY')}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Amount Payment</Typography>
                    <Typography>
                      Rp {numberSeperator(payment.details?.amount || 0)}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <div> </div>
                  </Grid>

                  <Grid item sm={4}>
                    <Typography color="primary">Proof Image</Typography>
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
                        // handleViewDetailImage(true, val.document_filepath);
                      }}
                      src={payment.details?.proof_of_payment}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </AccordionOnDetails>
        <AccordionOnDetails defaultOpen title="Settlement">
          <Card>
            <Table
              headCells={[
                {
                  id: 'id',
                  label: 'No Payment',
                  format: (val: any) => {
                    return (
                      <Typography color="info.main" sx={{ cursor: 'pointer' }}>
                        {val.payment?.payment_number}
                      </Typography>
                    );
                  },
                },
                {
                  id: 'paid',
                  label: 'Paid Date',
                  format: (val: any) => {
                    return (
                      <Box>
                        <Typography>
                          {moment(
                            (val.payment?.payment_date || 0) * 1000,
                          ).format('MMMM DD, YYYY')}
                        </Typography>
                        <Typography variant="caption">
                          {moment(
                            (val.payment?.payment_date || 0) * 1000,
                          ).format('HH:mm')}
                        </Typography>
                      </Box>
                    );
                  },
                },
                {
                  id: 'amount',
                  label: 'Amount',
                  format: (val: any) => {
                    return (
                      <Typography>
                        Rp {numberSeperator(val?.amount || 0)}
                      </Typography>
                    );
                  },
                },
                {
                  id: 'object',
                  label: 'Object',
                  format: (val: any) => {
                    return (
                      <Typography>{val.payment_component.name}</Typography>
                    );
                  },
                },
              ]}
              data={settlementQuery.listData || []}
              loading={settlementQuery.isLoading}
              page={settlementQuery.params.page}
              count={settlementQuery.data?.count || 0}
              totalData={settlementQuery.data?.total || 0}
              onChangePage={(e) => {
                settlementQuery.handleChangeParams({
                  ...settlementQuery.params,
                  page: e,
                });
              }}
            />
          </Card>
        </AccordionOnDetails>
      </Stack>
    </Box>
  );
}
