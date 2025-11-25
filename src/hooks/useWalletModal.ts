import { useState } from "react";

export const useWalletModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
    setOpen: setIsOpen,
  };
};

