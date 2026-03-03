import { useState } from "react";

export function useModal(initialData = null) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialData);

  const open = (modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(initialData);
  };

  return {
    isOpen,
    data,
    open,
    close
  };
}