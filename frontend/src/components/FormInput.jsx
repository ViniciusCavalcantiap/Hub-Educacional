export function FormInput({
  name,
  value,
  onChange,
  placeholder
}) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
    />
  );
}