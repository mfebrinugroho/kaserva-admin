import { useParams } from "react-router";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import MenuEditForm from "@/components/form/menus/MenuEditForm";

const EditMenuPage = () => {
  const { id } = useParams();

  const menuId = Number(id);

  return (
    <>
      <PageHeader title="Edit Menu" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data Menu">
          <MenuEditForm menuId={menuId} />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditMenuPage;
