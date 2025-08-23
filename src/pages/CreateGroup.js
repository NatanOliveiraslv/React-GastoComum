import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuSquarePlus } from "react-icons/lu";
import InputField from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import api from '../services/Api';
import SubmitButton from '../components/form/SubmitButton';
import Loading from '../components/layout/Loading';

const CreateGroup = ({ groupData }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const LOCAL_STORAGE_KEY = 'createGroupFormData';

    // 1. Inicialize o estado do formulário tentando carregar do localStorage
    const [group, setGroup] = useState(() => {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedData ? { ...groupData, ...JSON.parse(savedData) } : (groupData || {});

        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            return groupData || {};
        }
    });

    const [selectedExpensesIds, setSelectedExpensesIds] = useState(() => {
        // Tente carregar IDs das despesas do localStorage
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedData ? (JSON.parse(savedData).selectedExpensesIds || []) : [];
        } catch (error) {
            return [];
        }
    });

    const [selectedExpensesTitle, setSelectedExpensesTitle] = useState(() => {
        // Tente carregar IDs das despesas do localStorage
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedData ? (JSON.parse(savedData).selectedExpensesTitle || []) : [];
        } catch (error) {
            return [];
        }
    });


    useEffect(() => {
        const formDataToSave = {
            ...group,
            selectedExpensesIds,
            selectedExpensesTitle
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formDataToSave));
    }, [group, selectedExpensesIds, selectedExpensesTitle]);

    useEffect(() => {
        if (location.state && location.state.selectedExpenses) {
            const { selectedIds, selectedTitle } = location.state.selectedExpenses;
            setSelectedExpensesIds(selectedIds);
            setSelectedExpensesTitle(selectedTitle);

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);

    const createGroup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const groupWithExpenses = { ...group, spendingIds: selectedExpensesIds };
        
        try {
            const response = await api.post('/group', groupWithExpenses);
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

    const handleChange = useCallback((e) => {
        setGroup(prevGroup => ({ ...prevGroup, [e.target.name]: e.target.value
        }));
    }, []);

    const handleAddExpenseClick = useCallback(() => {
        navigate('/add-expense-to-group', {
            state: { initialSelectedIds: selectedExpensesIds }
        });
    }, [navigate, selectedExpensesIds]);

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
            <form onSubmit={createGroup}>
                {/* Detalhes do Grupo */}
                <div className="border rounded-xl shadow-sm p-4 mb-10">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes do Grupo</h2>

                    <div className="mb-4">
                        <InputField
                            label="Nome do Grupo"
                            type="text"
                            name="name"
                            placeholder="por exemplo, ferias, contas da família..."
                            value={group.name || ''}
                            onChange={handleChange}
                            classLabel="block text-sm mb-1 text-gray-700"
                            classInput="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            subtitle="Dê ao seu grupo um nome memorável."
                        />
                    </div>

                    <div className="mb-4">
                        <TextArea
                            description="Descrição do Grupo"
                            name="description"
                            placeholder="por exemplo, despesas para nossa viagem às montanhas..."
                            value={group.description || ''}
                            onChange={handleChange}
                            classLabel="block text-sm mb-1 text-gray-700"
                            classText="h-32 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            subtitle="Descreva brevemente o propósito deste grupo."
                        />
                    </div>
                </div>


                <div className="mb-6">
                    <label className="block text-sm mb-1">Despesas Adicionadas:</label>
                    {selectedExpensesTitle.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md bg-gray-50">
                            {selectedExpensesTitle.map((title, index) => (
                                <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {title}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mb-2">Nenhum participante selecionado.</p>
                    )}

                    <button
                        type="button"
                        onClick={handleAddExpenseClick}
                        className="w-full border border-gray-300 py-4 rounded-md flex pl-4 gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
                    >
                        <LuSquarePlus className="text-xl" />
                        {selectedExpensesTitle.length > 0 ? "Editar despesas" : "Adicionar despesas"}
                    </button>
                </div>


                <SubmitButton
                    classButton="bottom-24 fixed left-1/2 -translate-x-1/2 w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold z-50"
                    text="Criar grupo"
                    disabled={!group.name || loading}
                />
            </form>
        </div>
    );
};

export default CreateGroup;