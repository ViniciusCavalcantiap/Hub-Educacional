import { Button } from "./Button";

export function Card({ item, onEdit, onDeleteInitiate }) {
  return (
    <div className="bg-[#211f26] rounded-xl p-5 shadow-md flex flex-col justify-between">

      <div>
        <h3 className="text-lg font-bold mb-2">
          {item.titulo}
        </h3>

        {item.tipo && (
          <p className="text-xs text-[#8b85f9] mb-2 uppercase tracking-wide">
            {item.tipo}
          </p>
        )}

        <p className="text-sm text-white/70 mb-4">
          {item.descricao}
        </p>

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8b85f9] hover:bg-[#6c63ff] transition-colors text-white text-sm px-4 py-2 rounded-lg mb-4"
          >
            Acessar Material
          </a>
        )}

        {item.tags && (
          <div className="text-xs text-white/50">
            {item.tags}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => onEdit(item)}>
          Editar
        </Button>

        <Button variant="outline" onClick={() => onDeleteInitiate(item)}>
          Excluir
        </Button>
      </div>

    </div>
  );
}