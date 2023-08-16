import React, { useState, useEffect, useCallback } from 'react';
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
import Add from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import { uiAction } from 'store/slice/ui';
import MenuList from 'components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteModal from 'components/Delete/freetext';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import { UomTypes } from 'models/b2b/Uom';
import YellowToast from 'components/YellowToast';
import { debounce } from 'lodash';
import Form from './components/Form';

export default function CategoryPage() {
  const dispatch = useAppDispatch();
  const { categories, category } = useAppSelector((state) => state.product);

  const deleteModal = useModal();
  const formModal = useModal();
  const [selected, setSelected] = useState<UomTypes | null>(null);
  const isEdited = Boolean(selected);

  useEffect(() => {
    dispatch(productAction.fetchCategory(category.params));
  }, [category.params]);

  const handleChangePage = (value: number) => {
    dispatch(
      productAction.setParamsCategory({
        page: value,
      }),
    );
  };

  const handleChangeRowPerpage = (value: number) => {
    dispatch(
      productAction.setParamsCategory({
        page: 1,
        count: value,
      }),
    );
  };

  const handleSearch = (value: string) => {
    dispatch(
      productAction.setParamsCategory({
        search: value,
        page: 1,
      }),
    );
  };
  const handleSeachDebounce = useCallback(debounce(handleSearch, 80), []);

  const handleDelete = () => {
    if (selected?.id) {
      dispatch(productAction.deleteCategory({ id: selected.id }));
      dispatch(
        uiAction.openYellowToast({
          totalItem: 1,
          additionalMsg: 'Category successfully',
          action: 'deleted!',
          error: true,
          onUndoAction: () => {
            dispatch(
              productAction.updateCategory({
                id: selected.id,
                body: { name: selected.name },
                isUndo: true,
              }),
            );
          },
          noUndo: false,
        }),
      );
      setSelected(null);
      deleteModal.closeModal();
    }
  };
  const headCell = [
    {
      id: 'name',
      label: 'Category',
      align: 'left',
      width: '95%',
    },
    {
      id: 'menu',
      label: '',
      align: 'left',
      format: (val: any) => (
        <>
          <MenuList
            menu={[
              {
                label: 'Edit',
                onClick: () => {
                  formModal.openModal();
                  setSelected(val);
                },
              },
              {
                label: 'Delete',
                disabled: val.product_count > 0,
                onClick: () => {
                  deleteModal.openModal();
                  setSelected(val);
                },
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Category Management
        </Typography>
      </Stack>
      <Box mt={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Stack direction="row" gap={1} p={2}>
          <Button
            startIcon={<Add />}
            onClick={formModal.openModal}
            size="large"
          >
            Add Category
          </Button>
          <TextField
            placeholder="Search Item"
            size="small"
            sx={{ flex: 1, bgcolor: '#f8f8f8', maxWidth: '560px' }}
            fullWidth
            defaultValue={category.params.search}
            // value={product.displayFilter.search}
            onChange={(e) => handleSeachDebounce(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <YellowToast />
        <Box p={2}>
          <Table
            data={categories}
            headCells={headCell}
            loading={category.isLoading}
            totalData={category.totalProduct}
            count={category.params.count}
            page={category.params.page}
            onChangePage={(page) => handleChangePage(page)}
            onChangeRowPerpage={(page) => handleChangeRowPerpage(page)}
          />
        </Box>
      </Box>
      <Modal open={deleteModal.open} onClose={deleteModal.closeModal}>
        <DeleteModal
          onClose={deleteModal.closeModal}
          headerText={`Delete Category ${selected?.name}?`}
          desc={
            <>
              Are you sure want to delete this Category? Category{' '}
              <b>{selected?.name}</b> is used by{' '}
              <b>{selected?.product_count} product</b>
            </>
          }
          onSubmit={handleDelete}
        />
      </Modal>
      <ModalComp
        open={formModal.open}
        title={isEdited ? 'Edit Category' : 'Add Category'}
        onClose={() => {
          formModal.closeModal();
          setSelected(null);
        }}
      >
        <Form
          isEdit={isEdited}
          selected={selected}
          onClose={formModal.closeModal}
        />
      </ModalComp>
    </Box>
  );
}
