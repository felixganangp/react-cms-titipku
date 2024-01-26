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
} from '@mui/material';
import Table from 'components/Table';
import moment from 'moment';

export default function MerchantsPages() {
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
    {
      id: 'Action',
      label: 'Action',
      format: (value) => (
        <MenuList menu={[]}>
          <IconButton>
            <MoreVert />
          </IconButton>
        </MenuList>
      ),
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
              <Button startIcon={<Add />}>Add New</Button>
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
                //   onClick={showFilter.toggleModal}
              >
                Filter
              </Button>
              <Button
                endIcon={<KeyboardArrowDown />}
                //   variant="outlined"
                //   onClick={showFilter.toggleModal}
              >
                Action
              </Button>
            </Stack>
          </Stack>
        </Card>
        <Card>
          <Table
            headCells={headCells}
            data={[
              { rank: 1, 'Join Date': '2021-10-10' },
              { rank: 1, 'Join Date': '2021-10-10', table_color: '#F9EBE7' },
              { rank: 1, 'Join Date': '2021-10-10', table_color: '#FDF1DA' },
              { rank: 1, 'Join Date': '2021-10-10' },
            ]}
            selected={[]}
            setSelected={() => {}}
            enableCheckBox
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
        </Card>
      </Stack>
    </Box>
  );
}
