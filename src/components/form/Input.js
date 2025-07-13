const InputField = ({ classLabel, label, type, name, placeholder, classInput, value, onChange, icon, subtitle, error }) => {
  return (
    <div>
      <label className={classLabel}>{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`${classInput} ${error ? "border-red-500" : []}` }
          value={value}
          onChange={onChange}
        />
        {icon}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}


export default InputField;
