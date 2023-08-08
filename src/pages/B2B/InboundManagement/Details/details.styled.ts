/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export const TitleWrapper = styled(DialogTitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 20px 24px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  color: #232933;
`;

export const ContentWrapper = styled(DialogContentText)`
  padding: 24px;
`;

export const BoxTable = styled(Box)`
  margin-top: 20px;
  padding: 10px;
  max-width: 100%;
  border: solid 1px #e4e4e4;
`;
