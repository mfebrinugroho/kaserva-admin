import { useParams } from "react-router";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import StoreEditForm from "@/components/form/stores/StoreEditForm";

const EditStorePage = () => {
  const { id } = useParams();

  const storeId = Number(id);

  return (
    <>
      <PageHeader title="Edit Resto/Toko" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data Resto/Toko">
          <StoreEditForm storeId={storeId} />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditStorePage;
