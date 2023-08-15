import React, { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Stack,
  Modal,
} from '@mui/material';
import Table from 'components/Table';
import useModal from 'hooks/useModal';
import ModalComp from 'components/Modal';
import ArrowIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import digitFormatter from 'utils/digitFormatter';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuList from 'components/MenuList';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { InboundAction } from 'store/slice/b2b/Inbound';
import { SupplierAction } from 'store/slice/b2b/Supplier';
import DetailPopUp from './Details';
import FormInbound from './components/form';

export default function InboundPage() {
  const dispatch = useAppDispatch();
  const inbound = useAppSelector((state) => state.inbound);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('1');
  const formModal = useModal();

  React.useEffect(() => {
    dispatch(InboundAction.fetchData(inbound.params));
  }, [inbound.params]);

  const handleSearch = (value: string) => {
    dispatch(
      InboundAction.setParams({
        page: 1,
        // defaultSearch: value,
        search: value,
      }),
    );
  };

  const handleChangePage = (value: number) => {
    dispatch(
      InboundAction.setParams({
        page: value,
      }),
    );
  };

  const handleChangeRowPerpage = (value: number) => {
    dispatch(
      InboundAction.setParams({
        page: 1,
        count: value,
      }),
    );
  };

  const handleAddInbound = () => {
    dispatch(SupplierAction.fetchData({ page: 1, count: 1000 }));
    formModal.openModal();
  };

  const handleDetail = async (id: string) => {
    // dispatch(SupplierAction.fetchData({ page: 1, count: 1000 }));
    await setCurrentId(id);
    setOpenPopUp(true);
  };

  const headCell = [
    {
      id: 'supplier_id',
      label: 'Supplier',
      align: 'left',
      format: (val: any) => <Typography>{val.supplier.name}</Typography>,
    },
    {
      id: 'code',
      label: 'Inbound Code',
      align: 'left',
    },
    {
      id: 'description',
      label: 'Note',
      align: 'left',
    },
    {
      id: 'created_at',
      label: 'Inbound Date',
      align: 'left',
      format: (val: any) => {
        return <p>{moment.unix(val.created_at).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      id: 'total_sku',
      label: 'Total SKU',
      align: 'left',
    },
    {
      id: 'grand_total',
      label: 'Grand Total',
      align: 'left',
      format: (val: any) => (
        <Typography>Rp {digitFormatter.format(val.grand_total)}</Typography>
      ),
    },
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
                label: 'Detail',
                onClick: () => {
                  setCurrentId(val.id);
                  handleDetail(val.id);
                  // setOpenPopUp(!openPopUp);
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
          Inbound Management
        </Typography>
        <Button endIcon={<ArrowIcon />} onClick={handleAddInbound} size="large">
          Add Inbound
        </Button>
      </Stack>
      <Box mt={2} p={2} bgcolor="#fff" border="1px solid #EBEFF3">
        <TextField
          placeholder="Search Inbound"
          size="small"
          sx={{ flex: 1, bgcolor: '#f8f8f8', maxWidth: '560px' }}
          fullWidth
          value={inbound.params.search}
          onChange={(event) => handleSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box mt={2}>
          <Table
            data={inbound.data}
            headCells={headCell}
            totalData={inbound.total}
            loading={inbound.loading}
            count={inbound.params.count}
            page={inbound.params.page}
            onChangePage={(page) => handleChangePage(page)}
            onChangeRowPerpage={(page) => handleChangeRowPerpage(page)}
          />
        </Box>
      </Box>

      <DetailPopUp
        open={openPopUp}
        onClose={() => setOpenPopUp(!openPopUp)}
        ids={currentId}
      />
      <ModalComp
        open={formModal.open}
        title="Product Inbound"
        onClose={formModal.closeModal}
        width="700px"
        maxWidth="md"
      >
        <FormInbound onClose={formModal.closeModal} />
      </ModalComp>
    </Box>
  );
}
