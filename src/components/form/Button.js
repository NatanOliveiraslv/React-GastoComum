const Button = ({text, calssName}) => {
    return (
        <button
            type="submit"
            className={calssName}>
            {text}
        </button>
    )
}

export default Button