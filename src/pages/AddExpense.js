import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom" // Importe useLocation para pegar o state

import { FiCalendar } from "react-icons/fi";
import { LuPencilLine, LuDollarSign, LuCar, LuUtensils, LuLightbulb, LuHouse, LuPartyPopper, LuHeartPulse, LuShoppingCart, LuBook, LuPlane, LuEllipsis, LuUsers } from "react-icons/lu";

import InputFile from "../components/form/InputFile";
import api from '../services/Api'
import InputField from "../components/form/Input";
import TextArea from "../components/form/TextArea"
import SubmitButtonWatcher from "../components/form/SubmitButtonWatcher";

const AddExpense = ({ expenseData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [expense, setExpense] = useState(expenseData || {});
    const [receipt, setReceipt] = useState(null);
    const [selectedType, setSelectedType] = useState("Comida");
    const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);
    const [selectedParticipantNames, setSelectedParticipantNames] = useState([]);

    const type = [
        { label: "Comida", icon: <LuUtensils size={16} /> },
        { label: "Transporte", icon: <LuCar size={16} /> },
        { label: "Utilitárias", icon: <LuLightbulb size={16} /> },
        { label: "Casa", icon: <LuHouse size={16} /> },
        { label: "Entretenimento", icon: <LuPartyPopper size={16} /> },
        { label: "Saúde", icon: <LuHeartPulse size={16} /> },
        { label: "Shopping", icon: <LuShoppingCart size={16} /> },
        { label: "Educação", icon: <LuBook size={16} /> },
        { label: "Viagem", icon: <LuPlane size={16} /> },
        { label: "Outros", icon: <LuEllipsis size={16} /> },
    ];

    useEffect(() => {
        if (!expense.type) {
            setExpense((prev) => ({
                ...prev,
                type: selectedType.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            }));
        }
    }, [selectedType, expense.type]);

    useEffect(() => {
        if (location.state && location.state.selectedUsers) {
            const { selectedIds, selectedNames } = location.state.selectedUsers;
            setSelectedParticipantIds(selectedIds);
            setSelectedParticipantNames(selectedNames);
            // Limpar o state da localização para evitar re-execução indesejada em futuras navegações
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);


    const createSpending = async (e) => {
        e.preventDefault();

        // Adiciona os IDs dos participantes ao objeto expense antes de enviar
        const expenseWithParticipants = {
            ...expense,
            // Certifique-se de que o nome deste campo corresponda ao que seu backend espera para os participantes
            participantIds: selectedParticipantIds 
        };

        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(expenseWithParticipants)], { type: "application/json" }))

        if (receipt) {
            formData.append("voucher", receipt);
        }

        console.log("Dados da despesa a serem enviados:", expenseWithParticipants); 

        try {
            await api.post("/spending", formData)
            navigate('/my-spending', { state: { message: 'Despesa cadastrada com sucesso' } });
        } catch (err) {
            console.error("Erro ao cadastrar despesa:", err);
            // Adicione uma mensagem de erro para o usuário
            alert("Erro ao cadastrar despesa. Por favor, tente novamente.");
        }
    };


    const handleChange = (e) =>
        setExpense({ ...expense, [e.target.name]: e.target.value });

    const handleAddParticipantsClick = () => {
        // Navega para a tela de seleção de usuários
        navigate('/add-users-to-expense', { state: { initialSelectedIds: selectedParticipantIds } });
    };

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">
            <form encType="multipart/form-data" onSubmit={createSpending}>

                {/* Título */}
                <div className="mb-4">
                    <InputField
                        label="Título da despesa"
                        type="text"
                        name="title"
                        placeholder="Mercado, Aluguel..."
                        value={expense.title || ""}
                        onChange={handleChange}
                        classLabel="block text-sm mb-1"
                        classInput="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                        icon={<LuPencilLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
                        subtitle="Um título claro ajuda a identificar a despesa."
                    />
                </div>

                {/* Valor */}
                <div className="mb-4">
                    <InputField
                        label="Valor"
                        type="number"
                        name="value"
                        placeholder="0.00"
                        value={expense.value || ""}
                        onChange={handleChange}
                        classLabel="block text-sm mb-1"
                        classInput="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                        icon={<LuDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
                        subtitle="Valor da despesa."
                    />
                </div>

                {/* Descrição */}
                <div className="mb-4">
                    <TextArea
                        description="Descrição"
                        classLabel="block text-sm mb-1"
                        name="description"
                        placeholder="Descreva brevemente a despesa..."
                        classText="h-32 w-full border rounded-md px-3 py-2"
                        value={expense.description || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Data */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Data da despesa</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="dateSpending"
                            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm bg-transparent"
                            value={expense.dateSpending || ""}
                            onChange={handleChange}
                        />
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Categorias */}
                <div className="mb-4">
                    <label className="block text-lg mb-2">Categoria</label>
                    <div className="grid grid-cols-3 gap-3">
                        {type.map((type) => (
                            <button
                                key={type.label}
                                type="button"
                                onClick={() => {
                                    setSelectedType(type.label);
                                    setExpense((prev) => ({ ...prev, type: type.label.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") }));
                                }}
                                className={`flex flex-col items-center justify-center border rounded-md p-7 bg-[#F7F7F7] text-xs ${selectedType === type.label
                                        ? "border-indigo-500 text-indigo-600"
                                        : "text-gray-600"
                                    }`}
                            >
                                <div className="text-xl mb-1">{type.icon}</div>
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload de recibo */}
                <InputFile onFileChange={(file) => setReceipt(file)} />

                {/* Participantes */}
                <div className="mb-6">
                    <label className="block text-sm mb-1">Participantes</label>
                    {selectedParticipantNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-md bg-gray-50">
                            {selectedParticipantNames.map((firstName, index) => (
                                <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {firstName}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mb-2">Nenhum participante selecionado.</p>
                    )}
                    <button
                        type="button"
                        onClick={handleAddParticipantsClick}
                        className="w-full border py-4 rounded-md flex items-center gap-2 justify-center text-sm hover:bg-gray-50 transition-colors"
                    >
                        <LuUsers />
                        {selectedParticipantNames.length > 0 ? "Editar participantes" : "Adicionar participantes"}
                    </button>
                </div>

                {/* Botão principal */}
                <SubmitButtonWatcher
                    classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold"
                    text="Adicionar despesa"
                />
                    
            </form>
        </div>
    );
};

export default AddExpense;