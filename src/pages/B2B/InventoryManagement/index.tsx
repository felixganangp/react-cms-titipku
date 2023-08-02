/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
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
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Table from 'components/Table';
import { IsActiveType, Product } from 'models/b2b/Product';
import { HeadCells } from 'components/Table/types';
import NoImage from 'assets/no-image.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import MenuList from 'components/MenuList';
import FormLabel from 'components/FormLabel';
import PaperBox from 'components/Icon/PaperBox';
import PaperBoxGreen from 'components/Icon/PaperBoxGreen';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import YellowToast from 'components/YellowToast';
import { uiAction } from 'store/slice/ui';
import { useNavigate } from 'react-router-dom';
import NoDataWithAddBtn from 'components/Table/NoDataView/NoData';
import Delete from 'components/Delete';
import {
  CardContainer,
  CategoryStyle,
  CircleTotalStock,
  GradingColor,
  StatusColor,
  CircleContainer,
  MiniCircleOnIcon,
  DashboardContainer,
  BackButton,
  TitleContainer,
} from './inventory.styled';
import StockOpname from './components/StockOpname';
import ChangeStatus from './components/ChangeStatus';
import Form from './components/Form';
import PopupAddSelected from './components/PopupSelected';
import MoveStockForm from './components/MoveStockForm';
import ConfirmMoveStock from './components/ConfirmMoveStock';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.product);
  const activeDashboard = useAppSelector(
    (state) => state.product.activeDashboard,
  );
  const { search, grade, category, status, type } = useAppSelector(
    (state) => state.product.displayFilter,
  );
  const [EditProduct, setEditProduct] = useState<Product | null>(null);
  const stockOpnameModal = useModal();
  const formProductModal = useModal();
  const listProductModal = useModal();
  const moveStockFormModal = useModal();
  const moveStockConfirmationModal = useModal();

  const [parentId, setParentId] = useState<number | undefined>();
  // BATCH ACTION
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const changeStatusModal = useModal();
  const deleteModal = useModal();
  const [newStatus, setNewStatus] = useState<boolean>(false);

  const handleOpenBatchAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // STOCK OPNAME
  const handleStockOpnameBatchAction = () => {
    stockOpnameModal.openModal();
  };
  const handleStockOpnameAction = (val: Product) => {
    const payload = [val];
    setSelected([val.id]);
    setSelectedProduct(payload);
    stockOpnameModal.openModal();
  };

  const [payloadMoveStock, setPayloadMoveStock] = useState<{
    from_product_id: number | undefined;
    to_product_id: number | undefined;
    stock_change: number;
  }>({
    from_product_id: undefined,
    stock_change: 0,
    to_product_id: undefined,
  });
  const handleCloseStockOpname = () => {
    setSelected([]);
    setSelectedProduct([]);
    setParentId(undefined);
    setPayloadMoveStock({
      from_product_id: undefined,
      to_product_id: undefined,
      stock_change: 0,
    });
    stockOpnameModal.closeModal();
  };

  // MOVE STOCK
  const handleCloseAllModalOnStockOpname = () => {
    stockOpnameModal.closeModal();
    listProductModal.closeModal();
    moveStockFormModal.closeModal();
    moveStockConfirmationModal.closeModal();
    setPayloadMoveStock({
      from_product_id: undefined,
      to_product_id: undefined,
      stock_change: 0,
    });
  };
  const [selectedProductMoveStock, setSelectedProductMoveStock] = useState<
    Product[]
  >([]);

  const handleClosePopupSelectproduct = () => {
    // modalFunc.openFunc();
    stockOpnameModal.openModal();
    listProductModal.closeModal();
    setSelectedProductMoveStock([]);
  };
  const handleOpenPopupSelectproduct = () => {
    // modalFunc.closeFunc();
    stockOpnameModal.closeModal();
    listProductModal.openModal();
  };
  const handleOnApplySelectProduct = () => {
    listProductModal.closeModal();
    moveStockFormModal.openModal();
  };
  const handleCloseFormMoveStock = () => {
    listProductModal.openModal();
    moveStockFormModal.closeModal();
  };
  const handleOnSubmitMoveStock = (val: { stock_change: number }) => {
    setPayloadMoveStock({
      from_product_id: selectedProduct[0].id,
      to_product_id: selectedProductMoveStock[0].id,
      stock_change: val.stock_change,
    });
    moveStockFormModal.closeModal();
    moveStockConfirmationModal.openModal();
  };
  const handleCloseConfirmationMoveStock = () => {
    moveStockFormModal.openModal();
    moveStockConfirmationModal.closeModal();
  };

  const handleSubmitMoveToStock = async () => {
    await dispatch(productAction.moveStock(payloadMoveStock));
    await dispatch(
      uiAction.openYellowToast({
        // totalItem,
        additionalMsg: `moved stock to [${selectedProductMoveStock[0].product_grade.name}] [${selectedProductMoveStock[0].product_type.name}] ${selectedProductMoveStock[0].product_parent.name}`,
        action: 'Successfully',
        error: false,
        noUndo: true,
      }),
    );
    stockOpnameModal.closeModal();
    listProductModal.closeModal();
    moveStockFormModal.closeModal();
    moveStockConfirmationModal.closeModal();
    setPayloadMoveStock({
      from_product_id: undefined,
      to_product_id: undefined,
      stock_change: 0,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = () => {
    const existingStatus: IsActiveType[] = selectedProduct.map((item) => ({
      is_active: item.is_active,
      ids: [item.id],
    }));
    dispatch(
      productAction.changeStatus({
        existingStatus,
        newStatus: {
          is_active: newStatus || false,
          ids: selected,
        },
      }),
    );
    setSelected([]);
    handleClose();
    changeStatusModal.closeModal();
    dispatch(
      uiAction.openYellowToast({
        totalItem: selectedProduct.length,
        onUndoAction() {
          dispatch(productAction.undoChangeStatus());
          dispatch(uiAction.closeYellowToast());
        },
        additionalMsg: 'marked',
        action: newStatus ? 'active' : 'inactive',
        error: !newStatus,
      }),
    );
  };

  const handleDelete = () => {
    setSelected([]);
    handleClose();
    deleteModal.closeModal();
    dispatch(productAction.delete(selected));
    dispatch(
      uiAction.openYellowToast({
        totalItem: selectedProduct.length,
        onUndoAction() {
          dispatch(productAction.undoDelete());
          dispatch(uiAction.closeYellowToast());
        },
        additionalMsg: '',
        action: 'delete',
        error: true,
      }),
    );
  };

  const getBatchProductDesc = () =>
    selectedProduct.length > 0
      ? selectedProduct.length > 3
        ? `${selectedProduct
            .slice(0, 3)
            .map(
              (item) =>
                `${item.product_parent.name} ${item.product_grade.name}`,
            )
            .join(',')} ... and ${selectedProduct.length - 3} others`
        : selectedProduct
            .map(
              (item) =>
                `${item.product_parent.name} ${item.product_grade.name}`,
            )
            .join(',')
      : '';

  // SEARCH & FILTER
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const handleExpandFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    dispatch(productAction.fetchGrade());
    dispatch(productAction.fetchCategory());
    dispatch(productAction.fetchTypes());
  }, []);

  const handleSearch = (value: string) => {
    dispatch(
      productAction.setDisplayFilter({
        search: value,
      }),
    );
  };

  const handleChangeGrade = (value: any) => {
    dispatch(
      productAction.setDisplayFilter({
        grade: value,
      }),
    );
  };

  const handleChangeType = (value: any) => {
    dispatch(
      productAction.setDisplayFilter({
        type: value,
      }),
    );
  };

  const handleChangeCategory = (value: any) => {
    dispatch(
      productAction.setDisplayFilter({
        category: value,
      }),
    );
  };

  const handleChangeFilterStatus = (value: any) => {
    dispatch(
      productAction.setDisplayFilter({
        status: value,
      }),
    );
  };

  const handleApplyFilter = () => {
    dispatch(
      productAction.setParams({
        ...product.params,
        page: 1,
        search: search || '',
        product_grade_id: grade ? grade.id : undefined,
        product_type_id: type ? type.id : undefined,
        product_parent_category_id: category ? category.id : undefined,
        status: status ? status.value : undefined,
      }),
    );
  };

  const handleResetFilter = () => {
    dispatch(
      productAction.setParams({
        page: 1,
        // search: '',
        product_type_id: undefined,
        product_grade_id: undefined,
        product_parent_category_id: undefined,
        status:
          activeDashboard === 'all_stock' ? undefined : product.params.status,
      }),
    );
    dispatch(
      productAction.setDisplayFilter({
        grade: null,
        category: null,
        type: null,
        // search: '',
        status:
          activeDashboard === 'all_stock' ? null : product.displayFilter.status,
      }),
    );
    dispatch(
      productAction.fetchData({
        page: 1,
        count: product.params.count,
        search: product.params.search,
        product_type_id: undefined,
        product_grade_id: undefined,
        product_parent_category_id: undefined,
        status:
          activeDashboard === 'all_stock' ? undefined : product.params.status,
      }),
    );
  };

  // MINI DASHBOARD
  const handleSetActiveDashboard = (value: string | undefined) => {
    dispatch(
      productAction.setParams({
        page: 1,
        count: 10,
        status: value,
      }),
    );
    dispatch(
      productAction.setActiveDashboard(
        value === undefined ? 'all_stock' : value,
      ),
    );
    dispatch(
      productAction.setDisplayFilter({
        status:
          value !== undefined
            ? product.status.filter((item) => item.value === value)[0]
            : null,
      }),
    );
  };

  const getDashboardTitle = () => {
    if (activeDashboard === 'all_stock') return 'Product Management';
    if (activeDashboard === 'empty_stock') return 'Empty Stock Products';
    return 'Low Stock Products';
  };

  const cleanSearch = () => {
    dispatch(
      productAction.setParams({
        search: '',
      }),
    );
    dispatch(
      productAction.setDisplayFilter({
        search: '',
      }),
    );
  };

  // TABLE
  useEffect(() => {
    dispatch(productAction.fetchData(product.params));
    dispatch(productAction.fetchTotalEmptyStock());
    dispatch(productAction.fetchTotalLowStock());
  }, [product.params]);

  const handleChangeRowPerPage = (value: number) => {
    dispatch(
      productAction.setParams({
        page: 1,
        count: value,
      }),
    );
  };

  const handleChangePage = (value: number) => {
    dispatch(
      productAction.setParams({
        page: value,
      }),
    );
  };

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const headCell: HeadCells<Product>[] = [
    {
      id: 'product_name',
      label: 'Product / SKU',
      align: 'left',
      enableSort: false,
      format: (val: Product) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          gap="24px"
          onClick={() => {
            navigate(`/b2b/inventory/${val.id}`);
            dispatch(uiAction.closeYellowToast());
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NoImage;
            }}
            src={val.product_parent.image_filepath}
            style={{ height: '48px', width: '48px', borderRadius: '50%' }}
            alt={val.product_parent.name}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            gap="8px"
          >
            {/* {val.product_grade.id !== 1 && (
              <GradingColor
                grade={val.product_grade.id}
              >{`${val.product_grade.name}`}</GradingColor>
            )} */}
            <Typography>{val.product_parent.name}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'price',
      label: 'Price',
      align: 'left',
      enableSort: false,
      format: (val: Product) => <Typography>{val?.price || 0}</Typography>,
    },
    // {
    //   id: 'b2bType',
    //   label: 'B2B Type',
    //   align: 'left',
    //   enableSort: false,
    //   format: (val: Product) => (
    //     <Typography>{val.product_type.name}</Typography>
    //   ),
    // },
    {
      id: 'category',
      label: 'Category',
      align: 'left',
      enableSort: false,
      format: (val: Product) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          gap="5px"
          flexWrap="wrap"
          width="100%"
          maxWidth="400px"
        >
          {val.product_parent.product_parent_category ? (
            val.product_parent.product_parent_category.map((item) => (
              <CategoryStyle key={item.id}>{item.name}</CategoryStyle>
            ))
          ) : (
            <CategoryStyle>-</CategoryStyle>
          )}
        </Box>
      ),
    },
    {
      id: 'weight',
      label: 'In Stock',
      align: 'left',
      enableSort: false,
      format: (val: Product) => (
        <Typography>{numberWithCommas(val.stock)}</Typography>
      ),
    },
    {
      id: 'status',
      label: activeDashboard === 'all_stock' ? 'Status' : '',
      align: 'left',
      enableSort: false,
      format: (val: Product) => {
        let productStatus = 0;
        if (!val.is_active) productStatus = 0;
        else if (val.stock <= 0) productStatus = 1;
        else if (val.stock <= val.low_stock_limit) productStatus = 2;
        else productStatus = 3;
        return (
          <>
            <Box display={activeDashboard !== 'all_stock' ? 'none' : 'flex'}>
              <StatusColor status={productStatus}>
                {productStatus === 0
                  ? 'Inactive'
                  : productStatus === 1
                  ? 'Habis'
                  : productStatus === 2
                  ? 'Hampir Habis'
                  : 'Tersedia'}
              </StatusColor>
            </Box>
          </>
        );
      },
    },
    {
      id: 'menu',
      label: '',
      align: 'left',
      width: '20px',
      format: (val: Product) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          gap="10px"
        >
          <Box
            display={activeDashboard !== 'all_stock' ? 'flex' : 'none'}
            width="200px"
          >
            <Button
              variant="outlined"
              startIcon={<PaperBoxGreen />}
              fullWidth
              sx={{
                boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.24)',
              }}
              onClick={() => {
                dispatch(uiAction.closeYellowToast());
                setSelected([val.id]);
                setSelectedProduct([val]);
                handleStockOpnameAction(val);
              }}
            >
              Stock Opname
            </Button>
          </Box>
          <Box display={activeDashboard !== 'all_stock' ? 'none' : 'flex'}>
            <MenuList
              menu={
                val.is_active
                  ? [
                      {
                        label: 'Stock Opname',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          setParentId(val.product_parent_id);
                          handleStockOpnameAction(val);
                        },
                      },
                      {
                        label: 'Edit',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          formProductModal.openModal();
                          setEditProduct(val);
                        },
                      },
                      {
                        label: 'See Details',
                        onClick: () => {
                          navigate(`/b2b/inventory/${val.id}`);
                          dispatch(uiAction.closeYellowToast());
                        },
                      },
                      {
                        label: 'Make Inactive',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          changeStatusModal.openModal();
                          setSelected([val.id]);
                          setSelectedProduct([val]);
                          setNewStatus(false);
                        },
                      },
                      {
                        label: 'Delete',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          deleteModal.openModal();
                          setSelected([val.id]);
                          setSelectedProduct([val]);
                        },
                      },
                    ]
                  : [
                      {
                        label: 'Edit',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          formProductModal.openModal();
                          setEditProduct(val);
                        },
                      },
                      {
                        label: 'See Details',
                        onClick: () => {
                          navigate(`/b2b/inventory/${val.id}`);
                          dispatch(uiAction.closeYellowToast());
                        },
                      },
                      {
                        label: 'Make Active',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          changeStatusModal.openModal();
                          setSelected([val.id]);
                          setSelectedProduct([val]);
                          setNewStatus(true);
                        },
                      },
                      {
                        label: 'Delete',
                        onClick: () => {
                          dispatch(uiAction.closeYellowToast());
                          deleteModal.openModal();
                          setSelected([val.id]);
                          setSelectedProduct([val]);
                        },
                      },
                    ]
              }
            >
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </MenuList>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Grid container spacing={2}>
        {/* header (title, icon, back button, add button) */}
        <Grid item xs={12}>
          {/* title, icon, back button */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              gap="16px"
              height="fit-content"
            >
              {/* circle of paper box icon (on low/empty stock header) */}
              <CircleContainer
                display={activeDashboard !== 'all_stock' ? 'flex' : 'none'}
                width="66px"
                height="66px"
                activeDashboard={activeDashboard}
              >
                {/* total stock bullet */}
                <CircleTotalStock activeDashboard={activeDashboard}>
                  {activeDashboard === 'low_stock'
                    ? product.totalLowStock
                    : product.totalEmptyStock}
                </CircleTotalStock>
                {/* icon x / arrow down */}
                <MiniCircleOnIcon
                  activeDashboard={activeDashboard}
                  bottom="29%"
                  left="23%"
                  height="10px"
                  width="10px"
                >
                  {activeDashboard === 'empty_stock' ? (
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
                      }}
                    />
                  )}
                </MiniCircleOnIcon>
                <PaperBox sx={{ height: '34px', width: '34px' }} />
              </CircleContainer>
              {/* all title + back to all list button (for low/empty stock header) */}
              <TitleContainer>
                <Typography color="#000000" fontSize="26px" fontWeight="600">
                  {getDashboardTitle()}
                </Typography>
                <BackButton
                  display={activeDashboard !== 'all_stock' ? 'flex' : 'none'}
                  onClick={() => {
                    cleanSearch();
                    handleResetFilter();
                    dispatch(uiAction.closeYellowToast());
                    handleSetActiveDashboard(undefined);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <BackIcon sx={{ color: '#008e58' }} />
                  <Typography color="#008e58" fontSize="16px" fontWeight="bold">
                    See all List
                  </Typography>
                </BackButton>
              </TitleContainer>
            </Box>
            {activeDashboard === 'all_stock' ? (
              <Button
                endIcon={<ArrowIcon />}
                onClick={formProductModal.openModal}
                size="large"
              >
                Add New
              </Button>
            ) : (
              false
            )}
          </Stack>
        </Grid>

        {/* mini dashboard */}
        <Grid
          item
          xs={12}
          sx={{
            display: activeDashboard === 'all_stock' ? 'inline' : 'none',
          }}
        >
          <CardContainer>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              {/* low stock */}
              <DashboardContainer
                onClick={() => {
                  cleanSearch();
                  handleResetFilter();
                  dispatch(uiAction.closeYellowToast());
                  handleSetActiveDashboard('low_stock');
                }}
              >
                <CircleContainer
                  display="flex"
                  activeDashboard="low_stock"
                  height="45px"
                  width="45px"
                >
                  <MiniCircleOnIcon
                    bottom="28%"
                    left="20%"
                    activeDashboard="low_stock"
                    height="10px"
                    width="10px"
                  >
                    <ArrowDownwardIcon
                      sx={{ color: '#fff', height: '8px', width: '5px' }}
                    />
                  </MiniCircleOnIcon>
                  <PaperBox sx={{ height: '24px', width: '24px' }} />
                </CircleContainer>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {product.loadingLowStock ? (
                    <Skeleton width={70} height={30} />
                  ) : (
                    <Typography
                      fontSize="20px"
                      fontWeight={700}
                      color="#555555"
                    >
                      {product.totalLowStock} Items
                    </Typography>
                  )}

                  <Typography fontSize="10px" fontWeight="bold" color="#afafaf">
                    LOW STOCK
                  </Typography>
                </Box>
              </DashboardContainer>

              {/* empty stock */}
              <DashboardContainer
                onClick={() => {
                  cleanSearch();
                  handleResetFilter();
                  dispatch(uiAction.closeYellowToast());
                  handleSetActiveDashboard('empty_stock');
                }}
              >
                <CircleContainer
                  display="flex"
                  activeDashboard="empty_stock"
                  height="45px"
                  width="45px"
                >
                  <MiniCircleOnIcon
                    bottom="28%"
                    left="20%"
                    activeDashboard="empty_stock"
                    height="10px"
                    width="10px"
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
                  </MiniCircleOnIcon>
                  <PaperBox sx={{ height: '24px', width: '24px' }} />
                </CircleContainer>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {product.loadingEmptyStock ? (
                    <Skeleton width={70} height={30} />
                  ) : (
                    <Typography
                      fontSize="20px"
                      fontWeight={700}
                      color="#555555"
                    >
                      {product.totalEmptyStock} Items
                    </Typography>
                  )}

                  <Typography fontSize="10px" fontWeight="bold" color="#afafaf">
                    EMPTY STOCK
                  </Typography>
                </Box>
              </DashboardContainer>
            </Box>
          </CardContainer>
        </Grid>
        <Grid item xs={12}>
          <YellowToast />
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
                defaultValue={product.displayFilter.search}
                value={product.displayFilter.search}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyFilter();
                }}
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
                  <MenuItem
                    onClick={() => {
                      handleStockOpnameBatchAction();
                    }}
                  >
                    Stock Opname
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setNewStatus(false);
                      changeStatusModal.openModal();
                    }}
                  >
                    Make Inactive
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setNewStatus(true);
                      changeStatusModal.openModal();
                    }}
                  >
                    Make Active
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deleteModal.openModal();
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
                <Button
                  variant="outlined"
                  endIcon={<FilterIcon />}
                  onClick={handleExpandFilter}
                  disabled={product.loadingFilter}
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
                  {/* <FormLabel text="Grade">
                    <Autocomplete
                      id="filterGrade"
                      value={grade}
                      options={product.grades || []}
                      onChange={(e, value) => {
                        handleChangeGrade(value);
                      }}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            name="grade"
                            placeholder="Select Grade"
                            variant="outlined"
                          />
                        );
                      }}
                    />
                  </FormLabel>
                  <FormLabel text="B2B Type">
                    <Autocomplete
                      id="filterType"
                      value={type}
                      options={product.types || []}
                      onChange={(e, value) => {
                        handleChangeType(value);
                      }}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            name="type"
                            placeholder="Select Type"
                            variant="outlined"
                          />
                        );
                      }}
                    />
                  </FormLabel> */}
                  <FormLabel text="Product Category">
                    <Autocomplete
                      id="filterCategory"
                      value={category}
                      options={product.categories || []}
                      onChange={(e, value) => {
                        handleChangeCategory(value);
                      }}
                      getOptionLabel={(option) => `${option.name}`}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            name="category"
                            placeholder="Select Category"
                            variant="outlined"
                          />
                        );
                      }}
                    />
                  </FormLabel>
                  <Box
                    display={activeDashboard === 'all_stock' ? 'flex' : 'none'}
                    width="100%"
                  >
                    <FormLabel text="Status">
                      <Autocomplete
                        id="filterStatus"
                        value={status}
                        options={product.status || []}
                        onChange={(e, value) => {
                          handleChangeFilterStatus(value);
                        }}
                        getOptionLabel={(option) => `${option.label}`}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              name="category"
                              placeholder="Select Status"
                              variant="outlined"
                            />
                          );
                        }}
                      />
                    </FormLabel>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="8px"
                  pr="12px"
                >
                  <Button
                    sx={{ width: '90px' }}
                    variant="text"
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                  <Button sx={{ width: '90px' }} onClick={handleApplyFilter}>
                    Apply
                  </Button>
                </Box>
              </Box>
            </Collapse>
            {/* table */}
            <Box p="16px 12px">
              <Table
                data={product.products || []}
                headCells={headCell}
                totalData={product.totalProducts}
                loading={product.loading}
                count={product.params.count}
                selected={selected}
                setSelected={(array: (string | number)[]) => {
                  setSelected(array);
                  setSelectedProduct(() => {
                    const addition: Product[] = [];
                    array.map((id) => {
                      const obj: Product | undefined = product.products.find(
                        (item) => item.id === id,
                      );
                      if (
                        obj &&
                        selectedProduct.findIndex((item) => item.id === id) ===
                          -1
                      )
                        return addition.push(obj);
                    });
                    const existing = selectedProduct.filter(
                      (item) => array.indexOf(item.id) !== -1,
                    );
                    return [...existing, ...addition];
                  });
                }}
                onChangeRowPerpage={handleChangeRowPerPage}
                enableCheckBox
                onChangePage={handleChangePage}
                page={product.params.page}
                noDataComponent={
                  <NoDataWithAddBtn
                    onAdd={formProductModal.openModal}
                    headMsg="No Products Available"
                    message="Please add new product to make a change"
                  />
                }
              />
            </Box>
          </CardContainer>
        </Grid>
        <Modal
          open={changeStatusModal.open}
          onClose={changeStatusModal.closeModal}
        >
          <ChangeStatus
            totalItem={selected.length}
            selectedProduct={getBatchProductDesc()}
            onSubmit={handleChangeStatus}
            onClose={() => {
              changeStatusModal.closeModal();
            }}
            newStatus={newStatus}
          />
        </Modal>
        <Modal open={deleteModal.open} onClose={deleteModal.closeModal}>
          <Delete
            total={selected.length}
            selectedItemDesc={getBatchProductDesc()}
            onSubmit={handleDelete}
            onClose={deleteModal.closeModal}
          />
        </Modal>
      </Grid>
      <ModalComp
        open={stockOpnameModal.open}
        title="Stock Opname"
        onClose={handleCloseAllModalOnStockOpname}
      >
        <StockOpname
          totalItem={selectedProduct.length}
          items={selectedProduct}
          onClose={handleCloseStockOpname}
          selectPopupOpenFunc={handleOpenPopupSelectproduct}
        />
      </ModalComp>
      <ModalComp
        open={formProductModal.open}
        title={EditProduct ? 'Edit Product' : 'Add Product'}
        onClose={() => {
          formProductModal.closeModal();
          setEditProduct(null);
        }}
      >
        <Form
          onClose={() => {
            formProductModal.closeModal();
            setEditProduct(null);
          }}
          EditProduct={EditProduct}
        />
      </ModalComp>
      <PopupAddSelected
        parentId={parentId}
        selectedItem={selectedProduct}
        currentData={[]}
        open={listProductModal.open}
        onClose={() => {
          handleClosePopupSelectproduct();
        }}
        singleSelect
        onConfirm={setSelectedProductMoveStock}
        product={false}
        onApply={handleOnApplySelectProduct}
      />
      <ModalComp
        open={moveStockFormModal.open}
        title="Move Stock"
        onClose={handleCloseAllModalOnStockOpname}
        width="420px"
      >
        <MoveStockForm
          selectedItem={selectedProductMoveStock}
          onClose={handleCloseFormMoveStock}
          onSubmit={handleOnSubmitMoveStock}
          prevItem={selectedProduct}
          initData={payloadMoveStock.stock_change}
        />
      </ModalComp>
      <ModalComp
        open={moveStockConfirmationModal.open}
        onClose={handleCloseAllModalOnStockOpname}
        width="624px"
        noTitle
      >
        <ConfirmMoveStock
          onClose={handleCloseConfirmationMoveStock}
          prevItem={selectedProduct}
          moveItem={selectedProductMoveStock}
          payload={payloadMoveStock}
          onSubmit={handleSubmitMoveToStock}
        />
      </ModalComp>
    </Box>
  );
}
