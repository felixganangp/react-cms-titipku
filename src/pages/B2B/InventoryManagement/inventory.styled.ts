/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Box, Card } from '@mui/material';

interface GradingProps {
  grade: number;
}

interface StatusProps {
  status: number;
}

interface CircleBoxProps {
  display: string;
  activeDashboard: string | undefined;
  width: string;
  height: string;
}

interface TotalStockProps {
  activeDashboard: string | undefined;
  bottom?: string;
  left?: string;
  height?: string;
  width?: string;
}

interface BackButtonProps {
  display: string;
}

export const GradingColor = styled(Box)<Pick<GradingProps, 'grade'>>`
  border-radius: 4px;
  width: fit-content;
  height: fit-content;
  padding: 4px;
  background-color: ${(p) =>
    p.grade === 2 ? '#aad9c7' : p.grade === 3 ? '#ffeeac' : '#f9ebe7'};
  color: ${(p) =>
    p.grade === 2 ? '#005f3b' : p.grade === 3 ? '#aa8803' : '#d27355'};
`;

export const CategoryStyle = styled(Box)`
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

export const CardContainer = styled(Card)`
  padding: 0;
  border-radius: 0;
  box-shadow: 0;
  border: 1px solid #e4e4e4;
`;

export const CircleContainer = styled(Box)<
  Pick<CircleBoxProps, 'display' | 'activeDashboard' | 'width' | 'height'>
>`
  display: ${(p) => p.display};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  border-radius: 50%;
  background-color: ${(p) =>
    p.activeDashboard === 'empty_stock' ? '#d9876d' : '#f7bb47'};
  position: relative;
`;

export const CircleTotalStock = styled(Box)<
  Pick<TotalStockProps, 'activeDashboard'>
>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: -10%;
  right: -4%;
  z-index: 5;
  background-color: ${(p) =>
    p.activeDashboard === 'empty_stock' ? '#bf370c' : '#a57d2f'};
  border-radius: 50%;
  height: 24px;
  min-width: 24px;
  max-width: fit-content;
  position: absolute;
  padding: 4px 3px 2px 2px;
  font-size: 16px;
  color: #fff;
`;

export const MiniCircleOnIcon = styled(Box)<
  Pick<
    TotalStockProps,
    'activeDashboard' | 'bottom' | 'left' | 'height' | 'width'
  >
>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: ${(p) => p.bottom};
  left: ${(p) => p.left};
  z-index: 5;
  background-color: ${(p) =>
    p.activeDashboard === 'empty_stock' ? '#bf370c' : '#a57d2f'};
  border-radius: 50%;
  height: ${(p) => p.height};
  width: ${(p) => p.width};
  position: absolute;
`;

export const BackButton = styled(Box)<Pick<BackButtonProps, 'display'>>`
  display: ${(p) => p.display};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 2px 1px;
  border-radius: 4px;
  :hover {
    background-color: #e4e4e4;
  }
`;

export const DashboardContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15px;
  width: 50%;
  border-right: 1px solid #e4e4e4;
  padding: 10.5px 16px;
  :hover {
    background-color: #f8f8f8;
  }
  cursor: pointer;
`;

export const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
