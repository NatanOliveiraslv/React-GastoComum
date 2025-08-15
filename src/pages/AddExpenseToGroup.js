import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../components/layout/Loading';
import api from '../services/Api';
import SubmitButton from '../components/form/SubmitButton';
import SearchButton from '../components/layout/SearchButton';
import ExpenseSelectCard from '../components/layout/ExpenseSelectCard';

const AddExpensesToGroup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedExpenseIds, setSelectedExpenseIds] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api
            .get('/spending')
            .then(({ data }) => {
                setFilteredExpenses(data.content);

                // Se houver IDs iniciais passados pelo state (do CreateGroup)
                if (location.state && location.state.initialSelectedIds) {
                    setSelectedExpenseIds(new Set(location.state.initialSelectedIds));
                }
            })
            .catch((err) => {
                console.error("Erro ao carregar despesas:", err);
                setError("Não foi possível carregar as despesas.");
            })
            .finally(() => setLoading(false));
    }, [location.state]); // Adicionado location.state como dependência para carregar seleção inicial

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // A requisição de busca deve ser para o endpoint correto e passar o searchTerm
            api
                .get(`/spending?title=${searchTerm}&containsGroup=false`) // Assumindo que você busca por 'title'
                .then(({ data }) => {
                    setFilteredExpenses(data.content);
                })
                .catch((err) => {
                    console.error("Erro ao buscar despesas:", err);
                });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);


    const handleToggleSelect = (expenseId) => {
        setSelectedExpenseIds((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(expenseId)) {
                newSelected.delete(expenseId);
            } else {
                newSelected.add(expenseId);
            }
            return newSelected;
        });
    };

    const handleConfirmParticipants = () => {
        const selectedIdsArray = Array.from(selectedExpenseIds);

        // 3. Navegar de volta para a tela CreateGroup, passando os IDs no state
        navigate('/create-group', {
            state: {
                selectedExpenses: {
                    selectedIds: selectedIdsArray,
                }
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">

            {/* Campo de Busca */}
            <SearchButton
                placeholder="Buscar despesa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Lista de Despesas */}
            <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                {filteredExpenses.length === 0 && searchTerm !== '' ? (
                    <p className="text-center text-gray-500 mt-8">Nenhuma despesa encontrada para "{searchTerm}".</p>
                ) : filteredExpenses.length === 0 && searchTerm === '' ? (
                    <p className="text-center text-gray-500 mt-8">Nenhuma despesa cadastrada.</p>
                ) : (
                    filteredExpenses.map((expense) => (
                        <ExpenseSelectCard
                            key={expense.id}
                            expense={expense}
                            isSelected={selectedExpenseIds.has(expense.id)} 
                            onToggleSelect={handleToggleSelect}
                        />
                    ))
                )}
            </div>

            {/* Botão de Confirmação Flutuante */}
            <SubmitButton
                onClick={handleConfirmParticipants}
                classButton="bottom-10 fixed left-1/2 -translate-x-1/2 w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold z-50"
                text={`Confirmar despesas (${selectedExpenseIds.size})`}
                disabled={selectedExpenseIds.size === 0}
            />
        </div>
    );
};

export default AddExpensesToGroup;