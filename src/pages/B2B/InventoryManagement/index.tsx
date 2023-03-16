/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import EmptyProduct from 'assets/empty-product.svg';
import {
  Grid,
  Typography,
  Box,
  Card,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Table from 'components/Table';
import { Inventory } from 'models/b2b/Inventory';
import { HeadCells } from 'components/Table/types';
import NoImage from 'assets/no-image.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import FormLabel from 'components/FormLabel';
import { Category, GradingColor, StatusColor } from './inventory.styled';

export default function InventoryPage() {
  // batch action
  const [selected, setSelected] = useState<number[]>([1, 2]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenBatchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const handleExpandFilter = () => {
    console.log('click expand');
    setOpenFilter(!openFilter);
  };

  const dummyData: Inventory[] = [
    {
      id: 1,
      product_name: 'Sayap Ayam',
      grade: 'A',
      low_stock_limit: 50,
      image_path:
        'https://titipku-dev.s3.ap-southeast-1.amazonaws.com/kur_user_documents/kk/7-02-2023-1675759857351723921_pexels-ekaterina-bolovtsova-6979271%20%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXSNW2ORESX4WA3MQ%2F20230315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T064307Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6b75fac343f5e24c5fd4fafe4e930cd1b26faf8d388a569f8c392861d0a89f41',
      category: {
        id: 1,
        category_name: 'Daging, Ikan, Telur',
      },
      weight: 0,
      status: true,
    },
    {
      id: 2,
      product_name: 'Sayap Ayam',
      grade: 'B',
      low_stock_limit: 100,
      image_path:
        'https://titipku-dev.s3.ap-southeast-1.amazonaws.com/kur_user_documents/kk/7-02-2023-1675759857351723921_pexels-ekaterina-bolovtsova-6979271%20%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXSNW2ORESX4WA3MQ%2F20230315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T064307Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6b75fac343f5e24c5fd4fafe4e930cd1b26faf8d388a569f8c392861d0a89f41',
      category: {
        id: 1,
        category_name: 'Daging, Ikan, Telur',
      },
      weight: 50,
      status: true,
    },
    {
      id: 3,
      product_name: 'Sayap Ayam',
      grade: 'C',
      low_stock_limit: 210,
      image_path:
        'https://titipku-dev.s3.ap-southeast-1.amazonaws.com/kur_user_documents/kk/7-02-2023-1675759857351723921_pexels-ekaterina-bolovtsova-6979271%20%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXSNW2ORESX4WA3MQ%2F20230315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T064307Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6b75fac343f5e24c5fd4fafe4e930cd1b26faf8d388a569f8c392861d0a89f41',
      category: {
        id: 1,
        category_name: 'Daging, Ikan, Telur',
      },
      weight: 200,
      status: false,
    },
    {
      id: 4,
      product_name: 'Beras Rojo Lele',
      grade: null,
      low_stock_limit: 1000,
      image_path:
        'https://titipku-dev.s3.ap-southeast-1.amazonaws.com/kur_user_documents/kk/7-02-2023-1675759857351723921_pexels-ekaterina-bolovtsova-6979271%20%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAXSNW2ORESX4WA3MQ%2F20230315%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230315T064307Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=6b75fac343f5e24c5fd4fafe4e930cd1b26faf8d388a569f8c392861d0a89f41',
      category: {
        id: 1,
        category_name: 'Sembako',
      },
      weight: 2000000,
      status: true,
    },
  ];

  const headCell: HeadCells<Inventory>[] = [
    {
      id: 'product_name',
      label: 'Product / SKU',
      align: 'left',
      enableSort: false,
      format: (val: Inventory) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="24px"
        >
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NoImage;
            }}
            src={val.image_path}
            style={{ height: '48px', width: '48px', borderRadius: '50%' }}
            alt={val.product_name}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            gap="8px"
          >
            {val.grade && (
              <GradingColor
                grade={val.grade}
              >{`Grade ${val.grade}`}</GradingColor>
            )}
            <Typography>{val.product_name}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      align: 'left',
      enableSort: false,
      format: (val: Inventory) => (
        <Category>{val.category.category_name}</Category>
      ),
    },
    {
      id: 'weight',
      label: 'Weight ( Gram )',
      align: 'left',
      enableSort: false,
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left',
      enableSort: false,
      format: (val: Inventory) => {
        let status = 0;
        if (!val.status) status = 0;
        else if (val.weight === 0) status = 1;
        else if (val.weight <= val.low_stock_limit) status = 2;
        else status = 3;
        return (
          <StatusColor status={status}>
            {status === 0
              ? 'Inactive'
              : status === 1
              ? 'Habis'
              : status === 2
              ? 'Hampir Habis'
              : 'Tersedia'}
          </StatusColor>
        );
      },
    },
    {
      id: 'menu',
      label: '',
      align: 'left',
      width: '20px',
      format: (val) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Stock Opname',
                onClick: () => console.log('Stock Opname'),
              },
              {
                label: 'Edit',
                onClick: () => console.log('Edit'),
              },
              {
                label: 'See Details',
                onClick: () => console.log('See Details'),
              },
              {
                label: 'Make Inactive',
                onClick: () => console.log('Make Inactive'),
              },
              {
                label: 'Delete',
                onClick: () => console.log('Delete'),
              },
            ]}
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuList>
        </>
      ),
    },
  ];
  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontWeight={600}
              fontSize="26px"
              fontFamily="Montserrat"
            >
              Inventory Management
            </Typography>
            <Button endIcon={<ArrowForwardIcon />}>Add New</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb="10px"
            >
              <TextField
                placeholder="Search item"
                size="small"
                sx={{ bgcolor: '#f8f8f8', maxWidth: '560px' }}
                fullWidth
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
                  disabled={selected.length <= 0}
                  endIcon={<ArrowDownIcon />}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleOpenBatchAction}
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
                  <MenuItem onClick={handleClose}>Stock Opname</MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>See Details</MenuItem>
                  <MenuItem onClick={handleClose}>Make Inactive</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
                <Button
                  variant="outlined"
                  endIcon={<FilterIcon />}
                  onClick={handleExpandFilter}
                >
                  Filter
                </Button>
              </Box>
            </Box>
            <Collapse in={openFilter}>
              <Box display="flex" flexDirection="column" gap="36px">
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  gap="28px"
                  borderTop="solid 1px #e4e4e4"
                  pt="16px"
                >
                  <FormLabel text="Grade">
                    <TextField fullWidth />
                  </FormLabel>
                  <FormLabel text="Product Category">
                    <TextField fullWidth />
                  </FormLabel>
                  <FormLabel text="Status">
                    <TextField fullWidth />
                  </FormLabel>
                </Box>
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
            <Box pt="18px">
              <Table
                data={dummyData || []}
                headCells={headCell}
                totalData={dummyData.length}
                loading={false}
                count={10}
                selected={selected}
                setSelected={() => setSelected}
                enableCheckBox
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
