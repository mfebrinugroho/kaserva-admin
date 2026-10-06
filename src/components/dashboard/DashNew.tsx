const DashNew = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selamat Datang 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Warung Nusantara
          </h1>

          <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">
            Pantau performa toko, pesanan masuk, serta aktivitas pelanggan dari
            dashboard ini.
          </p>
        </div>

        {/* Status */}
        <div className="flex gap-4">
          <div className="rounded-2xl bg-emerald-100 px-5 py-3 dark:bg-emerald-500/10">
            <p className="text-xs text-emerald-600">Status</p>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

              <span className="font-semibold text-emerald-600">Buka</span>
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-100 px-5 py-3 dark:bg-indigo-500/10">
            <p className="text-xs text-indigo-600">Pesanan</p>

            <div className="mt-1 font-semibold text-indigo-600">Menerima</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashNew;
