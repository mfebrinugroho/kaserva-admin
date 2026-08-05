import GridShape from "@/components/common/GridShape";
import { useNavigate } from "react-router";
import PageMeta from "@/components/common/PageMeta";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <PageMeta
        title="404 - Halaman Tidak Ditemukan | OrderKuy"
        description="Halaman yang Anda cari tidak ditemukan atau mungkin telah dipindahkan. Kembali ke dashboard OrderKuy untuk melanjutkan aktivitas Anda."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 dark:bg-gray-900">
        <GridShape />
        <div className="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
          <div className="flex justify-center mb-6">
            <FileQuestion className="h-25 w-25 text-gray-800 dark:text-white/90" />
          </div>

          <h1 className="mb-2 text-8xl font-bold text-gray-800 dark:text-white/90">
            404
          </h1>

          <h2 className="mb-4 text-4xl font-semibold text-gray-800 dark:text-white/90">
            Halaman Tidak Ditemukan
          </h2>

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Maaf, halaman yang Anda cari tidak ditemukan atau mungkin telah
            dipindahkan.
          </p>

          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
          >
            Back to Home Page
          </button>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - OrderKuy
        </p>
      </div>
    </>
  );
}
