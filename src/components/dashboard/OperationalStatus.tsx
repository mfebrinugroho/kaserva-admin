import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Store, ShoppingBag } from "lucide-react";
import Switch from "../ui/input/Switch";
import { storeService } from "@/services/store.service";
import type { Store as StoreType } from "@/types/store";
import type { ApiResponse } from "@/types/api";
import { toast } from "sonner";

export default function OperationalStatus() {
  const { user } = useAuth();
  const activeStoreId = Number(user?.store_id);
  const queryClient = useQueryClient();

  const queryKey = ["store", user?.id, activeStoreId];

  const { data: store } = useQuery({
    queryKey,
    queryFn: async () => await storeService.show(activeStoreId),
    enabled: !!user,
  });

  const isOpen = store?.data.is_open ?? false;
  const isAcceptOrder = store?.data.is_accept_order ?? false;

  const updateOperational = useMutation({
    mutationFn: storeService.updateStatusOperational,
    onMutate: async ({ is_open }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousStores = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<ApiResponse<StoreType>>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: { ...old.data, is_open },
        };
      });

      return { previousStores };
    },

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousStores);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const updateOrder = useMutation({
    mutationFn: storeService.updateStatusOrder,
    onMutate: async ({ is_accept_order }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousStores = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<ApiResponse<StoreType>>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          data: { ...old.data, is_accept_order },
        };
      });

      return { previousStores };
    },

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["stores"],
      });
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousStores);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {/* Status Toko */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-500/10">
                <Store size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Status Toko
                </h3>

                <p className="text-sm text-slate-500">
                  Atur apakah toko sedang buka.
                </p>
              </div>
            </div>
          </div>

          {/* <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" defaultChecked className="peer sr-only" />

            <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
          </label> */}
          <Switch
            checked={Boolean(isOpen)}
            onChange={(value) =>
              updateOperational.mutate({
                id: activeStoreId,
                is_open: value,
              })
            }
          />
        </div>

        <div className="mt-8 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>

            <span className="font-semibold text-emerald-600">
              Toko Sedang Buka
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Pelanggan dapat melihat toko dan melakukan pemesanan.
          </p>
        </div>
      </div>

      {/* Pesanan */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-500/10">
                <ShoppingBag size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Menerima Pesanan
                </h3>

                <p className="text-sm text-slate-500">
                  Aktifkan agar pelanggan bisa checkout.
                </p>
              </div>
            </div>
          </div>

          {/* <label className="relative inline-flex cursor-pointer items-center">
            <input defaultChecked type="checkbox" className="peer sr-only" />

            <div className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-indigo-500 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
          </label> */}
          <Switch
            checked={Boolean(isAcceptOrder)}
            onChange={(value) =>
              updateOrder.mutate({
                id: activeStoreId,
                is_accept_order: value,
              })
            }
          />
        </div>

        <div className="mt-8 rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>

            <span className="font-semibold text-indigo-600">
              Sedang Menerima Pesanan
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Pelanggan dapat melakukan checkout dan pesanan baru akan masuk.
          </p>
        </div>
      </div>
    </section>
  );
}
