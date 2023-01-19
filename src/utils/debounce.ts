const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout>;
  const func = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
  return func;
};

export default debounce;
