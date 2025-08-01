import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuTag, LuText, LuDollarSign, LuAlignLeft, LuCalendar, LuUsers, LuReceipt } from "react-icons/lu";
import ExpenseDetailCard from '../components/layout/ExpenseDetailCard';
import UserAvatar from '../components/layout/UserAvatar';
import api from '../services/Api'
import Loading from '../components/layout/Loading';
import FormattedValue from '../components/layout/FormattedValue';
import File from '../components/layout/File';
import SubmitButton from '../components/form/SubmitButton';

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
    return <Loading />;
  }

  const formattedDate = new Date(expense.dateSpending).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

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
          <p className="font-semibold text-blue-600"><FormattedValue value={expense.value} /></p> {/* Cor azul no valor */}
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuAlignLeft size={24} />} label="Descrição">
          <p className="text-base">{expense.description}</p>
        </ExpenseDetailCard>

        <ExpenseDetailCard icon={<LuCalendar size={24} />} label="Data da despesa">
          <p className="text-base">{formattedDate}</p>
        </ExpenseDetailCard>

        {expense.expensesDividedAcconts && expense.expensesDividedAcconts.length > 0 && (
        <ExpenseDetailCard icon={<LuUsers size={24} />} label="Usuários Envolvidos">
          <div className="flex flex-col gap-2 mt-2">
            {expense.expensesDividedAcconts && expense.expensesDividedAcconts.map(participant => (
              <div key={participant.userId} className="flex items-center gap-3">
                <UserAvatar userId={participant.userId} alt={participant.userFirstName} />
                <span className="text-base text-gray-800">{participant.userFirstName}</span>
              </div>
            ))}
          </div>
        </ExpenseDetailCard>
        )}

        {expense.voucher && (
          <ExpenseDetailCard icon={<LuReceipt size={24} />} label="Comprovante de Pagamento">
            <div className="flex flex-col items-center mt-2">
              <File fileName={expense.voucher.systemFileName}/>
            </div>
          </ExpenseDetailCard>
        )}

        {/* Botão de Ação Inferior */}
        <SubmitButton
          onClick={handleAddRemoveUsers}
          classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold "
          text="Atualizar despesa"
        />
      </div>

      {!removeLoading && <Loading />}

    </div>
  );
};

export default ExpenseDetails;