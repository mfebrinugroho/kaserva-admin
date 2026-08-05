interface SwitchProps {
  activeLabel?: string;
  inactiveLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "success" | "gray";
}

const Switch = ({
  activeLabel,
  inactiveLabel,
  checked = false,
  disabled = false,
  onChange,
  color = "success", // Default to success color
}: SwitchProps) => {
  // const [isChecked, setIsChecked] = useState(checked);

  // const handleToggle = () => {
  //   if (disabled) return;
  //   const newCheckedState = !isChecked;
  //   setIsChecked(newCheckedState);
  //   if (onChange) {
  //     onChange(newCheckedState);
  //   }
  // };

  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const switchColors =
    color === "success"
      ? {
          background: checked
            ? "bg-success-500 "
            : "bg-gray-200 dark:bg-white/10", // success version
          knob: checked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: checked
            ? "bg-gray-800 dark:bg-white/10"
            : "bg-gray-200 dark:bg-white/10", // Gray version
          knob: checked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
      }`}
      onClick={handleToggle} // Toggle when the label itself is clicked
    >
      <div className="relative">
        <div
          className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${
            disabled
              ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
              : switchColors.background
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
        ></div>
      </div>
      {checked ? activeLabel : inactiveLabel}
    </label>
  );
};

export default Switch;
