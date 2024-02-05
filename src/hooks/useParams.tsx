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
    if (dataParams.search) {
      setSearchValue(dataParams.search);
    }
  }, []);

  const handleResetFilter = useCallback(
    (config?: { whiteList: string[] }) => {
      const resetParams = { page: 1, count: 10, ...(props as T & ListParams) };
      const whiteListParams = Object.keys(params)
        .filter((key) => (config?.whiteList || [])?.includes(key))
        .reduce((obj, key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          obj[key] = params[key];
          return obj;
        }, {} as T & ListParams);

      if (!config?.whiteList?.includes('search')) {
        setSearchValue('');
      }

      setParams({ ...resetParams, ...whiteListParams });
      // Update the URL search parameters
      const queryParams = new URLSearchParams(
        Object.fromEntries(
          Object.entries(whiteListParams).filter(
            ([key, value]) => value !== undefined,
          ),
        ),
      );

      // Set the search property of the current URL
      window.history.pushState({}, '', `?${queryParams.toString()}`);
    },
    [params],
  );

  const handleToSetSearchParams = (name: string, value: string) => {
    // Create a new URLSearchParams instance
    const queryParams = new URLSearchParams(window.location.search);

    // Set the new page value
    queryParams.set(name, value);

    // Update the URL search parameters
    window.history.pushState({}, '', `?${queryParams.toString()}`);
  };
  return {
    params,
    handleChangeParams,
    handleToSetSearchParams,
    handleSearch,
    handleResetFilter,
    searchValue,
    setSearchValue,
  };
}
