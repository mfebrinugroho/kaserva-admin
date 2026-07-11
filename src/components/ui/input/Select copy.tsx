import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  hint?: string;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      placeholder = "Select an option",
      className = "",
      hint,
      error = false,
      children,
      ...props
    },
    ref,
  ) => {
    let inputClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90  ${className}`;

    if (error) {
      inputClasses += ` border-error-500 bg-transparent focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800`;
    } else {
      inputClasses += ` border-gray-300 bg-transparent focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800`;
    }

    return (
      <div>
        <div className="relative">
          <select ref={ref} {...props} className={inputClasses}>
            <option
              value="0"
              disabled
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {placeholder}
            </option>

            {children}
          </select>

          <ChevronDown
            size={20}
            className="text-gray-400 dark:text-gray-400 absolute top-3 right-3 pointer-events-none"
          />
        </div>

        {hint && <p className="mt-1.5 text-xs text-error-500">{hint}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
