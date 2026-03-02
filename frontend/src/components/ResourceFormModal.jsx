import { useState, useEffect } from "react";
import { Button } from "./Button";
import { generateDescription } from "../services/api";

// Modal responsável por criar e editar um material

export function ResourceFormModal({
  isOpen,
  onClose,
  onSave,
  resource
}) {
  const isEditing = !!resource;

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    tags: "",
    url: "",
    descricao: ""
  });

  const [isLoadingIA, setIsLoadingIA] = useState(false);

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        titulo: "",
        tipo: "",
        tags: "",
        url: "",
        descricao: ""
      });
    }
  }, [resource, isOpen]);

  if (!isOpen) return null;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Gera descrição usando IA
  const handleGenerateAI = async () => {
    if (!formData.titulo || !formData.tipo) {
      alert("Preencha Título e Tipo antes de gerar.");
      return;
    }

    setIsLoadingIA(true);

    try {
      const data = await generateDescription(
        formData.titulo,
        formData.tipo
      );

      setFormData((prev) => ({
        ...prev,
        descricao: data.descricao,
        tags: data.tags.join(", ")
      }));
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar descrição.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#211f26] w-full max-w-2xl p-8 rounded-xl border border-white/10 shadow-2xl">

        <h2 className="text-2xl font-bold mb-6 text-white">
          {isEditing ? "Editar Material" : "Cadastrar Material"}
        </h2>

        <div className="space-y-4">

          <input
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título"
            className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
          />

          <input
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            placeholder="Tipo"
            className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
          />

          <div>
            <div className="flex justify-between text-sm text-white/40 mb-1">
              <span>Descrição</span>
              <span>{formData.descricao.length}/500</span>
            </div>

            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              maxLength={500}
              className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
            />
          </div>

          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (separadas por vírgula)"
            className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
          />

          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Link do material"
            className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
          />

        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="secondary"
            onClick={handleGenerateAI}
            disabled={isLoadingIA}
          >
            {isLoadingIA ? "Gerando..." : "Gerar com IA"}
          </Button>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? "Salvar" : "Cadastrar"}
          </Button>
        </div>

      </div>
    </div>
  );
}