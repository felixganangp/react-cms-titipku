import styled from '@emotion/styled';
import Box from '@mui/material/Box';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabPanelProps {
  children?: React.ReactNode | string;
  index: number;
  value: number;
  padding?: number | string;
}

const Container = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

const Item = styled(Tab)({
  border: '1px solid #e8e8e8',
  fontcolor: 'blue',
  borderRadius: '8px 8px 0 0',
  marginLeft: 1,
  marginRight: 1,
  '& .MuiTabs-indicator': {
    backgroundColor: 'trasnparant',
  },
  '&.Mui-selected': {
    border: 'none',
    borderTop: '3px solid #008E58',
    backgroundColor: '#31A579',
    color: '#fff',
  },
});

function Panel(props: TabPanelProps) {
  const { children, value, index, padding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: padding }}>{children}</Box>}
    </div>
  );
}

Panel.defaultProps = {
  padding: 2,
};
export default {
  Container,
  Item,
  Panel,
};
