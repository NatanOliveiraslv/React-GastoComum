const InputField = ({ label, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
    </div>
  );
}

export default InputField;
