import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const Textarea = ({
  id,
  name,
  placeholder,
  onChange,
  className = "",
  disabled = false,
  success = false,
  error = false,
  hint,
  ref,
  ...props
}: TextareaProps) => {
  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden placeholder:text-gray-400 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    textareaClasses +=
      " bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  } else if (error) {
    textareaClasses +=
      " bg-transparent border-error-500 focus:border-error-300 focus:ring-3 focus:ring-error-500/20 dark:border-error-500 dark:bg-gray-900 dark:text-white/90";
  } else {
    textareaClasses +=
      " bg-transparent text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";
  }

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        className={textareaClasses}
        {...props}
      />

      {hint && (
        <p
          className={`mt-1 text-xs ${
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
};

export default Textarea;
