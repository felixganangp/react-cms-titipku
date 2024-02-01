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

export default function DisburseForm() {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const navigate = useNavigate();
  const showFilter = useModal();

  const headCells: HeadCells<any>[] = [
    {
      id: 'rank',
      label: 'Rank',
      format: (value) => `#${value.rank}`,
    },
    {
      id: 'Join Date',
      label: 'Join Date',
      format: (value) => moment().format('DD MMM YYYY'),
    },
    {
      id: 'Merch_name',
      label: 'Merchant Name',
    },
    {
      id: 'type',
      label: 'Merchant Name',
    },
    {
      id: 'Limit',
      enableSort: true,
      label: 'Limit',
    },
    {
      id: 'Balance',
      enableSort: true,
      label: 'Balance',
    },
    {
      id: 'total_gmv',
      enableSort: true,
      label: 'Total GMV',
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
            data={[
              { rank: 1, id: 'skdldslk', 'Join Date': '2021-10-10' },
              {
                rank: 1,
                id: 'skdldslk',
                'Join Date': '2021-10-10',
                table_color: '#F9EBE7',
              },
              {
                rank: 1,
                id: 'skdldslk',
                'Join Date': '2021-10-10',
                table_color: '#FDF1DA',
              },
              { rank: 1, id: 'skdldslk', 'Join Date': '2021-10-10' },
            ]}
            selected={selected}
            setSelected={(e) => {
              setSelected(e);
            }}
            enableRadio
            orderBy="total_gmv"
            // loading={queryInnvoice.isLoading}
            // page={queryInnvoice.data?.page || 0}
            // count={queryInnvoice.data?.count || 0}
            // totalData={queryInnvoice.data?.total || 0}
            // onChangePage={(value) => {
            //   queryInnvoice.handleChangeParams({
            //     ...queryInnvoice.params,
            //     page: value,
            //   });
            //   queryInnvoice.handleToSetSearchParams('page', value.toString());
            // }}
          />
          <Stack direction="row" gap={2}>
            <Button variant="text" color="error" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              sx={{ borderRadius: '4px' }}
              // onClick={showFilter.toggleModal}
            >
              Next
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
