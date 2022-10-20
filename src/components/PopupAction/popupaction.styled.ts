/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';

interface SubmitButtonProps {
  isGreenButton: boolean;
}

interface CancelButtonProps {
  isGreenFont: boolean;
}

export const SubmitButton = styled(Button)<
  Pick<SubmitButtonProps, 'isGreenButton'>
>`
  background-color: ${(p) => (p.isGreenButton ? '#008E58' : '#C10000')};
  color: #ffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  width: 120px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
`;

export const CancelButton = styled(Button)<
  Pick<CancelButtonProps, 'isGreenFont'>
>`
  background-color: #ffff;
  color: ${(p) => (p.isGreenFont ? '#008E58' : '#c10000')};
  width: 120px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
`;

export const HeaderWrapper = styled(DialogTitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 29px 20px 24px;
  width: 606px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

export const ContentWrapper = styled(DialogContentText)`
  padding: 24px;
`;

export const Title = styled(Typography)`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  color: #232933;
`;

export const Content = styled(Typography)`
  color: #626b79;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

export const Actions = styled(DialogActions)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 24px;
  gap: 10px;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.1);
`;
