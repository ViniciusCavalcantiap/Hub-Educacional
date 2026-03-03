export function FormTextarea({
  name,
  value,
  onChange,
  placeholder,
  maxLength
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-[#322f5c] px-4 py-2 rounded-lg text-white"
    />
  );
}