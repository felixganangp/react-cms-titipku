/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import Table from 'components/Table';
import { Inventory } from 'models/b2b/Inventory';
import { HeadCells } from 'components/Table/types';
import NoImage from 'assets/no-image.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuList from 'components/MenuList';
import FormLabel from 'components/FormLabel';
import PaperBox from 'components/Icon/PaperBox';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { inventoryAction } from 'store/slice/b2b/Inventory';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import {
  CardContainer,
  Category,
  GradingColor,
  StatusColor,
} from './inventory.styled';
import StockOpname from './components/StockOpname';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory);

  const stockOpnameModal = useModal();
  // mini dashboard
  const handleSetActiveDashboard = (activeDashboard: string) => {
    dispatch(inventoryAction.setActiveDashboard({ activeDashboard }));
  };

  const getDashboardTitle = () => {
    if (inventory.activeDashboard === 'all_data') return 'Inventory Management';
    if (inventory.activeDashboard === 'empty_stock')
      return 'Empty Stock Products';
    return 'Low Stock Products';
  };

  // batch action
  const [selected, setSelected] = useState<(number | string)[]>([1, 2]);
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
                onClick: () => stockOpnameModal.openModal(),
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
        {/* header (title, icon, back button) */}
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="16px"
            height="fit-content"
          >
            {/* paper box icon */}
            <Box
              display={
                inventory.activeDashboard !== 'all_data' ? 'flex' : 'none'
              }
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              width="66px"
              height="66px"
              borderRadius="50%"
              bgcolor={
                inventory.activeDashboard === 'empty_stock'
                  ? '#d9876d'
                  : '#f7bb47'
              }
              position="relative"
            >
              {/* total stock bullet */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                top="-10%"
                right="-4%"
                zIndex="5"
                bgcolor={
                  inventory.activeDashboard === 'empty_stock'
                    ? '#bf370c'
                    : '#a57d2f'
                }
                borderRadius="50%"
                height="24px"
                minWidth="24px"
                maxWidth="fit-content"
                position="absolute"
                p="4px 2px 2px 2px"
              >
                <Typography fontSize="16px" color="#fff">
                  {10}
                </Typography>
              </Box>
              {/* icon x / arrow down */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                bottom="32%"
                left="23%"
                zIndex="5"
                bgcolor={
                  inventory.activeDashboard === 'empty_stock'
                    ? '#bf370c'
                    : '#a57d2f'
                }
                borderRadius="50%"
                height="10px"
                width="10px"
                position="absolute"
              >
                {inventory.activeDashboard === 'empty_stock' ? (
                  <CloseIcon
                    sx={{
                      color: '#fff',
                      height: '10px',
                      width: '10px',
                    }}
                  />
                ) : (
                  <ArrowDownwardIcon
                    sx={{
                      color: '#fff',
                      height: '10px',
                      width: '7px',
                      mr: '1px',
                    }}
                  />
                )}
              </Box>
              <PaperBox sx={{ height: '34px', width: '34px' }} />
            </Box>
            {/* back to all list button */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography color="#000000" fontSize="26px" fontWeight="600">
                {getDashboardTitle()}
              </Typography>
              <Box
                display={
                  inventory.activeDashboard !== 'all_data' ? 'flex' : 'none'
                }
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                padding="2px 10px 2px 1px"
                borderRadius="4px"
                sx={{
                  ':hover': {
                    backgroundColor: '#e4e4e4',
                  },
                }}
                onClick={() => handleSetActiveDashboard('all_data')}
              >
                <BackIcon sx={{ color: '#008e58' }} />
                <Typography color="#008e58" fontSize="16px" fontWeight="bold">
                  See all List
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* mini dashboard */}
        <Grid
          item
          xs={12}
          sx={{
            display:
              inventory.activeDashboard === 'all_data' ? 'inline' : 'none',
          }}
        >
          <CardContainer>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              {/* low stock */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                gap="15px"
                width="50%"
                borderRight="1px solid #e4e4e4"
                padding="10.5px 16px"
                sx={{
                  ':hover': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
                onClick={() => handleSetActiveDashboard('low_stock')}
              >
                <Box
                  height="45px"
                  width="45px"
                  borderRadius="50%"
                  bgcolor="#f7bb47"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    bottom="28%"
                    left="20%"
                    zIndex="5"
                    bgcolor="#a57d2f"
                    borderRadius="50%"
                    height="10px"
                    width="10px"
                    position="absolute"
                  >
                    <ArrowDownwardIcon
                      sx={{ color: '#fff', height: '8px', width: '5px' }}
                    />
                  </Box>
                  <PaperBox sx={{ height: '24px', width: '24px' }} />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography fontSize="20px" fontWeight={700} color="#555555">
                    2 Items
                  </Typography>
                  <Typography fontSize="10px" fontWeight="bold" color="#afafaf">
                    LOW STOCK
                  </Typography>
                </Box>
              </Box>

              {/* empty stock */}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                gap="15px"
                width="50%"
                padding="10.5px 16px"
                sx={{
                  ':hover': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
                onClick={() => handleSetActiveDashboard('empty_stock')}
              >
                <Box
                  height="45px"
                  width="45px"
                  borderRadius="50%"
                  bgcolor="#d9876d"
                  gap="15px"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    bottom="28%"
                    left="20%"
                    zIndex="5"
                    bgcolor="#bf370c"
                    borderRadius="50%"
                    height="10px"
                    width="10px"
                    position="absolute"
                  >
                    <CloseIcon
                      sx={{
                        color: '#fff',
                        height: '7px',
                        width: '7px',
                        mr: '1px',
                        mt: '0.2px',
                      }}
                    />
                  </Box>
                  <PaperBox sx={{ height: '24px', width: '24px' }} />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography fontSize="20px" fontWeight={700} color="#555555">
                    2 Items
                  </Typography>
                  <Typography fontSize="10px" fontWeight="bold" color="#afafaf">
                    EMPTY STOCK
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContainer>
        </Grid>
        <Grid item xs={12}>
          <CardContainer>
            {/* search, batch action button, filter */}
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
            {/* filter detail */}
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
            {/* table */}
            <Box p="16px 12px">
              <Table
                data={dummyData || []}
                headCells={headCell}
                totalData={dummyData.length}
                loading={false}
                count={10}
                selected={selected}
                setSelected={(array: (string | number)[]) => setSelected(array)}
                enableCheckBox
              />
            </Box>
          </CardContainer>
        </Grid>
      </Grid>
      <Modal
        open={stockOpnameModal.open}
        title="Stock Opname"
        onClose={stockOpnameModal.closeModal}
      >
        <StockOpname
          items={[
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
          ]}
        />
      </Modal>
    </Box>
  );
}
