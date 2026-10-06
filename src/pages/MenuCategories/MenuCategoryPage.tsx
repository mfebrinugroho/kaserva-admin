import { useState } from "react";
import { toast } from "sonner";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import MenuCategoriesCreateForm from "@/components/form/menu_categories/MenuCategoriesCreateForm";
import MenuCategoriesEditForm from "@/components/form/menu_categories/MenuCategoriesEditForm";
import TableMenuCategories from "@/components/table/menu_categories/TableMenuCategories";
import FormModal from "@/components/ui/modal/FormModal";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { useDeleteMenuCategory } from "@/hooks/mutations/useDeleteMenuCategory";
import type { MenuCategory } from "@/types/menuCategory";

const MenuCategoryPage = () => {
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory | null>(null);
  const [createCategory, setCreateCategory] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteMenuCategory = useDeleteMenuCategory();

  const handleOpenEdit = (menuCategory: MenuCategory) => {
    setSelectedMenuCategory(menuCategory);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setSelectedMenuCategory(null);
    setOpenEditModal(false);
  };

  const handleOpenDelete = (menuCategory: MenuCategory) => {
    setSelectedMenuCategory(menuCategory);
    setOpenDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setSelectedMenuCategory(null);
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    if (!selectedMenuCategory) return;

    deleteMenuCategory.mutate(Number(selectedMenuCategory.id), {
      onSuccess: (response) => {
        toast.success(response.message);
        handleCloseDelete();
      },
    });
  };

  return (
    <>
      <PageHeader title="Kelola Kategori Menu" />
      <div className="space-y-6">
        <ComponentCard
          title="Kelola Menu"
          desc="Kelola dan pantau data menu"
          addModal
          addTitle="Tambah Menu"
          onClick={() => setCreateCategory(true)}
        >
          <TableMenuCategories
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </ComponentCard>
      </div>

      <FormModal open={createCategory} onClose={() => setCreateCategory(false)}>
        <MenuCategoriesCreateForm onClose={() => setCreateCategory(false)} />
      </FormModal>

      <FormModal open={openEditModal} onClose={handleCloseEdit}>
        <MenuCategoriesEditForm
          onClose={handleCloseEdit}
          menuCategory={selectedMenuCategory}
        />
      </FormModal>

      <ModalDelete
        open={openDeleteModal}
        onClose={handleCloseDelete}
        onConfirm={handleDelete}
        isDeleting={deleteMenuCategory.isPending}
      >
        Apakah Anda yakin ingin menghapus kategori menu{" "}
        <span className="font-semibold">{selectedMenuCategory?.name}</span>?
      </ModalDelete>
    </>
  );
};

export default MenuCategoryPage;
