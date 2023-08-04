/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography,
  Button,
  Grid,
  Skeleton,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from 'components/Table';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';
import MenuList from 'components/MenuList';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YellowToast from 'components/YellowToast';
import { ProductRaw } from 'models/b2b/ProductRaw';
import { IsActiveType, Product } from 'models/b2b/Product';
import { HeadCells } from 'components/Table/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { rawAction } from 'store/slice/b2b/ProductRaw';
import { productAction } from 'store/slice/b2b/Product';
import NoImage from 'assets/no-image.svg';
import digitFormatter from 'utils/digitFormatter';
import { uiAction } from 'store/slice/ui';
import { CardContainer, GradingColor, StatusColor } from '../raw.styled';
import RawForm from '../components/form';

export default function InvoiceDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const raw = useAppSelector((state) => state.raw);
  const product = useAppSelector((state) => state.product);
  const details = useAppSelector((state) => state.raw.details);
  const { id } = useParams();

  // form
  const formModal = useModal();

  useEffect(() => {
    if (id) {
      dispatch(rawAction.fetchDetails(id));
      // dispatch(
      //   productAction.setParams({
      //     ...product.params,
      //     page: 1,
      //     product_parent_id: +id,
      //   }),
      // );
    }
  }, []);

  // TABLE LIST PRODUCT
  useEffect(() => {
    dispatch(productAction.fetchData(product.params));
  }, [product.params]);

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
            {val.product_grade.id !== 1 && (
              <GradingColor
                grade={val.product_grade.id}
              >{`${val.product_grade.name}`}</GradingColor>
            )}
            <Typography>{val.product_parent.name}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'b2bType',
      label: 'B2B Type',
      align: 'left',
      enableSort: false,
      format: (val: Product) => (
        <Typography>{val.product_type.name}</Typography>
      ),
    },
    {
      id: 'weight',
      label: 'In Stock ( Gram )',
      align: 'left',
      enableSort: false,
      format: (val: Product) => (
        <Typography>{numberWithCommas(val.stock)}</Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
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
            <Box display="flex">
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
          <Box display="flex">
            <MenuList
              menu={[
                {
                  label: 'See Details',
                  onClick: () => {
                    navigate(`/b2b/inventory/${val.id}`);
                    dispatch(uiAction.closeYellowToast());
                  },
                },
              ]}
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
      <CardContainer>
        <Box p="30px 16px">
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing="16px">
              <Box
                component="img"
                src={details?.product_parent.image_filepath}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NoImage;
                }}
                alt="ayam"
                width="54px"
                height="54px"
                borderRadius="100%"
                sx={{ objectFit: 'cover' }}
              />
              <Box>
                {raw.loadingDetails ? (
                  <Skeleton width={120} height={40} />
                ) : (
                  <Typography color="#000000" fontSize="24px" fontWeight="600">
                    {details?.product_parent.name}
                  </Typography>
                )}

                <Button
                  variant="text"
                  startIcon={<BackIcon />}
                  onClick={() => navigate(-1)}
                >
                  See all List
                </Button>
              </Box>
            </Stack>
            <Button
              sx={{ width: '110px' }}
              endIcon={<ArrowForwardIosIcon />}
              onClick={formModal.openModal}
            >
              Edit
            </Button>
          </Stack>

          <Grid container mt="30px" mx="10px" mb="10px" rowGap="30px">
            <Grid item xs={4} lg={3}>
              <Typography fontSize="14px" color="#0661ae">
                RAW ID
              </Typography>
              {raw.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <Typography fontSize="14px">
                  {details?.product_parent.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={4} lg={3}>
              <Typography fontSize="14px" color="#0661ae">
                Category
              </Typography>
              {raw.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : details?.product_parent?.product_parent_category ? (
                details?.product_parent?.product_parent_category.map(
                  (category) => (
                    <Typography fontSize="14px" key={category.id}>
                      {category.name}
                    </Typography>
                  ),
                )
              ) : (
                <Typography fontSize="14px">-</Typography>
              )}
            </Grid>

            <Grid item xs={4} lg={3}>
              <Typography fontSize="14px" color="#0661ae">
                In Stock
              </Typography>
              {raw.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <Typography fontSize="14px">
                  {details ? digitFormatter.format(details?.stock) : 0} gram
                </Typography>
              )}
            </Grid>

            <Grid item xs={4} lg={3}>
              <Typography fontSize="14px" color="#0661ae">
                Description
              </Typography>
              {raw.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <Typography fontSize="14px">{details?.description}</Typography>
              )}
            </Grid>
          </Grid>
          {/* Table Product */}
          <Typography fontSize="16px" color="#303030" fontWeight="600">
            Product Grade
          </Typography>
          <Box p="16px 12px">
            <Table
              data={product.products || []}
              headCells={headCell}
              totalData={product.totalProducts}
              loading={product.loading}
              count={product.params.count}
              enableCheckBox={false}
              onChangePage={handleChangePage}
              page={product.params.page}
            />
          </Box>
        </Box>
      </CardContainer>
      <Box my="10px" />
      <YellowToast />

      <Modal
        open={formModal.open}
        title="Edit Raw Product"
        onClose={formModal.closeModal}
      >
        <RawForm onClose={formModal.closeModal} data={details} />
      </Modal>
    </Box>
  );
}
