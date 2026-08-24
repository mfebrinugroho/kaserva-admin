import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import { StoreCreateForm } from "@/components/form/stores/StoreCreateForm";

const CreateStorePage = () => {
  return (
    <>
      <PageHeader title="Tambah Resto/Toko" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Data Resto/Toko">
          <StoreCreateForm />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateStorePage;
