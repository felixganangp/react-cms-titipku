function addCommas(value: number | string) {
  let nStr = value?.toString();
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    // eslint-disable-next-line no-useless-concat
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export const typeNumberValidate = (value: string) => {
  if (value?.toString()?.split('.')?.length > 1) {
    return parseFloat(value);
  }

  // eslint-disable-next-line radix
  return parseInt(value);
};

export default addCommas;
