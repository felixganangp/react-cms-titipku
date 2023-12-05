import { useCallback, useState } from 'react';

import { debounce } from '@mui/material';
import { ListParams } from 'models/fetch';

export default function UseParams<T>(props?: T & ListParams) {
  const [searchValue, setSearchValue] = useState('');
  const [params, setParams] = useState<T & ListParams>({
    page: 1,
    count: 10,
    ...(props as T & ListParams),
  });

  const handleSearchdebounce = useCallback(
    debounce((value: string) => {
      setParams({ ...params, search: value, page: 1 });
    }, 500),
    [params],
  );
  const handleSearch = (value: string) => {
    setSearchValue(value);
    handleSearchdebounce(value);
  };

  const handleChangeParams = useCallback((dataParams: T & ListParams) => {
    setParams({ ...params, ...dataParams });
  }, []);

  const handleResetFilter = useCallback(() => {
    setSearchValue('');
    setParams({ page: 1, count: 10, ...(props as T & ListParams) });
  }, []);
  return {
    params,
    handleChangeParams,
    handleSearch,
    handleResetFilter,
    searchValue,
  };
}
