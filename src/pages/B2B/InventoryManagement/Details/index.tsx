/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Box, Typography, Button, Grid, Skeleton } from '@mui/material';
import Table from 'components/Table';
import ModalComp from 'components/Modal';
import useModal from 'hooks/useModal';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YellowToast from 'components/YellowToast';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { Log } from 'models/b2b/Product';
import NoImage from 'assets/no-image.svg';
import { CardContainer, GradingColor, StatusColor } from '../inventory.styled';
import Form from '../components/Form';

export default function InvoiceDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);
  const log = useAppSelector((state) => state.product.log);
  const details = useAppSelector((state) => state.product.details);
  const { id } = useParams();
  const formProductModal = useModal();

  useEffect(() => {
    dispatch(productAction.fetchGrade());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(
        productAction.setLogParams({
          product_id: parseInt(id),
        }),
      );
    }
  }, [id]);

  useEffect(() => {
    if (product.paramsLog.product_id)
      dispatch(productAction.fetchLog(product.paramsLog));
  }, [product.paramsLog]);

  useEffect(() => {
    if (id) {
      dispatch(productAction.fetchDetails(id));
    }
  }, []);

  const handleChangePage = (value: number) => {
    dispatch(
      productAction.setLogParams({
        page: value,
      }),
    );
  };

  const headCell = [
    {
      id: 'Editor',
      label: 'Editor',
      align: 'left',
      format: (val: Log) => (
        <Typography color="#0774d1">{val.created_by.name}</Typography>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
      format: (val: Log) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          height="min-content"
          margin={0}
          padding={0}
        >
          <p>
            {val.changes.action_type === 'create'
              ? 'Created this product'
              : val.changes.action_type === 'update'
              ? 'Editing'
              : val.changes.action_type === 'delete'
              ? 'Delete this product'
              : 'set to'}{' '}
          </p>
          &nbsp;
          <p style={{ height: 'fit-content' }}>
            <b>
              {val.changes.action_type === 'create' ? (
                ''
              ) : val.changes.action_type === 'update' ? (
                `${
                  val.changes.columns
                    ? val.changes.columns[0].name.replace(
                        /^./,
                        val.changes.columns[0].name[0].toUpperCase(),
                      )
                    : 'But No Changes'
                }`
              ) : val.changes.action_type === 'delete' ? (
                ''
              ) : val.changes.action_type === 'set_to_active' ? (
                <p style={{ color: '#008e58', margin: 0, padding: 0 }}>
                  Make Active
                </p>
              ) : (
                <p style={{ color: '#bf370c', margin: 0, padding: 0 }}>
                  Make Inactive
                </p>
              )}
            </b>
          </p>
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
                {product.loadingDetails ? (
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
              onClick={formProductModal.openModal}
            >
              Edit
            </Button>
          </Stack>

          <Grid container mt="30px" mx="10px" mb="10px">
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Product Name (SKU)
              </Typography>
              {product.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <Typography fontSize="14px">
                  {details?.product_parent.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Grade
              </Typography>
              {product.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <GradingColor grade={details ? details?.product_grade.id : 1}>
                  {details?.product_grade.name}
                </GradingColor>
              )}
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Category
              </Typography>
              {product.loadingDetails ? (
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
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Weight
              </Typography>
              {product.loadingDetails ? (
                <Skeleton width={50} height={25} />
              ) : (
                <Typography fontSize="14px">
                  {details ? details?.stock / 1000 : 0} Kg
                </Typography>
              )}
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Status
              </Typography>
              <StatusColor
                status={
                  !details?.is_active
                    ? 0
                    : details?.stock <= 0
                    ? 1
                    : details?.stock <= details?.low_stock_limit
                    ? 2
                    : 3
                }
              >
                {!details?.is_active
                  ? 'Inactive'
                  : details?.stock <= 0
                  ? 'Habis'
                  : details?.stock <= details?.low_stock_limit
                  ? 'Hampir Habis'
                  : 'Tersedia'}
              </StatusColor>
            </Grid>
          </Grid>
        </Box>
      </CardContainer>
      <Box my="10px" />
      <YellowToast />
      <CardContainer>
        <Box p="16px">
          <Table
            data={log || []}
            bgHeader="#cde3f6"
            headCells={headCell}
            totalData={product.totalLog}
            loading={product.loadingLog}
            count={product.paramsLog.count}
            page={product.paramsLog.page}
            onChangePage={handleChangePage}
          />
        </Box>
      </CardContainer>
      <ModalComp
        open={formProductModal.open}
        title="Edit Product"
        onClose={() => {
          formProductModal.closeModal();
        }}
      >
        <Form
          onClose={() => {
            formProductModal.closeModal();
          }}
          EditProductParent={details}
        />
      </ModalComp>
    </Box>
  );
}
