/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Box } from '@mui/material';

interface GradingProps {
  grade: string;
}

interface StatusProps {
  status: number;
}

export const GradingColor = styled(Box)<Pick<GradingProps, 'grade'>>`
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  padding: 4px;
  background-color: ${(p) =>
    p.grade === 'A' ? '#aad9c7' : p.grade === 'B' ? '#ffeeac' : '#f9ebe7'};
  color: ${(p) =>
    p.grade === 'A' ? '#005f3b' : p.grade === 'B' ? '#aa8803' : '#d27355'};
`;

export const Category = styled(Box)`
  width: fit-content;
  height: fit-content;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #e4e4e4;
`;

export const StatusColor = styled(Box)<Pick<StatusProps, 'status'>>`
  width: 115px;
  height: fit-content;
  text-align: center;
  font-weight: 500;
  color: #fff;
  padding: 10px 0;
  background-color: ${(p) =>
    p.status === 0
      ? '#e4e4e4'
      : p.status === 1
      ? '#c54b24'
      : p.status === 2
      ? '#f7bb47'
      : '#269946'};
  border-radius: 4px;
  text-align: center;
`;
