/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Collapse,
  IconButton,
} from '@mui/material';
import PaperBox from 'components/Icon/PaperBox';
import { useParams, useNavigate } from 'react-router-dom';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormLabel from 'components/FormLabel';
import { HeadCells } from 'components/Table/types';
import { Inventory } from 'models/b2b/Inventory';
import NoImage from 'assets/no-image.svg';
import MenuList from 'components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from 'components/Table';
import {
  CardContainer,
  Category,
  GradingColor,
  StatusColor,
} from '../inventory.styled';

export default function WarningStockList() {
  const { isEmptyStock } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number[]>([1]);

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
    <Box p="20px" bgcolor="#fff" gap="36px">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="16px"
            mb="36px"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              width="66px"
              height="66px"
              borderRadius="50%"
              bgcolor={isEmptyStock === '1' ? '#d9876d' : '#f7bb47'}
            >
              <PaperBox sx={{ height: '32px', width: '32px' }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography color="#000000" fontSize="26px" fontWeight="600">
                {isEmptyStock === '1'
                  ? 'Empty Stock Products'
                  : 'Low Stock Products'}
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                padding="2px 10px 2px 1px"
                borderRadius="4px"
                sx={{
                  ':hover': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
                onClick={() => navigate('/b2b/inventory')}
              >
                <BackIcon sx={{ color: '#008e58' }} />
                <Typography color="#008e58" fontSize="16px" fontWeight="bold">
                  See all List
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
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
              <Box display="flex" flexDirection="column" gap="20px">
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  gap="28px"
                  borderTop="solid 1px #e4e4e4"
                  p="8px 12px 0 12px"
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
                  pr="12px"
                >
                  <Button sx={{ width: '90px' }} variant="text">
                    Reset
                  </Button>
                  <Button sx={{ width: '90px' }}>Apply</Button>
                </Box>
              </Box>
            </Collapse>
            <Box p="16px 12px">
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
          </CardContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
