import { useEffect } from "react";

export function FeedbackModal({ isOpen, onClose, message }) {
  // Pode ser reutilizado para sucesso, erro ou avisos globais.

  useEffect(() => {
    if (!isOpen) return;

    // Auto fechamento
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#2e2b5f] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-lg"
        >
          ✕
        </button>
        <p className="text-xl font-semibold text-white">{message}</p>
      </div>
    </div>
  );
}