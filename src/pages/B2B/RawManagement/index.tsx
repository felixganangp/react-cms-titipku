import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Collapse,
  Autocomplete,
  Divider,
  Avatar,
} from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppDispatch } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import FormLabel from 'components/FormLabel';
import Table from 'components/Table';
import { CardContainer } from './raw.styled';

export default function RawPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // BATCH ACTION
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenBatchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // search & filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleExpandFilter = () => {
    setOpenFilter(!openFilter);
  };

  // table
  const headCell = [
    {
      id: 'raw_id',
      label: 'Raw ID',
      align: 'left',
      enableSort: true,
    },
    {
      id: 'product',
      label: 'Product / SKU',
      align: 'left',
      enableSort: true,
      format: (val) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="24px"
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography>Product Name</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Grid container spacing={2}>
        {/* title + button add */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography color="#303030" fontSize="26px" fontWeight="600">
              Raw Management
            </Typography>
            <Button endIcon={<ArrowIcon />}>Add New</Button>
          </Stack>
        </Grid>
        {/* search & filter */}
        <Grid item xs={12}>
          <CardContainer>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap="20px"
              p="16px 12px"
            >
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

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                gap="10px"
              >
                <Button
                  disabled={selected.length === 0}
                  endIcon={<ArrowDownIcon />}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleOpenBatchAction}
                  sx={{
                    '&:disabled': {
                      bgcolor: '#e4e4e4',
                      color: '#797979',
                    },
                    fontWeight: 'bold',
                  }}
                >
                  Batch Action
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => console.log('delete')}>
                    Delete
                  </MenuItem>
                </Menu>
                <Button
                  variant="outlined"
                  endIcon={<FilterIcon />}
                  onClick={handleExpandFilter}
                  sx={{ width: '110px' }}
                >
                  Filter
                </Button>
              </Box>
            </Box>
            <Divider />

            {/* filter details */}
            <Collapse in={openFilter}>
              <Box p="20px">
                <FormLabel text="Category">
                  <Autocomplete
                    id="filterGrade"
                    value={null}
                    options={[]}
                    // onChange={(e, value) => {
                    //   handleChangeGrade(value);
                    // }}
                    // getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="grade"
                          placeholder="Select Category"
                          variant="outlined"
                        />
                      );
                    }}
                  />
                </FormLabel>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="8px"
                >
                  <Button sx={{ width: '90px' }} variant="text">
                    Reset
                  </Button>
                  <Button sx={{ width: '90px' }}>Apply</Button>
                </Box>
              </Box>
            </Collapse>

            <Table data={[]} />
          </CardContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
