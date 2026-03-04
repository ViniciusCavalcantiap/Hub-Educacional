import { Card } from "./Card";

export function ResourceList({
  resources,
  onEdit,
  onDeleteInitiate
}) {
  if (resources.length === 0) {
    return (
      <div className="flex items-center justify-center h-72">
        <p className="text-white/50 text-lg">
          Você não cadastrou nenhum material.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {resources.map((item) => (
        <Card
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDeleteInitiate={onDeleteInitiate}
        />
      ))}
    </div>
  );
}