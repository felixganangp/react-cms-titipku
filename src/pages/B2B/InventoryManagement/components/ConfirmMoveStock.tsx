import { Box, Button, Typography } from '@mui/material';
import { Product } from 'models/b2b/Product';

interface Props {
  onClose: () => void;
  prevItem: Product[];
  moveItem: Product[];
  payload: {
    from_product_id: number | undefined;
    to_product_id: number | undefined;
    stock_change: number | undefined;
  };
  onSubmit: () => void;
}

function ConfirmMoveStock({
  onClose,
  prevItem,
  moveItem,
  payload,
  onSubmit,
}: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 3,
        }}
      >
        <Box sx={{ paddingX: 2 }}>
          <Typography variant="h3" fontWeight={600}>
            Move Stock?
          </Typography>
          <Box
            sx={{
              paddingY: 3,
            }}
          >
            <Typography fontSize="16px">
              You are about to move stock:{' '}
              {payload.stock_change?.toLocaleString('en')} g{' '}
              <span style={{ fontWeight: 'bold' }}>
                [{prevItem[0].product_grade.name}][
                {prevItem[0].product_type.name}]{' '}
                {prevItem[0].product_parent.name}
              </span>{' '}
              to{' '}
              <span style={{ fontWeight: 'bold' }}>
                [{moveItem[0].product_grade.name}][
                {moveItem[0].product_type.name}]{' '}
                {moveItem[0].product_parent.name}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box
          width="100%"
          display="flex"
          gap="2em"
          justifyContent="end"
          // mt="50px"
          sx={{
            padding: '24px',
            paddingRight: '50px',
            boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Button onClick={onClose} variant="text" color="error">
            Cancel
          </Button>
          <Button onClick={onSubmit}>Yes, Move Stock</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmMoveStock;
