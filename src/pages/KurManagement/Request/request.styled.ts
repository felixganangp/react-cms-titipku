/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Typography, Box, Button } from '@mui/material';

interface CustomerStatusProps {
  status: number;
}

interface InvoiceStatusProps {
  status: number;
}

export const InvoiceLabel = styled(Typography)`
  color: #0774d1;
`;
export const CustomerStatus = styled.div<Pick<CustomerStatusProps, 'status'>>`
  border-radius: 50%;
  width: 8px !important;
  height: 8px !important;
  background-color: ${(p) =>
    p.status === 1
      ? '#008E58'
      : p.status === 2
      ? '#0774D1'
      : p.status === 3
      ? '#FF8F00'
      : '#C10000'};
  margin-right: 5px;
  margin-left: 2px;
`;

export const RowBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
`;

export const InvoiceStatus = styled(Box)<Pick<InvoiceStatusProps, 'status'>>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  color: #fff;
  background-color: ${(p) =>
    p.status === 1 ? '#FF8F00' : p.status === 2 ? '#008E58' : '#C10000'};
  border-radius: 10px;
  width: 80px;
  font-size: 12px;
`;

export const FilterButton = styled(Button)`
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
`;

export const FilterDataBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  height: fit-content;
`;
