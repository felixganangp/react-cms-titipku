/* eslint-disable radix */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import React, { Children, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Stack,
  Box,
  Typography,
  Button,
  Grid,
  Modal,
  Skeleton,
} from '@mui/material';
import Table from 'components/Table';
import ModalComp from 'components/Modal';
import useModal from 'hooks/useModal';
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import YellowToast from 'components/YellowToast';
import numberSeperator from 'utils/numberSeperator';
import Delete from 'components/Delete';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { Log } from 'models/b2b/Product';
import NoImage from 'assets/no-image.svg';
import moment from 'moment';
import { uiAction } from 'store/slice/ui';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CardContainer, StatusColor } from '../inventory.styled';
import Form from '../components/Form';

export default function InvoiceDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);
  const log = useAppSelector((state) => state.product.log);
  const details = useAppSelector((state) => state.product.details);
  const { id } = useParams();
  const formProductModal = useModal();
  const deleteModal = useModal();

  // useEffect(() => {
  //   dispatch(productAction.fetchGrade());
  // }, []);

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

  const handleChangeRowPerPage = (value: number) => {
    dispatch(
      productAction.setLogParams({
        page: 1,
        count: value,
      }),
    );
  };

  const handleDelete = () => {
    deleteModal.closeModal();
    dispatch(productAction.delete([details?.id || 0]));
    dispatch(
      uiAction.openYellowToast({
        totalItem: 1,
        onUndoAction() {
          dispatch(productAction.undoDelete());
          dispatch(uiAction.closeYellowToast());
        },
        additionalMsg: '',
        action: 'delete',
        error: true,
      }),
    );
    navigate('/b2b/inventory');
  };

  const headCell = [
    {
      id: 'Editor',
      label: 'Editor',
      align: 'left',
      format: (val: Log) => <Typography>{val.created_by.name}</Typography>,
    },
    {
      id: 'time',
      label: 'Time',
      align: 'left',
      format: (val: Log) => (
        <Typography fontSize={14}>
          {moment.unix(val.created_at).format('DD/MM/YYYY . hh:mm')}
        </Typography>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      align: 'left',
      format: (val: Log) => {
        let text = '-';
        let render = <></>;

        switch (val.changes.action_type) {
          case 'create':
            text = 'Created this Product';
            break;
          case 'update':
            text = 'Edit Product';
            render = (
              <Stack>
                {val.changes.columns.map((item, index) => (
                  <Stack direction="row" key={index} alignItems="center">
                    <FiberManualRecordIcon sx={{ fontSize: 5, mx: 1 }} />
                    <Typography fontSize={14} fontWeight={500}>
                      {item.name.replace(/([a-z])([A-Z])/g, '$1 $2')}:
                    </Typography>
                    <Typography fontSize={14}>
                      Before: {item.old_value}, After: {item.new_value}
                    </Typography>
                  </Stack>
                ))}
                {val.changes.columns.length === 0 && (
                  <Typography> -</Typography>
                )}
              </Stack>
            );
            break;
          case 'process':
            text = 'Process this Product';
            render = (
              <Stack>
                {val.changes.columns.map((item, index) => (
                  <Stack direction="row" key={index} alignItems="center">
                    <Typography fontSize={14}>
                      Before: {item.old_value}, After: {item.new_value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            );
            break;
          default:
            break;
        }

        return (
          <Stack gap={0.5}>
            <Typography fontSize={14} fontWeight={600}>
              {text}
            </Typography>
            {render}
          </Stack>
        );
      },
    },
  ];

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const LoadingComp = ({ children }: { children: JSX.Element }) => {
    return product.loadingDetails ? (
      <Skeleton width={50} height={25} />
    ) : (
      <>{children}</>
    );
  };
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
                src={details?.image}
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
                    {details?.name}
                  </Typography>
                )}

                <Button
                  variant="text"
                  startIcon={<BackIcon />}
                  onClick={() => navigate('/b2b/inventory/')}
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

          <Grid container mt="30px" mx="10px" mb="10px" rowGap="30px">
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Average Price
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">
                  Rp. {numberSeperator(details?.average_price || 0)}
                </Typography>
              </LoadingComp>
            </Grid>

            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Selling Price
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">
                  Rp. {numberSeperator(details?.selling_price || 0)}
                </Typography>
              </LoadingComp>
            </Grid>

            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Category
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">
                  {details?.product_category}
                </Typography>
              </LoadingComp>
            </Grid>

            <Grid item xs={4} lg={4.8}>
              <Typography fontSize="14px" color="#0661ae">
                Description
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">{details?.description}</Typography>
              </LoadingComp>
            </Grid>

            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                In Stock
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">{details?.stock}</Typography>
              </LoadingComp>
            </Grid>
            <Grid item xs={4} lg={2.4}>
              <Typography fontSize="14px" color="#0661ae">
                Low Stock Alerts
              </Typography>
              <LoadingComp>
                <Typography fontSize="14px">
                  {details?.low_stock_limit}
                </Typography>
              </LoadingComp>
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
            onChangeRowPerpage={handleChangeRowPerPage}
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
          EditProduct={details}
          isDetail
          enableDeleteButton
          handleDeleteButton={() => {
            if (details) {
              formProductModal.closeModal();
              dispatch(uiAction.closeYellowToast());
              deleteModal.openModal();
            }
          }}
        />
      </ModalComp>
      <Modal open={deleteModal.open} onClose={deleteModal.closeModal}>
        <Delete
          total={1}
          selectedItemDesc={details?.name || ''}
          onSubmit={handleDelete}
          onClose={deleteModal.closeModal}
        />
      </Modal>
    </Box>
  );
}
