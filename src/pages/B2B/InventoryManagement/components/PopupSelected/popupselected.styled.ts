/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import {
  DialogActions,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  Box,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Search = styled(TextField)`
  background-color: #ebeff3;
  width: 565px;
  margin-top: 20px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 5px;
`;

export const CloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  cursor
`;

export const Actions = styled(DialogActions)`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 30px;
`;

export const ContentAction = styled(DialogActions)`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 30px;
  box-shadow: 0 -4px 15px 0 rgba(0, 0, 0, 0.05);
`;

export const BorderLine = styled.div`
  -webkit-box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1);
  height: 15px;
`;

export const ContentNoData = styled(DialogContent)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SelectedItems = styled(DialogContentText)`
  color: #008e58;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  text-align: left;
  margin-top: 10px;
`;

export const Contents = styled(DialogContent)`
  color: #232933;
  margin-right: 16px;
  height: 80%;
  padding: 0px 10px 24px;
  width: inherit;
`;

export const MoreContent = styled(DialogContentText)`
  color: #008e58;
  font-style: italic;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const HeadText = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  padding-bottom: 10px;
  padding-top: 10px;
  letter-spacing: normal;
`;

export const BodyText = styled(Typography)`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #626b79;
`;

export const ConfirmButton = styled(Button)`
  background-color: #008e58;
  width: 116px;
  height: 36px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
  color: #ffff;
  :disabled {
    background-color: #ebeff3;
    color: #8b95a5;
  }
`;

export const CancelButton = styled(Button)`
  color: #8b95a5;
  width: 116px;
  font-weight: bold;
`;

export const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 21px;
  margin-left: 21px;
`;

export const NoItemImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 21px;
  margin-left: 21px;
`;

export const NoData = styled.img`
  width: inherit;
`;

export const TitleShadow = styled(DialogTitle)`
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  height: fit-content;
  color: #232933;
`;

export const TitleNoShadow = styled(DialogTitle)`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  height: 56px;
  color: #232933;
  height: 100px;
`;

export const TitleConfirmation = styled(DialogTitle)`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  height: 56px;
  color: #232933;
  height: 100px;
  width: 520px;
  padding-top: 25px;
  padding-left: 30px;
  padding-bottom: 25px;
`;

export const TitleShadowMultiple = styled(DialogTitle)`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  height: fit-content;
  color: #232933;
`;

export const HorizontalAlign = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: inherit;
`;

export const VerticalAlign = styled.div`
  width: inherit;
`;

export const ContentDetails = styled.span`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.05px;
  text-align: left;
  margin-top: 4px;
  color: #8b95a5;
`;

export const ContentWeight = styled.div`
  flex-grow: 0;
  color: #008e58;
  justify-content: flex-end;
  width: 15%;
  text-align: right;
  margin: auto;
`;
export const WeightProperty = styled.span`
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.05px;
  text-align: right;
`;

export const Header = styled(Box)`
  padding-top: 16px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const ParentContentBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #fff;
`;

export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
