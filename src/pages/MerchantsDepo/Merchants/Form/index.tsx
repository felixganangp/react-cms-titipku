import MenuList from 'components/MenuList';
import { HeadCells } from 'components/Table/types';
import { Add, KeyboardArrowDown, MoreVert, Search } from '@mui/icons-material';
import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Menu,
  IconButton,
  Collapse,
  Grid,
  Autocomplete,
} from '@mui/material';
import Table from 'components/Table';
import moment from 'moment';
import { useState } from 'react';
import useModal from 'hooks/useModal';
import FormLabel from 'components/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import numberSeperator from 'utils/numberSeperator';
import { useMutation } from '@tanstack/react-query';
import { postMerchant } from 'service/MerchantDepo/Merchant';
import Modal from 'components/Modal';
import { useMerchantList } from '../../Hooks/useMerchant';
import ModalFormMerchantDepo from './components/ModalForm';

export default function MerchantForm() {
  const merchantQuery = useMerchantList();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const navigate = useNavigate();
  const showFilter = useModal();
  const modalForm = useModal();
  const { mutate } = useMutation(postMerchant);

  const headCells: HeadCells<any>[] = [
    // {
    //   id: 'rank',
    //   label: 'Rank',
    //   format: (value) => `#${value.rank}`,
    // },
    {
      id: 'Join Date',
      label: 'Join Date',
      format: (value) => moment(value.join_date * 1000).format('DD MMM YYYY'),
    },
    {
      id: 'merchant_name',
      label: 'Merchant Name',
      width: '200px',
      format: (value) => {
        const isNew = value.is_new && (
          <Typography
            color="primary"
            component="span"
            fontWeight="bold"
            fontSize="14px"
          >
            [NEW]{' '}
          </Typography>
        );
        return (
          <Typography>
            {isNew}
            {value.merchant_name}
          </Typography>
        );
      },
    },
    {
      id: 'last_month_gmv',
      enableSort: true,
      label: 'Last Month GMV',
      format: (value) => {
        if (!value.last_month_gmv) return <Typography>-</Typography>;
        return (
          <Typography>Rp {numberSeperator(value.last_month_gmv)}</Typography>
        );
      },
    },
    {
      id: 'last_month_total_tx',
      enableSort: true,
      label: 'Last Month Total Transaction',
      format: (value) => {
        if (!value.last_month_total_tx) return <Typography>-</Typography>;
        return (
          <Typography>
            Rp {numberSeperator(value.last_month_total_tx)}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box p="20px" bgcolor="#F5F7FA">
      <Stack spacing={2}>
        <Card>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" alignItems="center" gap={2} flex={1}>
              <TextField
                placeholder="Search for Invoice Number"
                size="small"
                sx={{ bgcolor: '#ebeff3', maxWidth: '560px', flex: 1 }}
                fullWidth
                // value={queryInnvoice.searchValue}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                // onChange={(event) => {
                //   queryInnvoice.handleSearch(event.target.value);
                //   queryInnvoice.handleToSetSearchParams(
                //     'search',
                //     event.target.value,
                //   );
                // }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <Button
                endIcon={<KeyboardArrowDown />}
                //   variant="outlined"
                onClick={showFilter.toggleModal}
              >
                Filter
              </Button>
            </Stack>
          </Stack>
          <Collapse in={showFilter.open}>
            <Grid
              container
              spacing={2}
              component="form"
              mt={2}
              // onSubmit={queryInnvoice.formikParams.handleSubmit}
            >
              <Grid item xs={12} md={5}>
                <FormLabel text="Pasar">
                  <Autocomplete
                    options={[]}
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Select Pasar"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormLabel text="Merchant Name">
                  <Autocomplete
                    options={[]}
                    // onBlur={() => {
                    //   formik.setFieldTouched('area');
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="Merchant"
                        placeholder="Select Merchant Name"
                        // error={
                        //   formik.touched.area && Boolean(formik.errors.area)
                        // }
                      />
                    )}
                  />
                </FormLabel>
              </Grid>
            </Grid>
          </Collapse>
        </Card>
        <Card>
          <Table
            headCells={headCells}
            data={merchantQuery.listData.map((item) => ({
              ...item,
            }))}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableRadio
            orderBy="total_gmv"
            loading={merchantQuery.isLoading}
            page={merchantQuery.data?.page || 0}
            count={merchantQuery.data?.count || 0}
            totalData={merchantQuery.data?.total || 0}
            onChangePage={(value) => {
              merchantQuery.handleChangeParams({
                ...merchantQuery.params,
                page: value,
              });
              merchantQuery.handleToSetSearchParams('page', value.toString());
            }}
          />
          <Stack direction="row" gap={2}>
            <Button
              variant="text"
              color="error"
              onClick={() => navigate('/depo/merchants/')}
            >
              Back
            </Button>
            <Button
              sx={{ borderRadius: '4px' }}
              disabled={selected.length === 0}
              // onClick={showFilter.toggleModal}
              onClick={() => {
                modalForm.openModal();
                // mutate(
                //   {},
                //   {
                //     onSuccess: () => {
                //       navigate(-1);
                //     },
                //     onError: () => {},
                //   },
                // );
              }}
            >
              Next
            </Button>
          </Stack>
        </Card>
      </Stack>
      <Modal
        open={modalForm.open}
        title="Create Invoice"
        onClose={modalForm.closeModal}
      >
        <ModalFormMerchantDepo />
      </Modal>
    </Box>
  );
}
