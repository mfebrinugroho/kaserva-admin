import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import TableMenu from "@/components/table/menus/TableMenu";
import { PATH } from "@/routes/path";

const MenuPage = () => {
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
          <TableMenu />
        </ComponentCard>
      </div>
    </>
  );
};

export default MenuPage;
