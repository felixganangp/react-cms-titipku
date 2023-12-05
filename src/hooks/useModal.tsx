import { useState } from 'react';

export default function useModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  return {
    open,
    openModal,
    closeModal,
    toggleModal,
  };
}
