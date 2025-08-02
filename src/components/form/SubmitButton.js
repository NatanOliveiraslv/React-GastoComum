const SubmitButton = ({text, icon, classButton, onClick}) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={`${classButton}`}>
            {icon}
            {text}
        </button>
    )
}

export default SubmitButton 