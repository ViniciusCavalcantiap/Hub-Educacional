import { Button } from "./Button";

export function Header({ onCreateClick }) {
  return (
    <header className="w-full border-b border-white/10 bg-[#1f1c2b]">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="bg-[#8b85f9] text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-lg">
            H
          </div>
          <h1 className="text-2xl font-bold">
            Hub Educacional
          </h1>
        </div>

        <Button
          variant="primary"
          onClick={onCreateClick}
        >
          Cadastrar
        </Button>

      </div>
    </header>
  );
}