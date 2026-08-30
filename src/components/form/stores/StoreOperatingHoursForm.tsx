import BackButton from "@/components/button/BackButton";
import { useUpdateStoreOperatingHours } from "@/hooks/mutations/useUpdateStoreOperatingHours";
import { PATH } from "@/routes/path";
import type { StoreOperatingHour } from "@/types/store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Props {
  storeId: number;
  operatingHours: StoreOperatingHour[];
}

const StoreOperatingHoursForm = ({ storeId, operatingHours }: Props) => {
  const navigate = useNavigate();
  const [hours, setHours] = useState<StoreOperatingHour[]>(operatingHours);

  const updateOperatingHours = useUpdateStoreOperatingHours();

  const formatTime = (time: string | null) => {
    if (!time) return null;

    return `${time.slice(0, 5)}:00`;
  };

  const handleToggle = (day: number) => {
    setHours((prev) =>
      prev.map((item) =>
        item.day_of_week === day
          ? {
              ...item,
              is_open: !item.is_open,
            }
          : item,
      ),
    );
  };

  const handleTimeChange = (
    day: number,
    field: "open_time" | "close_time",
    value: string,
  ) => {
    setHours((prev) =>
      prev.map((item) =>
        item.day_of_week === day
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const handleSubmit = () => {
    const payload = {
      operating_hours: hours.map((item) => ({
        day_of_week: item.day_of_week,
        is_open: item.is_open,
        open_time: item.is_open ? formatTime(item.open_time) : null,
        close_time: item.is_open ? formatTime(item.close_time) : null,
      })),
    };

    updateOperatingHours.mutate(
      {
        id: storeId,
        data: payload,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          navigate(PATH.STORES);
        },
      },
    );
  };

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {hours.map((item) => (
          <div
            key={item.day_of_week}
            className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-[150px_130px_1fr] md:items-center"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {item.day_name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggle(item.day_of_week)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  item.is_open ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition ${
                    item.is_open ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  item.is_open
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.is_open ? "Buka" : "Tutup"}
              </span>
            </div>

            {item.is_open ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Jam Buka
                  </label>

                  <input
                    type="time"
                    value={item.open_time ?? ""}
                    onChange={(e) =>
                      handleTimeChange(
                        item.day_of_week,
                        "open_time",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <span className="mt-5 hidden text-gray-400 sm:block">→</span>

                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Jam Tutup
                  </label>

                  <input
                    type="time"
                    value={item.close_time ?? ""}
                    onChange={(e) =>
                      handleTimeChange(
                        item.day_of_week,
                        "close_time",
                        e.target.value,
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                Toko tutup sepanjang hari
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 sm:justify-end">
        <BackButton url={PATH.STORES} />

        <button
          type="button"
          disabled={updateOperatingHours.isPending}
          onClick={handleSubmit}
          className="w-full sm:w-30 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-500"
        >
          {updateOperatingHours.isPending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </>
  );
};

export default StoreOperatingHoursForm;
