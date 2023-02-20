import * as React from 'react';
import SubDetailsPagesWrapper from 'components/Accordion/SubDetailsPagesWrapper';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { paymentKURAction } from 'store/slice/kur/Payment';
import { useEffect } from 'react';
import Table from 'components/Table';
import { Customer } from 'models/kur/Customer';
import { HeadCells } from 'components/Table/types';
import { ExpandMore } from '@mui/icons-material';
import { Content, Header } from '../payment.styled';

interface KURCustomerProps {
  onClose: (customer: Customer) => void;
}

export default function KurCustomer({ onClose }: KURCustomerProps) {
  const dispatch = useAppDispatch();
  const payment = useAppSelector((state: any) => state.payment);

  useEffect(() => {
    dispatch(paymentKURAction.fetchCustomerData(payment.customerParams));
  }, [
    payment.customerParams.search,
    payment.customerParams.order_by,
    payment.customerParams.order_type,
  ]);

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      paymentKURAction.setCustomerDataParams({
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  const handleSearch = (value: string) => {
    dispatch(
      paymentKURAction.setCustomerDataParams({
        search: value,
      }),
    );
  };

  const handleChooseCustomer = (customer: Customer) => {
    onClose(customer);
  };

  const headCell: HeadCells<Customer>[] = [
    {
      id: 'id',
      label: 'ID',
      align: 'left',
      enableSort: true,
      width: '25px',
    },
    {
      id: 'name',
      label: 'Name',
      align: 'left',
      width: '25%',
      enableSort: true,
    },
    {
      id: 'kur_user_type',
      label: 'KUR Type',
      align: 'left',
      width: '95px',
      format: (val) => <div>{val.kur_user_type.name}</div>,
      enableSort: true,
    },
    {
      id: 'merchant',
      label: 'Merchant',
      align: 'left',
      width: '25%',
      format: (val) => <div>{val.user.name}</div>,
    },
    {
      id: 'pasar',
      label: 'Pasar',
      align: 'left',
      width: '25%',
      format: (val) => <div>{val.user.area.name}</div>,
    },
    {
      id: 'action',
      label: 'Action',
      align: 'center',
      width: '20px',
      format: (val: Customer) => (
        <Button
          disabled={
            payment.selectedCustomer && payment.selectedCustomer.id === val.id
          }
          onClick={() => handleChooseCustomer(val)}
        >
          Choose
        </Button>
      ),
    },
  ];

  const childModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
  };

  return (
    <Box sx={{ ...childModalStyle, width: '80%', height: '720px' }}>
      <Header>
        <ExpandMore sx={{ mr: '5px' }} />
        <span>Payment</span>
      </Header>
      <Content>
        <TextField
          placeholder="Search Name"
          size="small"
          sx={{ bgcolor: '#fafafa', width: '100%', marginBottom: '10px' }}
          fullWidth
          defaultValue={payment.customerParams.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Box
          bgcolor="#fff"
          p="7px"
          borderRadius="5px"
          boxShadow="0 3px 10px 0 rgba(0, 0, 0, 0.1)"
          overflow="auto"
          height="90%"
        >
          <Table
            data={payment.customersData}
            headCells={headCell}
            disablePagination
            totalData={payment.customersTotal}
            count={payment.customerParams.count}
            orderBy={payment.customerParams.order_by}
            orderType={payment.customerParams.order_type}
            onChangeSort={(val) => handleChangeSort(val)}
            disableNumber
            loading={payment.loading}
          />
        </Box>
      </Content>
    </Box>
  );
}
