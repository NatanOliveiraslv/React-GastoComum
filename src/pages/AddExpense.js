import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { FiCalendar } from "react-icons/fi";
import { LuPencilLine, LuDollarSign, LuCar, LuUtensils, LuLightbulb, LuHouse, LuPartyPopper, LuHeartPulse, LuShoppingCart, LuBook, LuPlane, LuEllipsis, LuUsers } from "react-icons/lu";

import InputFile from "../components/form/InputFile";
import axios from '../services/api'
import { getToken } from "../services/auth";
import InputField from "../components/form/Input";
import TextArea from "../components/form/TextArea"


const AddExpense = ({ expenseData }) => {
    const navigate = useNavigate();
    const [expense, setExpense] = useState(expenseData || {});
    const [receipt, setReceipt] = useState(null);
    const [selectedType, setSelectedType] = useState("Comida");

    const categories = [
        { label: "Comida", icon: <LuUtensils size={16} /> },
        { label: "Transporte", icon: <LuCar size={16} /> },
        { label: "Utilitárias", icon: <LuLightbulb size={16} /> },
        { label: "Casa", icon: <LuHouse size={16} /> },
        { label: "Entretedimento", icon: <LuPartyPopper size={16} /> },
        { label: "Saúde", icon: <LuHeartPulse size={16} /> },
        { label: "Shopping", icon: <LuShoppingCart size={16} /> },
        { label: "Educação", icon: <LuBook size={16} /> },
        { label: "Viagem", icon: <LuPlane size={16} /> },
        { label: "Outros", icon: <LuEllipsis size={16} /> },
    ];

    const createSpending = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("data", JSON.stringify(expense));

        if (receipt) {
            formData.append("voucher", receipt);
        }

        await axios.post("/spending", formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
        )
            .then(resp => resp.json())
            .then(() => {
                navigate('/expenses', { state: { message: 'Desepsa cadastrada com sucesso' } });
            })
            .catch((err) => console.log(err))

    };


    const handleChange = (e) =>
        setExpense({ ...expense, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen bg-white px-4 py-6 overflow-y-auto pb-24">
            <form onSubmit={createSpending}>
                <p className="text-lg mb-5">Detalhes da despesa</p>

                {/* Título */}
                <div className="mb-4">
                    <InputField
                        label="Título da despesa"
                        type="text"
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
                        subtitle="Valor da desepsa."
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
                            name="date"
                            className="w-full pl-10 pr-3 py-2 border rounded-md text-sm bg-transparent"
                            value={expense.date || ""}
                            onChange={handleChange}
                        />
                        <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Categorias */}
                <div className="mb-4">
                    <label className="block text-lg mb-2">Categoria</label>
                    <div className="grid grid-cols-3 gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                type="button"
                                onClick={() => {
                                    setSelectedType(cat.label);
                                    setExpense((prev) => ({ ...prev, type: cat.label.toUpperCase() }));
                                }}
                                className={`flex flex-col items-center justify-center border rounded-md p-7 bg-[#F7F7F7] text-xs ${selectedType === cat.label
                                    ? "border-indigo-500 text-indigo-600"
                                    : "text-gray-600"
                                    }`}
                            >
                                <div className="text-xl mb-1">{cat.icon}</div>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload de recibo */}
                <InputFile onFileChange={(file) => setReceipt(file)} />

                {/* Participantes */}
                <div className="mb-6">
                    <button
                        type="button"
                        className="w-full border py-4 rounded-md flex items-center gap-2 justify-center text-sm"
                    >
                        <LuUsers />
                        Adicionar participantes
                    </button>
                </div>

                {/* Botão principal */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold"
                >
                    Adicionar despesa
                </button>
            </form>
        </div>
    );
};

export default AddExpense;