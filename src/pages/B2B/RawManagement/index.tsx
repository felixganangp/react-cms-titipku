/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
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
  IconButton,
} from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import FormLabel from 'components/FormLabel';
import Table from 'components/Table';
import { HeadCells } from 'components/Table/types';
import { ProductRaw } from 'models/b2b/ProductRaw';
import NoImage from 'assets/no-image.svg';
import { rawAction } from 'store/slice/b2b/ProductRaw';
import MenuList from 'components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';
import YellowToast from 'components/YellowToast';
import NoDataWithAddBtn from 'components/Table/NoDataView/NoData';
import { CardContainer, CategoryStyle } from './raw.styled';
import RawForm from './components/form';

export default function RawPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.raw.raws);
  const raw = useAppSelector((state) => state.raw);

  // form
  const formModal = useModal();
  const [formData, setFormData] = useState<ProductRaw | null>(null);

  // BATCH ACTION
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [selectedRaw, setSelectedRaw] = useState<ProductRaw[]>([]);
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
  const { search, category } = useAppSelector(
    (state) => state.raw.displayFilter,
  );

  useEffect(() => {
    dispatch(rawAction.fetchCategory());
  }, []);

  const handleExpandFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleSearch = (value: string) => {
    dispatch(
      rawAction.setDisplayFilter({
        search: value,
      }),
    );
  };

  const handleChangeCategory = (value: any) => {
    dispatch(
      rawAction.setDisplayFilter({
        category: value,
      }),
    );
  };

  const handleApplyFilter = () => {
    dispatch(
      rawAction.setParams({
        ...raw.params,
        page: 1,
        search,
        product_parent_category_id: category ? category.id : undefined,
      }),
    );
  };

  const handleResetFilter = () => {
    dispatch(
      rawAction.setParams({
        page: 1,
        product_parent_category_id: undefined,
      }),
    );
    dispatch(
      rawAction.setDisplayFilter({
        category: null,
      }),
    );
  };

  // table
  useEffect(() => {
    dispatch(rawAction.fetchData(raw.params));
  }, [raw.params]);

  const handleChangeRowPerPage = (value: number) => {
    dispatch(
      rawAction.setParams({
        page: 1,
        count: value,
      }),
    );
  };

  const handleChangePage = (value: number) => {
    dispatch(
      rawAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeSort = (value: {
    orderBy: string | number;
    orderType: 'asc' | 'desc';
  }) => {
    dispatch(
      rawAction.setParams({
        page: 1,
        order_by: value.orderBy,
        order_type: value.orderType,
      }),
    );
  };

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const headCell: HeadCells<ProductRaw>[] = [
    {
      id: 'id',
      label: 'Raw ID',
      align: 'left',
      enableSort: true,
      format: (val: ProductRaw) => <Typography>{`RAW-${val.id}`}</Typography>,
    },
    {
      id: 'product',
      label: 'Product / SKU',
      align: 'left',
      // enableSort: true,
      format: (val: ProductRaw) => (
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
          <img
            src={val.product_parent.image_filepath}
            alt={val.product_parent.name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NoImage;
            }}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
            }}
          />
          <Typography>{val.product_parent.name}</Typography>
        </Box>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      align: 'left',
      format: (val: ProductRaw) => (
        <CategoryStyle>
          {val.product_parent.product_parent_category
            ? val.product_parent.product_parent_category[0].name
            : '-'}
        </CategoryStyle>
      ),
    },
    {
      id: 'stock',
      label: 'In Stock (gram)',
      align: 'left',
      format: (val: ProductRaw) => (
        <Typography>{numberWithCommas(val.stock)}</Typography>
      ),
    },
    {
      id: 'action_menu',
      label: '',
      align: 'left',
      width: '20px',
      format: (val: ProductRaw) => (
        <MenuList
          menu={[
            {
              label: 'Edit',
              onClick: () => {
                setFormData(val);
                formModal.openModal();
              },
            },
            {
              label: 'See Details',
              onClick: () => console.log('see details'),
            },
            {
              label: 'Delete',
              onClick: () => console.log('delete'),
            },
          ]}
        >
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </MenuList>
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
            <Button
              endIcon={<ArrowIcon />}
              onClick={() => {
                setFormData(null);
                formModal.openModal();
              }}
            >
              Add New
            </Button>
          </Stack>
        </Grid>
        {/* search & filter */}
        <Grid item xs={12}>
          <YellowToast />
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
                defaultValue={raw.displayFilter.search}
                value={raw.displayFilter.search}
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
                    id="filterCategory"
                    value={category}
                    options={raw.categories}
                    onChange={(e, value) => {
                      handleChangeCategory(value);
                    }}
                    getOptionLabel={(option) => `${option.name}`}
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

            <Table
              data={data}
              headCells={headCell}
              totalData={raw.total}
              count={raw.params.count}
              loading={raw.loading}
              selected={selected}
              setSelected={(arr: (string | number)[]) => {
                setSelected(arr);
                setSelectedRaw(() => {
                  const addition: ProductRaw[] = [];
                  arr.map((id) => {
                    const obj: ProductRaw | undefined = data.find(
                      (item) => item.id === id,
                    );
                    if (
                      obj &&
                      selectedRaw.findIndex((item) => item.id === id) === -1
                    )
                      return addition.push(obj);
                  });
                  const existing = selectedRaw.filter(
                    (item) => arr.indexOf(item.id) !== -1,
                  );
                  return [...existing, ...addition];
                });
              }}
              onChangeRowPerpage={handleChangeRowPerPage}
              enableCheckBox
              page={raw.params.page}
              onChangePage={handleChangePage}
              onChangeSort={handleChangeSort}
              noDataComponent={
                <NoDataWithAddBtn
                  onAdd={() => {
                    formModal.openModal();
                    setFormData(null);
                  }}
                  headMsg="No Products Available"
                  message="Please add new product to make a change"
                />
              }
            />
          </CardContainer>
        </Grid>
      </Grid>
      <Modal
        open={formModal.open}
        title={formData ? 'Edit Raw Product' : 'Add Raw Product'}
        onClose={formModal.closeModal}
      >
        <RawForm onClose={formModal.closeModal} data={formData} />
      </Modal>
    </Box>
  );
}
