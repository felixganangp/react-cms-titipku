import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Skeleton from '@mui/material/Skeleton';
import { ButtonMore, FilterBox, SelectedItem, TextMore } from './filter.styled';
import AccordionFilter from '../Accordion/Filter';

interface FilterProps {
  selectedItem: { total: number; items: { [id: number]: boolean } };
  title: string;
  data: { id: number; name: string }[];
  loading: boolean;
  onChange(event: object, id: number | string): void;
  onSeeMore(): void;
  onSearch(value: string): void;
  currentItems: number;
  total: number;
  searchValue: string;
  //   none: boolean;
}

export default function Filter(props: FilterProps) {
  const {
    selectedItem,
    title,
    data,
    loading,
    onChange,
    onSeeMore,
    onSearch,
    currentItems,
    total,
    searchValue,
    // none,
  } = props;

  const isShown =
    !loading &&
    selectedItem &&
    selectedItem.items &&
    Object.keys(selectedItem.items).length > 0;

  const checkboxValues = { ...selectedItem.items };

  if (data !== undefined || data !== null) {
    data.forEach((element) => {
      checkboxValues[element.id] = !!checkboxValues[element.id];
    });
  }

  return (
    <FilterBox>
      <AccordionFilter title={title}>
        {selectedItem.total < 1 ? null : (
          <SelectedItem>
            {`${selectedItem.total} ${title}(s) selected`}{' '}
          </SelectedItem>
        )}
        <TextField
          placeholder={`Search ${title}`}
          size="small"
          value={searchValue}
          fullWidth
          onChange={(e) => onSearch(e.target.value)}
          sx={{ bgcolor: '#ebeff3' }}
          style={{ marginBottom: '12px', marginTop: '8px' }}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box maxHeight="250px" overflow="auto" marginBottom="20px">
          <FormGroup>
            {/* {isShown && none && (
                <FormControlLabel
                  key="none"
                  control={<Checkbox checked={checkboxValues.null}}
                  label="None"
                  onChange={e => onChange(e, 'null')}
                />
            )} */}
            {isShown &&
              data.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={<Checkbox checked={checkboxValues[item.id]} />}
                  label={item.name}
                  onChange={(e) => onChange(e, item.id)}
                />
              ))}
            {loading &&
              [1, 2, 3, 4].map((item) => (
                <Box
                  key={item}
                  display="flex"
                  alignItems="center"
                  marginLeft="-11px"
                >
                  <Checkbox />
                  <Skeleton variant="text" width="100%" height="16px" />
                </Box>
              ))}
            {currentItems < total ? (
              <ButtonMore>
                <TextMore
                  onClick={() => onSeeMore()}
                  width="100%"
                  height="16px"
                />
              </ButtonMore>
            ) : (
              ''
            )}
          </FormGroup>
        </Box>
      </AccordionFilter>
    </FilterBox>
  );
}
