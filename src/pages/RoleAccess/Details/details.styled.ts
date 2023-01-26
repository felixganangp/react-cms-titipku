/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Menu = styled(Typography)`
  font-size: 16px;
  color: #626b79;
`;
export const BackButton = styled(Button)`
  color: #626b79;
  background-color: transparent;
`;

export const TitlePage = styled(Typography)`
  color: #232933;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.15px;
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

export const Control = styled(FormControlLabel)`
  margin-right: 0px;
`;

export const ChildMenu = styled(Typography)`
  font-size: 14px;
  padding-left: 40px;
  color: #232933;
`;
