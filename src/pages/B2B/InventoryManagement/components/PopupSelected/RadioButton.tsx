import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  ContentBox,
  ItemImage,
  NoItemImage,
  ParentContentBox,
} from './popupselected.styled';
import { GradingColor } from '../../inventory.styled';

interface Props {
  data: any;
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
        {data.map((item: any) => (
          <FormControlLabel
            value={item.id}
            onChange={(e) => {
              let subdistrict;
              setSelectRadio(item.id);
              return changeItem(
                e,
                item.id,
                item.product_name,
                item.product_image,
                item.product_stock,
              );
            }}
            key={item.id}
            control={<Radio />}
            sx={{
              margin: '10px',
              padding: '12px',
              marginLeft: '5px',
              width: '390px',
              backgroundColor: selectRadio === item.id ? '#e5f4ee' : '',
              '& .MuiFormControlLabel-root': {
                checked: {
                  backgroundColor: '#e5f4ee',
                },
              },
            }}
            label={
              <Box
                sx={{
                  display: 'flex',
                  width: '320px',
                }}
              >
                <ContentBox>
                  {item.product_image === '' ? (
                    <NoItemImage src="" alt="No Img" />
                  ) : (
                    <ItemImage
                      src={item.product_image}
                      alt={item.product_name}
                    />
                  )}
                </ContentBox>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                      }}
                    >
                      <GradingColor
                        sx={{ padding: '2px !important' }}
                        grade={1}
                        fontSize="12px"
                      >
                        Grade C
                      </GradingColor>
                      <Typography fontSize={14}>{item.product_name}</Typography>
                    </Box>
                    <Typography fontSize={14}>{item.product_type}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 1,
                    }}
                  >
                    <Typography fontSize={14} color="#555555">
                      in Stock
                    </Typography>
                    <Typography fontSize={14}>
                      {item.product_stock} g
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
