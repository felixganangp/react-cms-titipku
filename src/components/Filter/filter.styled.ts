import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const FilterBox = styled(Box)`
  padding-left: 10px;
  padding-right: 10px;
`;

export const TextMore = styled(Typography)`
  width: 50px;
  height: 16px;
  flex-grow: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.33;
  letter-spacing: 0.05px;
  text-align: center;
  color: #008e58;
  cursor: pointer;
`;
export const ButtonMore = styled.div`
  height: 32px;
  align-self: stretch;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
`;
export const SelectedItem = styled(Typography)`
  width: 146px;
  height: 16px;
  flex-grow: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 0.05px;
  text-align: left;
  color: #008e58;
`;
