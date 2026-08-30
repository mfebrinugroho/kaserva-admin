import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";

interface Props {
  title: string;
  description?: string;
}

const PageHeader = ({
  title,
  description = "Kaserva adalah platform kasir dan pemesanan digital yang membantu toko, restoran, dan UMKM mengelola menu, pesanan, pembayaran, pelanggan, dan operasional bisnis secara efisien.",
}: Props) => {
  return (
    <>
      <PageMeta title={`${title} | Kaserva`} description={description} />
      <PageBreadcrumb pageTitle={title} />
    </>
  );
};

export default PageHeader;
