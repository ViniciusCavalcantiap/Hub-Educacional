import { Button } from "./Button";

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext
}) {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-16 mt-14 mb-10">

      <Button
        variant={canGoBack ? "primary" : "outline"}
        onClick={onPrevious}
        disabled={!canGoBack}
      >
        Anterior
      </Button>

      <span className="text-lg font-semibold text-white min-w-[20px] text-center">
        {totalPages === 0 ? 1 : currentPage}
      </span>

      <Button
        variant={canGoForward ? "primary" : "outline"}
        onClick={onNext}
        disabled={!canGoForward}
      >
        Próxima
      </Button>

    </div>
  );
}