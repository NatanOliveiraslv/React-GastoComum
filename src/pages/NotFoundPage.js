import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
            <Link to="/home" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Voltar para a página inicial
            </Link>
        </div>
    );
}

export default NotFoundPage;