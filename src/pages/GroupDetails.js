import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {LuText, LuDollarSign, LuAlignLeft, LuUsers } from "react-icons/lu";
import GroupDetailCard from '../components/layout/DetailCard';
import api from '../services/Api'
import Loading from '../components/layout/Loading';
import FormattedValue from '../components/layout/FormattedValue';
import SubmitButton from '../components/form/SubmitButton';

const GroupDetails = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        api.get(`/group/${id}`)
            .then(({ data }) => {
                setGroup(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar grupo:", err);
            })
            .finally(() => setRemoveLoading(true));
    }, [id]);

    if (error) {
        return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
    }

    if (!group) {
        return <Loading />;
    }

    const handleAddRemoveUsers = () => {
        console.log("Abrir funcionalidade Adicionar/Remover Gasto");
    };

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">
            {/* Detalhes do grupo */}
            <div className="space-y-4">

                <GroupDetailCard icon={<LuText size={24} />} label="Título da Despesa">
                    <p className="text-base">{group.name}</p>
                </GroupDetailCard>

                <GroupDetailCard icon={<LuDollarSign size={24} />} label="Valor Total">
                    <p className="font-semibold text-blue-600"><FormattedValue value={group.totalValue} /></p>
                </GroupDetailCard>

                <GroupDetailCard icon={<LuAlignLeft size={24} />} label="Descrição">
                    <p className="text-base">{group.description}</p>
                </GroupDetailCard>

                {group.spendings && group.spendings.length > 0 && (
                    <GroupDetailCard icon={<LuUsers size={24} />} label="Despesas Envolvidos">
                        <div className="flex flex-col gap-2 mt-2">
                            {group.spendings && group.spendings.map(spending => (
                                <div key={spending.id} className="flex items-center gap-3">
                                    <span className="text-base text-gray-800">{spending.title}</span>
                                </div>
                            ))}
                        </div>
                    </GroupDetailCard>
                )}

                {/* Botão de Ação Inferior */}
                <SubmitButton
                    onClick={handleAddRemoveUsers}
                    classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold "
                    text="Atualizar gasto"
                />
            </div>

            {!removeLoading && <Loading />}

        </div>
    );
};

export default GroupDetails;