const TextArea = ({ description, name, classText, classLabel, placeholder, onChange, value, subtitle }) => {
    return (
        <>
            <label className={classLabel}>{description}</label>
            <textarea
                name={name}
                className={classText}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {subtitle && (
                <p className="text-xs text-gray-500">
                    {subtitle}
                </p>
            )}
        </>
    )
}

export default TextArea