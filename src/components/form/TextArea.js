const TextArea = ( {description, name, classText, classLabel, placeholder, onChange, value} ) => {
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
        </>
    )
}

export default TextArea