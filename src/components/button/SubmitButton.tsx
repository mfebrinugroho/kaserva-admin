interface Props {
  disabled?: boolean;
  text?: string;
}

const SubmitButton = ({ disabled = false, text = "Simpan" }: Props) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full sm:w-30 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brand-500"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
