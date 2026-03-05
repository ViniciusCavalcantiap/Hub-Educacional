import { useState, useEffect } from "react";
import { Button } from "./Button";
import { generateDescription } from "../services/api";
import { FeedbackModal } from "./FeedbackModal";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { useFeedback } from "../hooks/useFeedback";

const EMPTY_FORM = {
  titulo: "",
  tipo: "",
  tags: "",
  url: "",
  descricao: ""
};

export function ResourceFormModal({
  isOpen,
  onClose,
  onSave,
  resource
}) {
  const isEditing = !!resource;

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isLoadingIA, setIsLoadingIA] = useState(false);
  const feedback = useFeedback();

  useEffect(() => {
    setFormData(resource || EMPTY_FORM);
  }, [resource, isOpen]);

  if (!isOpen) return null;

  const handleChange = ({ target }) => {
    setFormData(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.titulo.trim() || !formData.tipo.trim()) {
      feedback.show("Preencha Título e Tipo antes de gerar com IA.");
      return;
    }

    setIsLoadingIA(true);

    try {
      const data = await generateDescription(
        formData.titulo,
        formData.tipo
      );

      setFormData(prev => ({
        ...prev,
        descricao: data.descricao,
        tags: data.tags.join(", ")
      }));

    } catch {
      feedback.show("Erro ao gerar descrição com IA.");
    } finally {
      setIsLoadingIA(false);
    }
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(field => !field.trim())) {
      feedback.show("É necessário preencher todos os campos.");
      return;
    }

    if (!isValidUrl(formData.url)) {
      feedback.show("Informe um link válido (ex: https://exemplo.com).");
      return;
    }

    const cleanedTags = formData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
      .join(", ");

    onSave({ ...formData, tags: cleanedTags });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#211f26] w-full max-w-2xl p-8 rounded-xl border border-white/10 shadow-2xl">

          <h2 className="text-2xl font-bold mb-6 text-white">
            {isEditing ? "Editar Material" : "Cadastrar Material"}
          </h2>

          <div className="space-y-4">

            <FormInput
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título"
            />

            <FormInput
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              placeholder="Tipo"
            />

            <div>
              <div className="flex justify-between text-sm text-white/40 mb-1">
                <span>Descrição</span>
                <span>{formData.descricao.length}/500</span>
              </div>

              <FormTextarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Gere uma descrição com IA"
                maxLength={500}
              />
            </div>

            <FormInput
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (Gere Tags com IA)"
            />

            <FormInput
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Link do material"
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

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={feedback.close}
        message={feedback.message}
      />
    </>
  );
}