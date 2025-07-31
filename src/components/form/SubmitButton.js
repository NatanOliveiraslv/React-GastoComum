const SubmitButton = ({text, classButton, onClick}) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={classButton}>
            {text}
        </button>
    )
}

export default SubmitButton 