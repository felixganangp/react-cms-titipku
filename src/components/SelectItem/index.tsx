import { useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Radio,
  Checkbox,
  Typography,
} from '@mui/material';
import ModalComp from 'components/Modal';
import debounce from 'utils/debounce';
import SearchIcon from '@mui/icons-material/Search';
import EmptyProduct from 'assets/empty-product.svg';

interface SelectItemProsp {
  open: boolean;
  title?: string;
  data: any[];
  value: number[];
  multiple?: boolean;
  renderItem: (props: any) => JSX.Element;
  onChangeSearch?: (e: string) => void;
  onClose: () => void;
}

export default function SelectItem({
  open,
  title,
  data,
  renderItem,
  multiple,
  value,
  onChangeSearch,
  onClose,
}: SelectItemProsp) {
  const handleSearch = (search: string) => {
    if (onChangeSearch) {
      onChangeSearch(search);
    }
  };

  const debounceSearch = useCallback(debounce(handleSearch, 1000), []);

  return (
    <ModalComp
      open={open}
      onClose={onClose}
      title={`Select ${title}`}
      width="500px"
    >
      <>
        <Box p={2}>
          <TextField
            type="text"
            name="stock"
            placeholder={`Search ${title}`}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                color: '#929395',
                '& .MuiSvgIcon-root': {
                  color: '#929395',
                },
              },
            }}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => {
              debounceSearch(event.target.value);
            }}
          />
          <Stack
            mt={2}
            gap="5px"
            height="100%"
            sx={{ overflowY: 'auto', maxHeight: 400 }}
          >
            {data.length === 0 && (
              <Stack alignItems="center" gap={1} textAlign="center">
                <Box
                  component="img"
                  src={EmptyProduct}
                  width="200px"
                  margin="auto"
                />
                <Typography fontWeight="500">No Products Found</Typography>
                <Typography>
                  Your search did not match any products. Please try again with
                  a different keyword or filter.
                </Typography>
              </Stack>
            )}

            {data.map((val) => (
              <Stack
                key={val.id}
                direction="row"
                alignItems="center"
                bgcolor={value.includes(val.id) ? '#ddf0e9' : 'unset'}
                py={1}
                gap={1}
                sx={{ cursor: 'pointer' }}
              >
                {/* <Radio /> */}
                {multiple ? (
                  <Checkbox checked={value.includes(val.id)} />
                ) : (
                  <Radio checked={value.includes(val.id)} />
                )}
                {renderItem(val)}
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box
          width="100%"
          display="flex"
          gap="10px"
          justifyContent="end"
          // mt="50px"
          sx={{
            padding: '10px',
            boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button
            type="submit"
            variant="text"
            color="error"
            // onClick={() => {
            //   formik.handleSubmit();
            // }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            // onClick={() => {
            //   formik.handleSubmit();
            // }}
          >
            Create
          </Button>
        </Box>
      </>
    </ModalComp>
  );
}

SelectItem.defaultProps = {
  title: '',
  multiple: false,
};
