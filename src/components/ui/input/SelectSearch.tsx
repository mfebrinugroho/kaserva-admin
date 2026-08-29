import { useMemo, useState } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SearchableSelectProps {
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  // searchPlaceholder?: string;
  onChange?: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

export default function SelectSearch({
  options,
  value,
  placeholder,
  onChange,
  className,
  disabled = false,
  success = false,
  error = false,
  hint,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [options, value]);

  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 cursor-pointer`;
  }

  return (
    <div className="relative ">
      {/* Input */}
      <input
        className={inputClasses}
        readOnly
        value={selected?.label ?? ""}
        placeholder={placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="z-99 absolute mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
          <input
            className="w-full border-b px-3 py-2 outline-none dark:placeholder:text-gray-700 dark:border-gray-500 text-gray-500"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="max-h-60 overflow-y-auto">
            {filtered.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onChange?.(item.value);
                  setSearch("");
                  setIsOpen(false);
                }}
                className="cursor-pointer text-sm px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {item.label}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="px-3 py-2 text-gray-500 text-sm">
                Data tidak ditemukan
              </div>
            )}
          </div>
        </div>
      )}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
