import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import TableMenu from "@/components/table/menus/TableMenu";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { useDeleteMenu } from "@/hooks/mutations/useDeleteMenu";
import { PATH } from "@/routes/path";
import type { Menu } from "@/types/menu";
import { useState } from "react";
import { toast } from "sonner";

const MenuPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const deleteMenu = useDeleteMenu();

  const handleDelete = () => {
    if (!selectedMenu) return;

    deleteMenu.mutate(Number(selectedMenu.id), {
      onSuccess: (response) => {
        toast.success(response.message);
        setSelectedMenu(null);
      },
    });
  };

  return (
    <>
      <PageHeader title="Kelola Menu" />
      <div className="space-y-6">
        <ComponentCard
          title="Kelola Menu"
          desc="Kelola dan pantau data menu"
          addButton
          addTitle="Tambah Menu"
          addUrl={PATH.MENUS_CREATE}
        >
          <TableMenu onDelete={setSelectedMenu} />
        </ComponentCard>
      </div>

      <ModalDelete
        open={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMenu.isPending}
      >
        Apakah Anda yakin ingin menghapus toko{" "}
        <span className="font-semibold">{selectedMenu?.name}</span>?
      </ModalDelete>
    </>
  );
};

export default MenuPage;
