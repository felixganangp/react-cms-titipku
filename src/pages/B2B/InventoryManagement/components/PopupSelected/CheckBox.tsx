import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React from 'react';
import { Content } from './Content';
import {
  ContentBox,
  ItemImage,
  ParentContentBox,
} from './popupselected.styled';

interface Props {
  data: any;
  currentData: any;
  withDetails: any;
  addOrRemoveItem: any;
}

export const CheckBox = ({
  data,
  currentData,
  withDetails,
  addOrRemoveItem,
}: Props) => (
  <FormControl
    sx={{ overflow: 'scroll' }}
    component="fieldset"
    variant="standard"
    style={{
      display: 'flex',
      overflow: 'scroll',
      width: 'inherit',
      border: 'none',
    }}
  >
    <FormGroup>
      {data.map((item: any) => (
        <FormControlLabel
          key={item.id}
          value={item.id}
          onChange={(e) => addOrRemoveItem(e, item.id)}
          control={
            <Checkbox
              // disabled={currentData.includes(item.id)}
              defaultChecked={currentData.includes(item.id)}
              name={item.name}
            />
          }
          style={{ margin: '10px' }}
          label={
            <>
              {withDetails === true ? (
                <Content
                  img={item.image_url === '' ? '' : item.image_url}
                  name={item.name}
                  number={item.sku_number ? item.sku_number : ''}
                  weight={item.weight ? `${item.weight}gr` : ''}
                />
              ) : (
                <ParentContentBox>
                  <ContentBox>
                    <ItemImage
                      src={item.image_url === '' ? '' : item.image_url}
                      alt={item.name}
                    />
                  </ContentBox>
                  <ContentBox>{item.name}</ContentBox>
                </ParentContentBox>
              )}
            </>
          }
        />
      ))}
    </FormGroup>
  </FormControl>
);
