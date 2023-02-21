export const getColorCreditScore = (status: number | undefined) => {
  let bgColor = '';
  if (status === 1) {
    bgColor = '#008e58';
  }
  if (status === 2) {
    bgColor = '#0774d1';
  }
  if (status === 3) {
    bgColor = '#ff8f00';
  }
  if (status === 4) {
    bgColor = '#ec6470';
  }
  if (status === 5) {
    bgColor = '#bf370c';
  }
  return bgColor;
};
