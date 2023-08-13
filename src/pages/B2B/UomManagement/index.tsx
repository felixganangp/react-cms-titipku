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
import AddIcon from '@mui/icons-material/Add';
import Form from './components/Form';

export default function UomPage() {
  const dispatch = useAppDispatch();
  const { uom, totalUom, paramsOum, loadingFilter } = useAppSelector(
    (state) => state.product,
  );

  const deleteModal = useModal();
  const formModal = useModal();
  const [selected, setSelected] = useState<UomTypes | null>(null);
  const isEdited = Boolean(selected);

  useEffect(() => {
    dispatch(productAction.fetchUom(paramsOum));
  }, [paramsOum]);

  const handleChangePage = (value: number) => {
    dispatch(
      productAction.setParamsUom({
        page: value,
      }),
    );
  };

  const handleChangeRowPerpage = (value: number) => {
    dispatch(
      productAction.setParamsUom({
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
      width: '40%',
    },
    {
      id: 'total_product',
      label: 'Used by ',
      align: 'left',
      width: '50%',
      format: (val: any) => {
        return <Typography>{val?.total_product} Products</Typography>;
      },
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
                disabled: val.total_product > 0,
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
          Unit of Measurement Management
        </Typography>
      </Stack>
      <Box mt={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Box p={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={formModal.openModal}
            size="large"
          >
            Add UoM
          </Button>
        </Box>
        <YellowToast />
        <Box p={2}>
          <Table
            data={uom}
            headCells={headCell}
            loading={loadingFilter}
            totalData={totalUom}
            count={paramsOum.count}
            page={paramsOum.page}
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
              Are you sure want to delete this UoM? UoM {selected?.name} is used
              by {selected?.total_product} product
            </>
          }
          onSubmit={() => {
            if (selected?.id) {
              dispatch(productAction.deleteUom({ id: selected.id }));
              setSelected(null);
              deleteModal.closeModal();
            }
          }}
        />
      </Modal>
      <ModalComp
        open={formModal.open}
        title={
          isEdited ? 'Edit Unit of Measurement' : 'Add Unit of Measurement'
        }
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
