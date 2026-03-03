import { Button } from "./Button";

export function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  resourceTitle
}) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#2e2b5f] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10 text-center space-y-6">
        <p className="text-xl font-semibold text-white">
          Tem certeza que deseja excluir o edital{" "}
          <span className="text-[#8b85f9]">"{resourceTitle}"</span>?
        </p>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} className="w-full">
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}