import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Radio,
  Checkbox,
  Typography,
  Skeleton,
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
  hidenData?: number[];
  multiple?: boolean;
  renderItem: (props: any) => JSX.Element;
  onChangeSearch?: (e: string) => void;
  onClose: () => void;
  loading?: boolean;
  showMore?: boolean;
  onShowmore?: () => void;
  onSubmit: (data: number[]) => void;
}

export default function SelectItem({
  open,
  title,
  data,
  renderItem,
  multiple,
  value,
  hidenData,
  onChangeSearch,
  onClose,
  loading,
  showMore,
  onShowmore,
  onSubmit,
}: SelectItemProsp) {
  const [temporaryValue, setTemporaryValue] = useState<number[]>([]);

  useEffect(() => {
    if (value) {
      setTemporaryValue(value);
    } else {
      setTemporaryValue([]);
    }
  }, [value]);

  const handleSearch = (search: string) => {
    if (onChangeSearch) {
      onChangeSearch(search);
    }
  };

  const debounceSearch = useCallback(debounce(handleSearch, 700), []);

  const handleSelected = (id: number) => {
    if (multiple) {
      const isExist = temporaryValue.includes(id);

      if (isExist) {
        setTemporaryValue(temporaryValue.filter((val) => val !== id));
      } else {
        setTemporaryValue([...temporaryValue, id]);
      }
    } else {
      setTemporaryValue([id]);
    }
  };

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
              display: onChangeSearch ? 'block' : 'none',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
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
            {!loading && data.length === 0 && (
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
            {!loading && data.length > 0 && (
              <>
                {data
                  .filter((val) => {
                    if (hidenData) {
                      return !hidenData.includes(val.id);
                    }

                    return true;
                  })
                  ?.sort((x, y) => (value?.includes(x?.id) ? -1 : 1))
                  .map((val) => (
                    <Stack
                      key={val.id}
                      direction="row"
                      alignItems="center"
                      bgcolor={
                        temporaryValue.includes(val.id) ? '#ddf0e9' : 'unset'
                      }
                      py={1}
                      gap={1}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSelected(val.id)}
                    >
                      {/* <Radio /> */}
                      {multiple ? (
                        <Checkbox checked={temporaryValue.includes(val.id)} />
                      ) : (
                        <Radio checked={temporaryValue.includes(val.id)} />
                      )}
                      {renderItem(val)}
                    </Stack>
                  ))}
              </>
            )}
            {loading &&
              Array(10)
                .fill('1')
                .map((val, index) => (
                  <Box width="100%" key={index}>
                    <Skeleton width="100%" height="25px" />
                  </Box>
                ))}
            <Stack
              alignItems="center"
              sx={{ cursor: 'pointer', display: showMore ? 'flex' : 'none' }}
              onClick={onShowmore}
            >
              <Typography color="primary.main">See More</Typography>
            </Stack>
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
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              onSubmit(temporaryValue);
              onClose();
            }}
            disabled={temporaryValue.length === 0}
          >
            Select
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
