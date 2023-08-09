import React, { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Stack,
} from '@mui/material';

import { CreateSupplier } from 'models/b2b/Supplier';
import Table from 'components/Table';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'utils/debounce';
import moment from 'moment';
import digitFormatter from 'utils/digitFormatter';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { SupplierAction } from 'store/slice/b2b/Supplier';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import FormSupplier from './components/form';

interface FormDataType {
  isEdit: boolean;
  data: CreateSupplier;
}

export default function SupplierPage() {
  const dispatch = useAppDispatch();
  const supplier = useAppSelector((state) => state.supplier);
  const formModal = useModal();

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
    setFormData({
      isEdit: false,
      data: {
        name: '',
        address: '',
        phone_number: '',
      },
    });
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
      label: 'Action',
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
                  formModal.openModal();
                },
              },
              {
                label: 'Delete',
                onClick: () => {},
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
      {/* <DetailPopUp
        open={openPopUp}
        onClose={() => setOpenPopUp(!openPopUp)}
        ids={currentId}
      /> */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize="26px" fontWeight="600" fontFamily="Montserrat">
          Supplier Management
        </Typography>
      </Stack>
      <Box mt={2} p={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <Button
          startIcon={<AddIcon />}
          onClick={formModal.openModal}
          size="large"
        >
          Add Supplier
        </Button>
        <Box mt={2}>
          <Table
            data={supplier.data}
            headCells={headCell}
            totalData={supplier.total}
            loading={supplier.loading}
            count={supplier.params.count}
            page={supplier.params.page}
            onChangePage={(page) => handleChangePage(page)}
            onChangeRowPerpage={(page) => handleChangeRowPerpage(page)}
          />
        </Box>
      </Box>

      <Modal
        open={formModal.open}
        title={`${formData.isEdit ? 'Edit ' : 'Add New '} Role User`}
        onClose={onCloseForm}
      >
        <FormSupplier
          onClose={onCloseForm}
          data={formData.data}
          isEdit={formData.isEdit}
        />
      </Modal>
    </Box>
  );
}
