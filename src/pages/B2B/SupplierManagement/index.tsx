/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  Modal,
} from '@mui/material';
import { CreateSupplier, Supplier } from 'models/b2b/Supplier';
import { uiAction } from 'store/slice/ui';
import YellowToast from 'components/YellowToast';
import Table from 'components/Table';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from 'utils/debounce';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SupplierAction } from 'store/slice/b2b/Supplier';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import DeleteModal from './components/delete';
import FormSupplier from './components/form';

interface FormDataType {
  isEdit: boolean;
  data: CreateSupplier;
}

export default function SupplierPage() {
  const dispatch = useAppDispatch();
  const supplier = useAppSelector((state) => state.supplier);
  const formModal = useModal();

  // Batch Action
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier[]>([]);
  const deleteModal = useModal();

  // Delete Data
  const handleDelete = () => {
    setSelected([]);
    deleteModal.closeModal();
    dispatch(SupplierAction.delete(selected));
    dispatch(
      uiAction.openYellowToast({
        totalItem: selected.length,
        itemType: 'Supplier',
        additionalMsg: `successfully`,
        action: 'Deleted',
        error: true,
        noUndo: true,
      }),
    );
  };

  const countInbound = () => {
    let total = 0;
    selectedSupplier.forEach((data) => {
      total += data.total_inbound;
    });
    return total;
  };

  const getBatchSupplierDesc = () =>
    selectedSupplier.length > 0
      ? selectedSupplier.length > 3
        ? `${selectedSupplier
            .slice(0, 3)
            .map((item) => `${item.name}`)
            .join(',')} ... and ${selectedSupplier.length - 3} others`
        : selectedSupplier.map((item) => `${item.name}`).join(', ')
      : '';

  const getHeaderTextModal = () => {
    if (selectedSupplier.length > 1) {
      return <b>Delete {getBatchSupplierDesc()}?</b>;
    }
    if (selectedSupplier.length === 1) {
      return `Delete Supplier ${getBatchSupplierDesc()} ?`;
    }
  };

  const getTextModal = () => {
    return (
      <>
        Are you sure want to delete this supplier?{' '}
        {countInbound() > 0 && (
          <>
            <b>Supplier {getBatchSupplierDesc()}</b> is used by{' '}
            <b>{countInbound()} inbounds</b>
          </>
        )}
      </>
    );
  };

  const [formData, setFormData] = useState<FormDataType>({
    isEdit: false,
    data: {
      name: '',
      address: '',
      phone_number: '',
    },
  });

  const onCloseForm = async () => {
    await dispatch(SupplierAction.fetchData(supplier.params));
    dispatch(
      uiAction.openYellowToast({
        totalItem: 1,
        itemType: 'Supplier',
        additionalMsg: `successfully`,
        action: formData.isEdit ? 'Edited!' : 'Added!',
        error: false,
        noUndo: true,
      }),
    );
    setFormData({
      isEdit: false,
      data: {
        name: '',
        address: '',
        phone_number: '',
      },
    });
    setSelected([]);
    formModal.closeModal();
  };

  React.useEffect(() => {
    dispatch(SupplierAction.fetchData(supplier.params));
  }, [supplier.params]);

  const handleSearch = (value: string) => {
    dispatch(
      SupplierAction.setParams({
        page: 1,
        // defaultSearch: value,
        search: value,
      }),
    );
  };
  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  const handleChangePage = (value: number) => {
    dispatch(
      SupplierAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeRowPerpage = (value: number) => {
    dispatch(
      SupplierAction.setParams({
        page: 1,
        count: value,
      }),
    );
  };

  const headCell = [
    {
      id: 'name',
      label: 'Supplier Name',
      align: 'left',
      format: (val: any) => <Typography>{val.name}</Typography>,
    },
    {
      id: 'address',
      label: 'Address',
      align: 'left',
    },
    {
      id: 'phone_number',
      label: 'Phone',
      align: 'left',
    },
    // {
    //   id: 'grand_total',
    //   label: 'Grand Total',
    //   align: 'left',
    //   format: (val: any) => (
    //     <Typography>Rp {digitFormatter.format(val.grand_total)}</Typography>
    //   ),
    // },
    {
      id: 'menu',
      label: '',
      align: 'left',
      width: '20px',
      format: (val: any) => (
        <div>
          <MenuList
            menu={[
              {
                label: 'Edit',
                onClick: () => {
                  const data: FormDataType = {
                    isEdit: true,
                    data: {
                      name: val.name,
                      phone_number: val.phone_number,
                      address: val.address,
                      id: val.id,
                    },
                  };
                  setFormData(data);
                  setSelected([val.id]);
                  formModal.openModal();
                },
              },
              {
                label: 'Delete',
                onClick: () => {
                  dispatch(uiAction.closeYellowToast());
                  deleteModal.openModal();
                  setSelected([val.id]);
                  setSelectedSupplier([val]);
                },
              },
            ]}
          >
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuList>
        </div>
      ),
    },
  ];

  return (
    <Box p="20px" bgcolor="#f8f8f8">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Supplier Management
        </Typography>
      </Stack>
      <Box mt={2} p={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<AddIcon />}
            onClick={formModal.openModal}
            size="large"
          >
            Add Supplier
          </Button>

          <Button
            startIcon={<DeleteIcon />}
            onClick={deleteModal.openModal}
            size="large"
            color="error"
            disabled={!selected.length}
          >
            Delete
          </Button>
        </Box>

        <Box mt={2}>
          <YellowToast />
          <Table
            data={supplier.data}
            headCells={headCell}
            totalData={supplier.total}
            loading={supplier.loading}
            count={supplier.params.count}
            page={supplier.params.page}
            onChangePage={(page) => handleChangePage(page)}
            onChangeRowPerpage={(page) => handleChangeRowPerpage(page)}
            enableCheckBox
            selected={selected}
            setSelected={(array: (string | number)[]) => {
              setSelected(array);
              setSelectedSupplier(() => {
                const addition: Supplier[] = [];
                array.map((id) => {
                  const obj: Supplier | undefined = supplier.data.find(
                    (item: any) => item.id === id,
                  );
                  if (
                    obj &&
                    selectedSupplier.findIndex((item) => item.id === id) === -1
                  )
                    return addition.push(obj);
                });
                const existing = selectedSupplier.filter(
                  (item) => array.indexOf(item.id) !== -1,
                );
                return [...existing, ...addition];
              });
            }}
          />
        </Box>
      </Box>
      <Modal open={deleteModal.open} onClose={deleteModal.closeModal}>
        <DeleteModal
          headerText={getHeaderTextModal()}
          desc={getTextModal()}
          onSubmit={handleDelete}
          onClose={deleteModal.closeModal}
        />
      </Modal>
      <ModalComp
        open={formModal.open}
        title={`${formData.isEdit ? 'Edit ' : 'Add New '} Supplier`}
        onClose={formModal.closeModal}
      >
        <FormSupplier
          onClose={onCloseForm}
          data={formData.data}
          isEdit={formData.isEdit}
        />
      </ModalComp>
    </Box>
  );
}
