import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Product } from 'models/b2b/Product';

import Content from './Content';

interface Props {
  data: Product[];
  changeItem: any;
}
export const RadioButton = ({ data, changeItem }: Props) => {
  const [selectRadio, setSelectRadio] = useState(0);
  return (
    <FormControl
      sx={{
        '& .MuiRadio-root': {
          borderColor: '#d5d5d5',
        },
        '& .MuiRadio-root.Mui-checked': {
          color: '#32a479',
        },
      }}
      style={{
        display: 'flex',
        overflow: 'scroll',
        width: 'inherit',
        border: 'none',
      }}
    >
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {data.map((item: Product) => (
          <FormControlLabel
            value={item.id}
            onChange={(e) => {
              let subdistrict;
              setSelectRadio(item.id);
              return changeItem(
                e,
                item.id,
                item.product_parent.name,
                item.product_parent.image_filepath,
                item.stock,
              );
            }}
            key={item.id}
            control={<Radio />}
            sx={{
              margin: '10px',
              padding: '12px',
              marginLeft: '0px',
              width: '390px',
              backgroundColor: selectRadio === item.id ? '#e5f4ee' : '',
              '& .MuiFormControlLabel-root': {
                checked: {
                  backgroundColor: '#e5f4ee',
                },
              },
            }}
            label={<Content item={item} width="320px" />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
