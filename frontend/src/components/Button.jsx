export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false
}) {

  const baseStyle =
    "px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  // Variações dos botões
  const variants = {
    primary: "bg-[#8b85f9] hover:bg-[#7a72e8] text-white",
    secondary: "bg-[#211f26] hover:bg-[#333138] text-white border border-white/10",
    danger: "bg-transparent text-white border border-white/10 hover:bg-red-600 hover:border-red-600",
    outline: "bg-transparent text-white border border-white/10 hover:bg-white/10"
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${selectedVariant} ${className}`}
    >
      {children}
    </button>
  );
}