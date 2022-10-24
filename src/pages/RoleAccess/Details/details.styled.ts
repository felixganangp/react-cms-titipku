/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Menu = styled(Typography)`
  font-size: 16px;
  color: #626b79;
`;

export const FieldName = styled(Typography)`
  color: #008e58;
`;

export const ChildMenu = styled(Typography)`
  font-size: 14px;
  padding-left: 24px;
`;

export const SuperChildMenu = styled(Typography)`
  font-size: 14px;
  padding-left: 48px;
`;

export const FieldContent = styled(Typography)`
  font-weight: 500;
  color: #626b79;
`;

export const BackButton = styled(Button)`
  color: #626b79;
  background-color: transparent;
`;

export const TitleWrapper = styled(Box)`
  display: flex;
  background-color: #626b79;
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  color: #fff;
`;

export const ContentWrapper = styled(Box)`
  padding-top: 16px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const TableWrapper = styled(Box)`
  padding: 16px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background-color: #ffff;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const TitlePage = styled(Typography)`
  color: #232933;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.15px;
`;

export const ContentGrid = styled(Grid)`
  display: flex;
  width: inherit;
  align-items: row;
  justify-content: flex-start;
  padding-left: 24px;
  padding-top: 44px;
  padding-bottom: 32px;
`;

export const FieldBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-right: 10%;
`;

export const DescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  :nth-child(odd) {
    background-color: #fafafa;
  }
  :nth-child(even) {
    background-color: #ffff;
  }
`;

export const Control = styled(FormControlLabel)`
  margin-right: 0px;
`;

export const TablesProperty = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

export const Search = styled(TextField)`
  background-color: #fafafa;
  border: 1px solid #ebeff3;
  width: 560px;
  height: 40px;
`;

export const DownloadButton = styled(Button)(() => ({
  width: '40px',
  height: '40px',
  backgroundColor: '#ffff',
  '&:hover': {
    backgroundColor: '#EBEFF3',
  },
  border: 'solid 1px #ebeff3',
  borderRadius: '4px',
  marginLeft: '28px',
  boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
}));
