import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuTag, LuText, LuDollarSign, LuAlignLeft, LuCalendar, LuUsers, LuReceipt } from "react-icons/lu";
import ExpenseDetailCard from '../components/layout/ExpenseDetailCard';
import UserAvatar from '../components/layout/UserAvatar';
import api from '../services/Api'
import Loading from '../components/layout/Loading';

const ExpenseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    api.get(`/spending/${id}`)
      .then(({ data }) => {
        setExpense(data);    // ← dados já prontos
      })
      .catch((err) => {
        console.error("Erro ao buscar despesas:", err);
      })
      .finally(() => setRemoveLoading(true));
  }, [id]);

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

  const formattedDate = new Date(expense.registrationDate).toLocaleDateString('pt-BR', {
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
            {expense.expensesDividedAcconts && expense.expensesDividedAcconts.map(user => (
              <div key={user.id} className="flex items-center gap-3">
                <UserAvatar src={user.avatar} alt={user.firstName} />
                <span className="text-base text-gray-800">{user.firstName}</span>
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold "
        >
          Atualizar despesa
        </button>
      </div>

      {!removeLoading && <Loading />}

    </div>
  );
};

export default ExpenseDetails;