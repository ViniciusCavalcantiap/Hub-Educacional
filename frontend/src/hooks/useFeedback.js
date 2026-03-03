import { useState } from "react";

export function useFeedback() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const show = (msg) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setMessage("");
  };

  return {
    message,
    isOpen,
    show,
    close
  };
}