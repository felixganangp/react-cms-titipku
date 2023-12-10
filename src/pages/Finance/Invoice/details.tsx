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

import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import Label from 'components/Label';
import MenuList from 'components/MenuList';
import { base64toOpen } from 'utils/base64toDownload';
import Modal from 'components/Modal';
import { InvoiceListType } from 'models/finance/invoice';

import { s } from 'vitest/dist/index-220c1d70';
import FormSetManualSettled from './Components/FormSetManualSettled';
import {
  UseGetInvoicePDF,
  useInvoiceDetails,
} from '../hooks/useInvoiceService';
import { useGetSettlements } from '../hooks/usePaymentService';

export default function InvoiceDetails() {
  const navigate = useNavigate();
  const { idInvoice } = useParams();
  const invoiceDetails = useInvoiceDetails(idInvoice);
  const getInoivcePDF = UseGetInvoicePDF();
  const settlementQuery = useGetSettlements({
    invoice_id: idInvoice,
  });
  const [modalTypeSetManualSettled, setModalTypeSetManualSettled] = useState<
    number | null
  >(null);

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
              <Typography color="#626B79">Invoice Detail</Typography>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate('/finance/invoice')}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="titlePage">
                  {invoiceDetails.details?.invoice_number ||
                    `INV/${moment(
                      (invoiceDetails.details?.created_at || 0) * 1000,
                    ).format('YYYY')}/${
                      invoiceDetails.details?.user?.user_number
                    }/${invoiceDetails.details?.id}`}
                </Typography>
              </Stack>
            </Stack>
            <MenuList
              menu={[
                {
                  label: 'Cut Loss',
                  onClick: () => {
                    setModalTypeSetManualSettled(1);
                  },
                },
                {
                  label: 'Memo Internal',
                  onClick: () => {
                    setModalTypeSetManualSettled(2);
                  },
                },
                {
                  label: 'Restructure',
                  onClick: () => {
                    setModalTypeSetManualSettled(3);
                  },
                },
                {
                  label: 'Generate PDF',
                  onClick: () => {
                    getInoivcePDF.mutate(
                      // @ts-ignore
                      invoiceDetails?.details.id.toString(),
                      {
                        onSuccess: (data) => {
                          base64toOpen(
                            data.data,
                            // @ts-ignore
                            `${invoiceDetails?.details.invoice_number}.pdf`,
                          );
                        },
                        onError: (error) => {},
                      },
                    );
                  },
                },
              ]}
            >
              <Button endIcon={<KeyboardArrowDownIcon />}>Action</Button>
            </MenuList>
          </Stack>
        </Card>
        <AccordionOnDetails defaultOpen title="Invoice">
          <Card>
            <Typography variant="h2" fontWeight="bold">
              {invoiceDetails.details?.user.merchant_name}
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6} sm={9}>
                <Grid container spacing={2}>
                  <Grid item sm={4}>
                    <Typography color="primary">Invoice Date</Typography>
                    <Typography>
                      {moment(
                        (invoiceDetails.details?.transfer_date || 0) * 1000,
                      ).format('MMMM DD, YYYY')}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Interest per Today</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(
                        invoiceDetails.details?.interest_per_today || 0,
                      )}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Invoice Amount</Typography>
                    <Typography>
                      Rp {numberSeperator(invoiceDetails.details?.amount || 0)}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Due Date</Typography>
                    <Typography>
                      {moment(
                        (invoiceDetails.details?.due_date || 0) * 1000,
                      ).format('MMMM DD, YYYY')}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Expected Interest</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(
                        invoiceDetails.details?.expected_interest || 0,
                      )}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Paid Amount</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(
                        invoiceDetails.details?.paid_amount || 0,
                      )}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Admin Fee</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(invoiceDetails.details?.admin_fee || 0)}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">DPD Amount</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(invoiceDetails.details?.dpd_amount || 0)}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Outstanding Amount</Typography>
                    <Typography>
                      Rp{' '}
                      {numberSeperator(
                        invoiceDetails.details?.outstanding_amount || 0,
                      )}
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <Typography color="primary">Note Image</Typography>
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
                      src={invoiceDetails.details?.nota_image}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography color="primary">Status</Typography>
                <Label
                  variant="filled"
                  color={
                    invoiceDetails.details?.status === 'Late'
                      ? 'error'
                      : invoiceDetails.details?.status === 'On Schedule'
                      ? 'success'
                      : 'info'
                  }
                >
                  {invoiceDetails.details?.status}
                </Label>
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
                  label: 'Paid Data',
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
                        Rp {numberSeperator(val.payment?.amount || 0)}
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
      <Modal
        open={Boolean(modalTypeSetManualSettled)}
        title={
          modalTypeSetManualSettled === 1
            ? 'Cut Loss'
            : modalTypeSetManualSettled === 2
            ? 'Memo Internal'
            : modalTypeSetManualSettled === 3
            ? 'Restructure'
            : 'Set Manual lunas'
        }
        onClose={() => setModalTypeSetManualSettled(null)}
      >
        <FormSetManualSettled
          typeId={modalTypeSetManualSettled || 0}
          invoiceDetail={
            // @ts-ignore
            ({
              ...invoiceDetails.details,
            } as InvoiceListType) || ({} as InvoiceListType)
          }
          onClose={() => setModalTypeSetManualSettled(null)}
        />
      </Modal>
    </Box>
  );
}
