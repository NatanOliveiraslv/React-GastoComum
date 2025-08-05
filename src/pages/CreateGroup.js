import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuSquarePlus } from "react-icons/lu";
import InputField from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import api from '../services/Api';
import SubmitButton from '../components/form/SubmitButton';
import Loading from '../components/layout/Loading';

const CreateGroup = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const LOCAL_STORAGE_KEY = 'createGroupFormData';

    // 1. Inicialize o estado do formulário tentando carregar do localStorage
    const [groupData, setGroupData] = useState(() => {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            const initialData = savedData ? JSON.parse(savedData) : { name: '', description: '', spendingIds: [] };
            return { ...initialData, spendingIds: initialData.spendingIds || [] };
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            return { name: '', description: '', spendingIds: [] };
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Efeito para salvar o estado do formulário no localStorage sempre que groupData mudar
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(groupData));
    }, [groupData]);

    // 3. Efeito para lidar com despesas selecionadas da tela AddExpensesToGroup
    useEffect(() => {
        if (location.state && location.state.selectedExpenses) {
            const { selectedIds } = location.state.selectedExpenses;
            setGroupData(prevGroupData => ({
                ...prevGroupData,
                spendingIds: selectedIds
            }));

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]); 

    const handleChange = useCallback((e) => {
        setGroupData(prevGroupData => ({
            ...prevGroupData,
            [e.target.name]: e.target.value
        }));
    }, []);

    const handleAddExpenseClick = useCallback(() => {
        // Passa as despesas atualmente associadas ao grupo para a tela de seleção
        navigate('/add-expense-to-group', {
            state: { initialSelectedIds: groupData.spendingIds }
        });
    }, [navigate, groupData.spendingIds]);


    const handleCreateGroup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/group', groupData);
            console.log('Grupo criado com sucesso:', response.data);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            navigate('/groups', { state: { message: 'Grupo criado com sucesso!' } })
        } catch (err) {
            console.error('Erro ao criar grupo:', err);
            setError('Não foi possível criar o grupo. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <form onSubmit={handleCreateGroup}>
                {/* Detalhes do Grupo */}
                <div className="border rounded-xl shadow-sm p-4 mb-10">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes do Grupo</h2>

                    <div className="mb-4">
                        <InputField
                            label="Nome do Grupo"
                            type="text"
                            name="name"
                            placeholder="por exemplo, ferias, contas da família..."
                            value={groupData.name}
                            onChange={handleChange}
                            classLabel="block text-sm mb-1 text-gray-700"
                            classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            subtitle="Give your group a memorable name."
                        />
                    </div>

                    <div className="mb-4">
                        <TextArea
                            description="Descrição do Grupo"
                            name="description"
                            placeholder="por exemplo, despesas para nossa viagem às montanhas..."
                            value={groupData.description}
                            onChange={handleChange}
                            classLabel="block text-sm mb-1 text-gray-700"
                            classText="h-32 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            subtitle="Briefly describe the purpose of this group."
                        />
                    </div>
                </div>

                {/* Botão "Add Gasto" */}
                <button
                    type="button"
                    onClick={handleAddExpenseClick}
                    className="w-full border border-gray-300 py-4 rounded-md flex pl-4 gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6 "
                >
                    <LuSquarePlus className="text-xl" /> Adicionar Gasto
                </button>

                {/* Você pode exibir as despesas selecionadas aqui, se desejar */}
                {groupData.spendingIds.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Despesas Adicionadas:</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            {groupData.spendingIds.map((expenseId, index) => (
                                <li key={expenseId || index}>{`Despesa ID: ${expenseId}`}</li>
                            ))}
                        </ul>
                    </div>
                )}


                <SubmitButton
                    classButton="bottom-24 fixed left-1/2 -translate-x-1/2 w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold z-50"
                    text="Criar grupo"
                    disabled={!groupData.name || loading} 
                />
            </form>
        </div>
    );
};

export default CreateGroup;