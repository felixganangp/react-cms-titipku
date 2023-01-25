import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DescriptionDetailTypes {
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode | string;
}

const DescriptionDetail = (props: DescriptionDetailTypes) => {
  return (
    <Grid container spacing="4px">
      <Grid item xs={2} maxWidth="40px !important">
        {props.icon}
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="h3"
          color="#008e58"
          fontSize="1rem"
          lineHeight="20px"
        >
          {props.title}
        </Typography>
        <Box>{props.content}</Box>
      </Grid>
    </Grid>
  );
};

export default DescriptionDetail;
