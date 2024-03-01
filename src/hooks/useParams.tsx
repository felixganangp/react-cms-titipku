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

  const handleResetFilter = (config?: { whiteList: string[] }) => {
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

    setParams(whiteListParams);
    // Update the URL search parameters
    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(whiteListParams).filter(
          ([key, value]) => value !== undefined,
        ),
      ),
    );

    // Set the search property of the current URL
    if (queryParams.toString().length > 0) {
      window.history.replaceState(
        {},
        '',
        queryParams.toString().length > 0 ? `?${queryParams.toString()}` : '',
      );
    } else {
      // Create a URL object from the current URL
      const url = new URL(window.location.toString());

      // Clear all search parameters
      url.search = '';

      // Replace the current URL without reloading the page
      window.history.replaceState({}, '', url.toString());
    }
  };

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
