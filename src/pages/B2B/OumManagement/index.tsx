import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Modal,
  Autocomplete,
  Skeleton,
  Stack,
} from '@mui/material';
import Table from 'components/Table';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

export default function OumPage() {
  const headCell = [
    {
      id: 'supplier',
      label: 'Category',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Action',
      align: 'left',
    },
  ];

  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Unit of Measurement Management
        </Typography>
      </Stack>
      <Box mt={2} p={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Button
          endIcon={<ArrowIcon />}
          // onClick={formProductModal.openModal}
          size="large"
        >
          Add UoM
        </Button>
        <Box mt={2}>
          <Table data={[]} headCells={headCell} />
        </Box>
      </Box>
    </Box>
  );
}
