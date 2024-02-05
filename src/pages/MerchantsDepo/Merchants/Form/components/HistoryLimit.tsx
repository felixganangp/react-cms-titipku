import FormControl from 'components/FormLabel';
import { Box, TextField } from '@mui/material';
import { useGetLimitHistory } from 'pages/MerchantsDepo/hooks/useMerchant';
import { HeadCells } from 'components/Table/types';
import moment from 'moment';
import numberSeperator from 'utils/numberSeperator';
import Table from 'components/Table';

export default function HistoryLimit({
  merchantName,
  id,
}: {
  merchantName: string;
  id?: string;
}) {
  const limitQuery = useGetLimitHistory(id);

  const headCells: HeadCells<any>[] = [
    {
      id: 'updatedAt',
      label: 'Updated At',
      format: (value) =>
        moment(value?.created_at ? value?.created_at : undefined).format(
          'DD MMM YYYY ',
        ),
    },
    {
      id: 'Old limit',
      label: 'Old Limit',
      format: (value) => `Rp ${numberSeperator(value?.new_value || '0')}`,
    },
    {
      id: 'New Limit',
      label: 'New Limit',
      format: (value) => `Rp ${numberSeperator(value?.new_value || '0')}`,
    },
  ];
  return (
    <Box p="24px">
      <FormControl text="Merchant Name" required>
        <TextField
          type="text"
          name="amount"
          placeholder="Input Merchant name"
          fullWidth
          autoComplete="off"
          disabled
          value={merchantName}
        />
      </FormControl>
      <Table
        disableNumber
        headCells={headCells}
        data={limitQuery.listData}
        loading={limitQuery.isLoading}
        page={limitQuery.data?.page || 0}
        count={limitQuery.data?.count || 0}
        totalData={limitQuery.data?.total || 0}
        onChangePage={(value) => {
          limitQuery.handleChangeParams({
            ...limitQuery.params,
            page: value,
          });
        }}
      />
    </Box>
  );
}
