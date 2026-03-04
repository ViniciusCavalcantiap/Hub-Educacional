import { Header } from './components/Header';
import { ResourceToolbar } from './components/ResourceToolbar';
import { ResourceList } from './components/ResourceList';
import { ResourceFormModal } from './components/ResourceFormModal';
import { FeedbackModal } from './components/FeedbackModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Pagination } from './components/Pagination';

import { useResources } from './hooks/useResources';
import { usePagination } from './hooks/usePagination';
import { useModal } from './hooks/useModal';
import { useFeedback } from './hooks/useFeedback';

import { useState } from 'react';

const ITEMS_PER_PAGE = 8;

export default function App() {

  const { resources, handleCreate, handleUpdate, handleDelete } = useResources();

  const [searchTerm, setSearchTerm] = useState("");

  const formModal = useModal();
  const deleteModal = useModal();
  const feedback = useFeedback();

  /* ===== FILTRO ===== */

  const filteredResources = resources.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.titulo?.toLowerCase().includes(search) ||
      item.tags?.toLowerCase().includes(search)
    );
  });

  /* ===== PAGINAÇÃO ===== */

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPrevious,
    goToNext,
    resetPage
  } = usePagination(filteredResources, ITEMS_PER_PAGE);

  /* ===== DELETE ===== */

  const handleConfirmDelete = async () => {
    if (!deleteModal.data) return;

    await handleDelete(deleteModal.data.id);
    deleteModal.close();
    feedback.show("Material excluído com sucesso!");
  };

  /* ===== SAVE ===== */

  const handleSave = async (data) => {
    if (formModal.data) {
      await handleUpdate(data);
      feedback.show("Material atualizado com sucesso!");
    } else {
      await handleCreate(data);
      feedback.show("Material cadastrado com sucesso!");
    }

    formModal.close();
  };

  return (
    <div className="min-h-screen bg-[#1a1824] text-white flex flex-col">

      <Header onCreateClick={() => formModal.open()} />

      <main className="flex-grow max-w-7xl mx-auto px-8 py-10 w-full">

        <ResourceToolbar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            resetPage();
          }}
        />

        <ResourceList
          resources={paginatedData}
          onEdit={(resource) => formModal.open(resource)}
          onDeleteInitiate={(resource) => deleteModal.open(resource)}
        />

      </main>

      <div className="border-t border-white/10 py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>

      <ResourceFormModal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        onSave={handleSave}
        resource={formModal.data}
      />

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={feedback.close}
        message={feedback.message}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleConfirmDelete}
        resourceTitle={deleteModal.data?.titulo || ""}
      />

    </div>
  );
}