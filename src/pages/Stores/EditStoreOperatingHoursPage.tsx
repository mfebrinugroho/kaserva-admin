import { useParams } from "react-router";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import StoreOperatingHoursForm from "@/components/form/stores/StoreOperatingHoursForm";
import { useStoreOperatingHours } from "@/hooks/queries/useStoreOperatingHours";

const EditStoreOperatingHoursPage = () => {
  const { id } = useParams();

  const storeId = Number(id);

  const { data: operatingHours = [], isLoading } =
    useStoreOperatingHours(storeId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="Edit Jam Operasional Toko" />
      <div className="space-y-6">
        <ComponentCard
          title="Jam Operasional Toko"
          desc="Atur jadwal buka dan tutup toko untuk setiap hari."
        >
          {/* <StoreEditForm storeId={storeId} /> */}
          <StoreOperatingHoursForm
            storeId={storeId}
            operatingHours={operatingHours}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditStoreOperatingHoursPage;
