import { ImagePlus, Trash2 } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  preview: string | null;
  onChange: (file: File | null) => void;
}

export default function ImageUpload({ preview, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    onChange(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-gray-800"
        >
          <ImagePlus className="mb-2 h-10 w-10 text-gray-400" />

          <p className="font-medium text-slate-900 dark:text-white">
            Klik untuk memilih gambar
          </p>

          <p className="text-sm text-gray-500">JPG, PNG, WEBP</p>
        </button>
      ) : (
        <div className="relative">
          <img
            src={preview}
            className="h-52 w-full rounded-xl object-cover"
            alt="Preview gambar"
          />

          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </>
  );
}
