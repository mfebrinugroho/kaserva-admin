import { useState } from "react";
import Button from "../ui/button/Button";
import { ChevronDown, Store } from "lucide-react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { toast } from "sonner";

const StoreActiveDropdown = () => {
  const { user, setUser, userStores } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const updateActiveStoreMutation = useMutation({
    mutationFn: userService.updateActiveStore,
    onMutate: async (storeId) => {
      if (!user) return;

      const previousUser = user;

      setUser({
        ...user,
        store_id: storeId,
      });

      return { previousUser };
    },

    onSuccess: async (response) => {
      setUser(response.data);

      setIsOpen(false);

      toast.success(response.message);
    },
    onError: (error, _variables, context) => {
      if (context?.previousUser) {
        setUser(context.previousUser);
      }

      toast.error(error.message);
    },
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
  };

  const handleActiveStore = (storeId: number) => {
    setIsOpen(false);

    if (user?.store_id === storeId) {
      return;
    }

    updateActiveStoreMutation.mutate(storeId);
  };

  return (
    <div className="relative">
      <Button
        variant="storeActive"
        className="max-w-60 justify-between dropdown-toggle"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Store className="h-4 w-4 shrink-0" />
          {userStores
            ?.filter((store) => store.id === user?.store_id)
            .map((store) => (
              <span key={store.id} className="truncate">
                {store.name}
              </span>
            ))}
        </div>

        <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
      </Button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-60 mt-4.25 flex max-h-120 w-87.5 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-90.25 lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Pilih Resto/Toko
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {/* Example notification items */}
          {userStores?.map((store) => (
            <li key={store.id}>
              <DropdownItem
                tag="button"
                onClick={() => handleActiveStore(store.id)}
                className="flex items-center gap-3 rounded-lg border-b border-gray-100 p-3 px-2.5 py-1 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
              >
                <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                  <img
                    src={store.image_url}
                    // src="images/user/owner.jpg"
                    alt={store.name}
                    className="overflow-hidden rounded-full object-cover h-10 w-10"
                  />

                  <span
                    className={`absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white  ${user?.store_id === store.id ? "bg-success-500" : "bg-error-500"} dark:border-gray-900`}
                  ></span>
                </span>

                <span className="block">
                  <span className="mb-1.5 block  text-theme-sm text-gray-500 dark:text-gray-400 space-x-1">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {store.name}
                    </span>
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}

          {/* Add more items as needed */}
        </ul>
      </Dropdown>
    </div>
  );
};

export default StoreActiveDropdown;
