import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSquarePlus } from "react-icons/lu";
import InputField from '../components/form/Input';
import TextArea from '../components/form/TextArea';
import api from '../services/Api';
import SubmitButton from '../components/form/SubmitButton';
import Loading from '../components/layout/Loading';

const CreateGroup = () => {
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState({
        name: '',
        description: '',
        expenses: [], // Para armazenar despesas associadas ao grupo
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setGroupData({ ...groupData, [e.target.name]: e.target.value });
    };

    const handleAddExpenseClick = () => {
        // Lógica para adicionar uma despesa ao grupo
        // Isso pode navegar para uma tela de criação de despesa,
        // ou abrir um modal para selecionar despesas existentes.
        // Por simplicidade, aqui apenas um console.log.
        console.log("Adicionar Gasto ao Grupo clicado!");
        // Exemplo: navigate('/add-expense-to-group', { state: { groupId: groupData.id } });
        alert("Funcionalidade de 'Adicionar Gasto' a ser implementada.");
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        api.post('/group', groupData)
            .then(response => {
                console.log('Grupo criado com sucesso:', response.data);
                navigate('/groups', { state: { message: 'Grupo criado com sucesso!' } }); // Redireciona para a lista de grupos
            })
            .catch(err => {
                console.error('Erro ao criar grupo:', err);
                setError('Não foi possível criar o grupo. Por favor, tente novamente.');
            })
            .finally(() => {
                setLoading(false);
            })

    };

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto">
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
                    className="w-full border border-gray-300 py-4 rounded-md flex pl-4 gap-2  text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6 "
                >
                    <LuSquarePlus className="text-xl" /> Adicionar Gasto
                </button>

                <SubmitButton
                    classButton="bottom-24 fixed left-1/2 -translate-x-1/2 w-[90%] bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold z-50"
                    text="Criar grupo"
                />
            </form>
        </div>
    );
};

export default CreateGroup;