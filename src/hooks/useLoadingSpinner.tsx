import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiAction } from 'store/slice/ui';

export default function useLoadingSpinner() {
  const dispatch = useAppDispatch();
  const loadingSpinner = useAppSelector((state) => state.ui.loadingSpinner);

  const setLoading = (params: boolean) => {
    dispatch(uiAction.setLoadingSpinner(params));
  };

  return {
    isOpen: loadingSpinner,
    setLoading,
  };
}
