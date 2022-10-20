import { useState } from 'react';

export default function useModal() {
  const [open, setOpan] = useState(false);

  const openModal = () => {
    setOpan(true);
  };
  const closeModal = () => {
    setOpan(false);
  };
  return {
    open,
    openModal,
    closeModal,
  };
}
