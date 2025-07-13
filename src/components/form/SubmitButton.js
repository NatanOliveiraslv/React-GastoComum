const SubmitButton = ({text, classButton}) => {
    return (
        <button
            type="submit"
            className={classButton}>
            {text}
        </button>
    )
}

export default SubmitButton 