import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from 'models/b2b/Product';
import NoImage from 'assets/no-image.svg';
import { GradingColor } from '../../inventory.styled';

interface Props {
  item: Product;
  width?: string;
}

function Content({ item, width }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        width,
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* <ContentBox>
        {item.product_image === '' ? (
          <NoItemImage src="" alt="No Img" />
        ) : (
          <ItemImage src={item.product_image} alt={item.product_name} />
        )}
      </ContentBox> */}
      <img
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = NoImage;
        }}
        style={{
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          marginLeft: 2,
        }}
        src={item.product_parent.image_filepath}
        alt={item.product_parent.name}
      />
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
              grade={item.product_grade.id}
              fontSize="12px"
            >
              {item.product_grade.name}
            </GradingColor>
            <Typography fontSize={14}>{item.product_parent.name}</Typography>
          </Box>
          <Typography fontSize={14}>{item.product_type.name}</Typography>
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
          <Typography fontSize={14}>{item.stock} g</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Content;
