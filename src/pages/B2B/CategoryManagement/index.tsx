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
import Table from 'components/Table';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { productAction } from 'store/slice/b2b/Product';
import MenuList from 'components/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteModal from 'components/Delete/freetext';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import { UomTypes } from 'models/b2b/Uom';
import YellowToast from 'components/YellowToast';
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

  const headCell = [
    {
      id: 'name',
      label: 'Category',
      align: 'left',
      width: '80%',
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
        <Box p={2}>
          <Button
            endIcon={<ArrowIcon />}
            onClick={formModal.openModal}
            size="large"
          >
            Add Category
          </Button>
        </Box>
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
          headerText={`Delete UoM ${selected?.name}?`}
          desc={
            <>
              Are you sure want to delete this Category? UoM Ekor is used by{' '}
              {selected?.product_count} product
            </>
          }
          onSubmit={() => {
            if (selected?.id) {
              dispatch(productAction.deleteCategory({ id: selected.id }));
              setSelected(null);
              deleteModal.closeModal();
            }
          }}
        />
      </Modal>
      <ModalComp
        open={formModal.open}
        title={isEdited ? 'Edit Category' : 'AddCategory'}
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
