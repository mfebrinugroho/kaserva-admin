const FormSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Nama */}
      <div>
        <div className="mb-2 h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Email */}
      <div>
        <div className="mb-2 h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Konfirmasi Password */}
      <div>
        <div className="mb-2 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Role */}
      <div>
        <div className="mb-2 h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Button */}
      <div className="flex justify-center gap-4 sm:justify-end">
        <div className="h-11 w-full rounded-lg bg-gray-200 sm:w-30 dark:bg-gray-700" />
        <div className="h-11 w-full rounded-lg bg-gray-200 sm:w-30 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default FormSkeleton;
