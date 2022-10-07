import { ToastProsp } from 'components/Toast';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUIToast, uiAction } from 'store/slice/ui';

export default function useToast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(selectUIToast);

  const openToast = (params: ToastProsp) => {
    dispatch(uiAction.openToast(params));
  };

  const closeToast = () => {
    dispatch(uiAction.closeToast());
    setTimeout(() => {
      dispatch(uiAction.clearToast());
    }, 100);
  };

  return {
    state: toast,
    openToast,
    closeToast,
  };
}
