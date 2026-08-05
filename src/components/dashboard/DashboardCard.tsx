import type { UserAuth } from "@/types/auth";
import RoleBadge from "../ui/badge/RoleBadge";

const DashboardCard = ({ user }: { user: UserAuth | null }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950 p-8 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row">
        {/* Left */}
        <div className="max-w-2xl">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium bg-white/20 text-white
                dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            👋 Selamat Datang
          </span>

          <h1 className="mt-5 text-4xl font-bold text-white">
            Halo, {user?.name} 👋
          </h1>

          <p className="mt-3 text-emerald-50 dark:text-slate-400">
            Semoga harimu menyenangkan. Kelola seluruh aktivitas toko dan pantau
            performa bisnis secara real-time.
          </p>

          {/* User Info */}
          <div className="mt-6 flex flex-wrap gap-3">
            <RoleBadge role={user?.role?.slug} className="px-4 py-2">
              👑 {user?.role?.name}
            </RoleBadge>

            {user?.stores
              .filter((store) => store.id === user.store_id)
              .map((store) => (
                <span
                  key={store.id}
                  className="rounded-full px-4 py-2 text-sm bg-white/20 text-white dark:bg-slate-800 dark:text-slate-300"
                >
                  🏪 {store.name}
                </span>
              ))}

            <span className="rounded-full px-4 py-2 text-sm bg-white/20 text-white dark:bg-slate-800 dark:text-slate-300">
              🟢 Online
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/15 backdrop-blur dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 p-5">
            <p className="text-sm text-white/80 dark:text-slate-400">
              Login Terakhir
            </p>
            <p className="mt-2 font-semibold text-white">Hari ini, 08:12 WIB</p>
          </div>

          <div className="rounded-2xl bg-white/15 backdrop-blur dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 p-5">
            <p className="text-sm text-white/80 dark:text-slate-400">
              Hak Akses
            </p>
            <p className="mt-2 font-semibold text-white dark:text-emerald-400">
              Full Access
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 backdrop-blur dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 p-5">
            <p className="text-sm text-white/80 dark:text-slate-400">Cabang</p>
            <p className="mt-2 font-semibold text-white">Pontianak</p>
          </div>

          <div className="rounded-2xl bg-white/15 backdrop-blur dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 p-5">
            <p className="text-sm text-white/80 dark:text-slate-400">Versi</p>
            <p className="mt-2 font-semibold text-white">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
