/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Typography, Box, Button, Grid } from '@mui/material';
import { DayPicker } from 'react-day-picker';
import { getColorCreditScore } from '../../../utils/creditScoreColor';

interface CustomerStatusProps {
  status: number;
}

interface InvoiceStatusProps {
  status: string | undefined;
}

export const InvoiceLabel = styled(Typography)`
  color: #0774d1;
`;
export const CustomerStatus = styled.div<Pick<CustomerStatusProps, 'status'>>`
  width: 8px;
  height: 8px;
  flex-grow: 0;
  transform: rotate(-180deg);
  border-radius: 50%;
  background-color: ${(p) => getColorCreditScore(p.status)};
  margin-right: 10px;
  margin-left: 2px;
`;

export const RowBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
`;

export const InvoiceStatus = styled(Typography)<
  Pick<InvoiceStatusProps, 'status'>
>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  color: #fff;
  background-color: ${(p) =>
    p.status === 'pending'
      ? '#FF8F00'
      : p.status === 'approved'
      ? '#008E58'
      : '#C10000'};
  border-radius: 10px;
  width: 80px;
  font-size: 12px;
  font-weight: 500;
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

// details

export const DetailsHeader = styled(Typography)`
  font-size: 16px;
  color: #626b79;
  font-weight: 400;
`;

export const BackButton = styled(Button)`
  background-color: transparent;
  color: #232933;
  font-size: 20px;
`;

export const Header = styled(Box)`
  display: flex;
  background-color: #626b79;
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  color: #fff;
`;

export const Content = styled(Box)`
  padding: 16px 30px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const ContentGrid = styled(Box)`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  height: 100%;
`;

export const ColumnGrid = styled(Grid)`
  display: flex;
`;

export const ProfileContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

export const CustomerName = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
`;

export const CustomerStatusDetail = styled.div<
  Pick<CustomerStatusProps, 'status'>
>`
  margin-left: 16px;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
  background-color: ${(p) => getColorCreditScore(p.status)};
`;

export const Field = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-right: 10%;
`;

export const DescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FieldName = styled(Typography)`
  color: #008e58;
`;

export const FieldContent = styled(Typography)`
  font-weight: 500;
  color: #626b79;
`;

export const RequestStatus = styled(Box)`
  background-color: #ff8f00;
  padding: 4px 10px;
  border-radius: 10px;
  color: #fff;
`;

export const Amount = styled(Typography)`
  font-weight: 500;
  font-size: 24px;
  color: #17231d;
  margin-bottom: 16px;
`;

export const DateButton = styled(Button)`
  width: 150px;
`;
