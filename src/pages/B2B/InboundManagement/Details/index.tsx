/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable guard-for-in */
import React, { useEffect, useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import { InboundAction } from 'store/slice/b2b/Inbound';
import Table from 'components/Table';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DescDetails from 'components/DescDetails';
import Grid from '@mui/material/Grid';
import digitFormatter from 'utils/digitFormatter';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { debounce } from 'lodash';
import { Button, Typography } from '@mui/material';
import NoImage from 'assets/no-image.svg';
import {
  TitleWrapper,
  ContentWrapper,
  Title,
  BoxTable,
} from './details.styled';

interface InboundDetailProps {
  open: boolean;
  onClose(): void;
  ids: string;
}

export default function InboundDetailPopUp(props: InboundDetailProps) {
  const { open, onClose, ids } = props;
  const dispatch = useAppDispatch();
  const inbound = useAppSelector((state) => state.inbound);
  console.log('detail', ids, inbound.detailsData);

  useEffect(() => {
    dispatch(InboundAction.fetchDataDetail({ id: ids }));
  }, []);

  const headCell = [
    {
      id: 'product_name',
      label: 'Product/SKU',
      align: 'left',
      format: (val: any) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="24px"
        >
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NoImage;
            }}
            src={val.product_image}
            style={{ height: '48px', width: '48px', borderRadius: '50%' }}
            alt={val.product_name}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            gap="8px"
          >
            <Typography>{val.product_name}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'supplier_price',
      label: 'Supplier Price',
      align: 'left',
      format: (val: any) => (
        <Typography>Rp {digitFormatter.format(val.supplier_price)}</Typography>
      ),
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'left',
      format: (val: any) => (
        <Typography>
          {val.quantity} {val.unit_measurement}
        </Typography>
      ),
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      maxWidth="md"
      fullWidth
    >
      <TitleWrapper>
        <Title data-testid="role-access-form-title">Inbound Details</Title>
        <CloseIcon
          onClick={() => {
            onClose();
          }}
        />
      </TitleWrapper>
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <DescDetails
              title="Supplier Name"
              content={inbound.detailsData?.supplier.name}
              color="#0661ae"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <DescDetails
              title="Inbound Date"
              content={moment
                .unix(Number(inbound.detailsData?.created_at))
                .format('DD/MM/YYYY')}
              color="#0661ae"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <DescDetails
              title="InBound Code/Number"
              content={inbound.detailsData?.code}
              color="#0661ae"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <DescDetails
              title="Description"
              content={inbound.detailsData?.description}
              color="#0661ae"
            />
          </Grid>
        </Grid>
        <BoxTable>
          <Table
            data={inbound.detailsData?.purchase_detail}
            headCells={headCell}
            loading={inbound.loading}
            disablePagination
          />
        </BoxTable>
      </ContentWrapper>
    </Dialog>
  );
}
