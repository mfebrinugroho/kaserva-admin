import { ShieldX } from "lucide-react";
import { Link } from "react-router";
import GridShape from "@/components/common/GridShape";
import PageMeta from "@/components/common/PageMeta";

export default function Forbidden() {
  return (
    <>
      <PageMeta
        title="403 - Akses Ditolak | OrderKuy"
        description="Anda tidak memiliki izin untuk mengakses halaman ini di OrderKuy. Hubungi administrator jika diperlukan."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 dark:bg-gray-900">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          {/* <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ERROR
          </h1> */}
          <div className="flex justify-center mb-6">
            <ShieldX className="h-25 w-25 text-gray-800 dark:text-white/90" />
          </div>

          <h1 className="mb-2 text-8xl font-bold text-gray-800 dark:text-white/90">
            403
          </h1>

          <h2 className="mb-4 text-4xl font-semibold text-gray-800 dark:text-white/90">
            Akses Ditolak
          </h2>

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Back to Home Page
          </Link>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - OrderKuy
        </p>
      </div>
    </>
  );
}
