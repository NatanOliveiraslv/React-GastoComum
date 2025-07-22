import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuTag, LuText, LuDollarSign, LuAlignLeft, LuCalendar, LuUsers, LuReceipt } from "react-icons/lu";
import ExpenseDetailCard from '../components/layout/ExpenseDetailCard';
import UserAvatar from '../components/layout/UserAvatar';

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulação de dados (substitua por uma chamada real à API)
        // const response = await api.get(`/expenses/${id}`);
        // setExpense(response.data);

        // Dados de exemplo para o design
        const mockExpenseData = {
          id: id,
          type: "Comida",
          title: "Supermercado Mensal",
          value: 345.50,
          description: "Feira da semana no Supermercado Boa Esperança, inclui produtos de limpeza e alimentos perecíveis para a casa.",
          date: "2024-10-23", // Formato YYYY-MM-DD
          involvedUsers: [
            { id: 1, name: "Luana Veiga", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
            { id: 2, name: "Marcelo Peres", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
            { id: 3, name: "Carla Dias", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
          ],
          receiptUrl: "https://i.pravatar.cc/300", // Usando a imagem local de exemplo
        };
        setExpense(mockExpenseData);

      } catch (err) {
        console.error("Erro ao buscar detalhes da despesa:", err);
        setError("Não foi possível carregar os detalhes da despesa.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center p-12 text-lg text-gray-600">Carregando detalhes da despesa...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
  }

  if (!expense) {
    return <div className="text-center p-12 text-lg text-gray-600">Nenhum detalhe de despesa encontrado.</div>;
  }

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(expense.value);

  const formattedDate = new Date(expense.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handleViewReceipt = () => {
    if (expense.receiptUrl) {
      window.open(expense.receiptUrl, '_blank');
    }
  };

  const handleAddRemoveUsers = () => {
    console.log("Abrir funcionalidade Adicionar/Remover Usuários");
  };

  return (
    <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">
      {/* Detalhes da Despesa */}
      <div className="space-y-4">
        <ExpenseDetailCard
          icon={<LuTag size={24} />}
          label="Tipo de Despesa"
        >
          <p className="text-base">{expense.type.replace(/_/g, ' ')}</p>
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuText size={24} />} label="Título da Despesa">
          <p className="text-base">{expense.title}</p>
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuDollarSign size={24} />} label="Valor">
          <p className="font-semibold text-blue-600">{formattedValue}</p> {/* Cor azul no valor */}
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuAlignLeft size={24} />} label="Descrição">
          <p className="text-base">{expense.description}</p>
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuCalendar size={24} />} label="Data de Registro">
          <p className="text-base">{formattedDate}</p>
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuUsers size={24} />} label="Usuários Envolvidos">
          <div className="flex flex-col gap-2 mt-2">
            {expense.involvedUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3">
                <UserAvatar src={user.avatar} alt={user.name} />
                <span className="text-base text-gray-800">{user.name}</span>
              </div>
            ))}
          </div>
        </ExpenseDetailCard>

        {expense.receiptUrl && (
          <ExpenseDetailCard icon={<LuReceipt size={24} />} label="Comprovante de Pagamento">
            <div className="flex flex-col items-center mt-2">
              <img
                src={expense.receiptUrl}
                alt="Comprovante de Pagamento"
                className="max-w-full h-auto rounded-lg mb-4 shadow-md"
              />
              <button
                onClick={handleViewReceipt}
                className="w-full bg-violet-700 text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-violet-800 transition-colors"
              >
                Ver Comprovante
              </button>
            </div>
          </ExpenseDetailCard>
        )}

        {/* Botão de Ação Inferior */}
        <button
          onClick={handleAddRemoveUsers}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-sm font-semibold "
        >
          Atualizar despesa
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetails;