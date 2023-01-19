/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export const TitleWrapper = styled(DialogTitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 20px 24px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  width: 580px;
`;

export const Title = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  color: #232933;
`;

export const ContentWrapper = styled(DialogContentText)`
  padding: 24px;
  width: 580px;
`;

export const ActionWrapper = styled(DialogActions)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 24px;
  gap: 10px;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.1);
  width: 580px;
`;

export const SubmitButton = styled(Button)`
  background-color: #008e58;
  color: #ffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  width: 120px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
`;

export const CancelButton = styled(Button)`
  background-color: #ffff;
  color: #c10000;
  width: 120px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
`;

export const HorizontalContent = styled(Box)`
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 30px;
  padding-top: 0px;
  padding-bottom: 0px;
  :nth-of-type(odd) {
    background-color: #fafafa;
  }
  :nth-of-type(even) {
    background-color: #ffff;
  }
`;

export const Menu = styled(Typography)`
  font-size: 14px;
  padding-left: 44px;
  color: #232933;
`;

export const ChildMenu = styled(Typography)`
  font-size: 14px;
  padding-left: 40px;
  color: #232933;
`;

export const Control = styled(FormControlLabel)`
  margin-right: 0px;
`;
