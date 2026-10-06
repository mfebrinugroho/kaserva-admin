import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  isDeleting: boolean;
}

const ModalDelete = ({
  open,
  onClose,
  onConfirm,
  children = "Data yang sudah dihapus tidak dapat dipulihkan kembali.",
  isDeleting,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-111111 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(0,0,0,.25)] transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_25px_70px_rgba(0,0,0,.6)]">
        {/* Content */}
        <div className="px-8 pt-8 text-center">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-100 dark:bg-error-500/15">
            <Trash2 className="h-8 w-8 text-error-500 dark:text-error-500" />
          </div>

          {/* Title */}
          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Hapus Data?
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-3 border-t border-slate-100 p-6 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-xl bg-error-500 py-3 font-medium text-white transition-all hover:bg-error-600 dark:bg-error-500 dark:hover:bg-error-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-error-500"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
