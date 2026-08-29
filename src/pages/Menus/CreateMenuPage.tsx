import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import MenuCreateForm from "@/components/form/menus/MenuCreateForm";

const CreateMenuPage = () => {
  return (
    <>
      <PageHeader title="Tambah Menu" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Menu">
          <MenuCreateForm />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateMenuPage;
