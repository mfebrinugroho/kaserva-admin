import { useState } from "react";
import { toast } from "sonner";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import AddOwnerForm from "@/components/form/stores/AddOwnerForm";
import TableStore from "@/components/table/stores/TableStore";
import FormModal from "@/components/ui/modal/FormModal";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { useAuth } from "@/contexts/AuthContext";
import { useDeleteStore } from "@/hooks/mutations/useDeleteStore";
import { PATH } from "@/routes/path";
import type { Store } from "@/types/store";

const StorePage = () => {
  const { hasPermission } = useAuth();

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [addOwner, setAddOwner] = useState(false);

  const deleteStore = useDeleteStore();

  const handleDelete = () => {
    if (!selectedStore) return;

    deleteStore.mutate(Number(selectedStore.id), {
      onSuccess: (response) => {
        toast.success(response.message);
        setSelectedStore(null);
      },
    });
  };

  return (
    <>
      <PageHeader title="Kelola Resto/Toko" />
      <div className="space-y-6">
        <ComponentCard
          title="Kelola Resto/Toko"
          desc="Kelola dan pantau data resto/toko"
          addButton={hasPermission("store.create")}
          addTitle="Tambah Resto/Toko"
          addUrl={PATH.STORES_CREATE}
        >
          <TableStore onDelete={setSelectedStore} onAddOwner={setAddOwner} />
        </ComponentCard>
      </div>

      <ModalDelete
        open={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        onConfirm={handleDelete}
        isDeleting={deleteStore.isPending}
      >
        Apakah Anda yakin ingin menghapus toko{" "}
        <span className="font-semibold">{selectedStore?.name}</span>?
      </ModalDelete>

      <FormModal open={addOwner} onClose={() => setAddOwner(false)}>
        <AddOwnerForm onClose={() => setAddOwner(false)} />
      </FormModal>
    </>
  );
};

export default StorePage;
