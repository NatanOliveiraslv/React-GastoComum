const FormattedDate = ({ date }) => {

    const dateObject = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(dateObject);

    return <>{formattedDate}</>;
}

export default FormattedDate;