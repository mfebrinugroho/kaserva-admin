import Label from "@/components/ui/input/Label";

const AddOwnerPage = () => {
  return (
    <form className="">
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Tambah Owner Resto/Toko
      </h4>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="col-span-1">
          <Label htmlFor="owner">Pilih Owner</Label>
          <input
            id="owner"
            type="text"
            placeholder="Musharof"
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="last-name"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            placeholder="Chowdhury"
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="email-address"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email Address
          </label>
          <input
            id="email-address"
            type="email"
            placeholder="randomuser@pimjo.com"
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="+09 363 398 46"
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label
            htmlFor="team-manager"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Bio
          </label>
          <input
            id="team-manager"
            type="text"
            placeholder="Team Manager"
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <button
          type="button"
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200 sm:w-auto"
        >
          Close
        </button>
        <button
          type="button"
          className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AddOwnerPage;
