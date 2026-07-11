import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import TableStore from "@/components/table/stores/TableStore";
import { useAuth } from "@/contexts/AuthContext";
import { PATH } from "@/routes/path";
import { storeService } from "@/services/store.service";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Store } from "@/types/store";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { toast } from "sonner";
import FormModal from "@/components/ui/modal/FormModal";
import AddOwnerForm from "@/components/form/stores/AddOwnerForm";

const StorePage = () => {
  const { hasPermission } = useAuth();
  const queryClient = useQueryClient();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const [isAddOwner, setIsAddOwner] = useState(false);

  const deleteStoreMutation = useMutation({
    mutationFn: storeService.delete,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["stores"],
      });

      toast.success(response.message);

      setIsDeleteOpen(false);
      setSelectedStore(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const openDeleteModal = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteOpen(true);
  };

  const openAddOwnerModal = () => {
    setIsAddOwner(true);
  };

  const handleDelete = async () => {
    if (!selectedStore) return;

    deleteStoreMutation.mutate(Number(selectedStore.id));
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
          <TableStore
            openDeleteModal={openDeleteModal}
            openAddOwnerModal={openAddOwnerModal}
          />
        </ComponentCard>
      </div>

      {isDeleteOpen && (
        <ModalDelete
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
          isDeleting={deleteStoreMutation.isPending}
        >
          Apakah Anda yakin ingin menghapus resto/toko{" "}
          <span className="font-semibold">{selectedStore?.name}</span>?
        </ModalDelete>
      )}

      {isAddOwner && (
        <FormModal open={isAddOwner} onClose={() => setIsAddOwner(false)}>
          <AddOwnerForm onClose={() => setIsAddOwner(false)} />
        </FormModal>
      )}
    </>
  );
};

export default StorePage;
