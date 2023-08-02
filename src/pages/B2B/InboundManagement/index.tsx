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

export default function InboundPage() {
  const headCell = [
    {
      id: 'supplier',
      label: 'Supplier',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Inbound Code',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Note',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Inbound Date',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Total SKU',
      align: 'left',
    },
    {
      id: 'supplier',
      label: 'Grand Total',
      align: 'left',
    },
  ];

  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Product Management
        </Typography>
        <Button
          endIcon={<ArrowIcon />}
          // onClick={formProductModal.openModal}
          size="large"
        >
          Add Inbound
        </Button>
      </Stack>
      <Box mt={2} p={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <TextField
          placeholder="Search item"
          size="small"
          sx={{ flex: 1, bgcolor: '#f8f8f8', maxWidth: '560px' }}
          fullWidth
          // defaultValue={product.displayFilter.search}
          // value={product.displayFilter.search}
          // onChange={(e) => handleSearch(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') handleApplyFilter();
          // }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={2}>
          <Table data={[]} headCells={headCell} />
        </Box>
      </Box>
    </Box>
  );
}
