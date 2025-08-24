import { useState, useEffect } from 'react';
import api from '../services/Api';
import Loading from '../components/layout/Loading';
import FormattedValue from '../components/layout/FormattedValue';
import GetIconType from '../components/layout/GetIconType';
import FormattedDate from '../components/layout/FormattedDate';


const MyDebts = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Busca os detalhes da despesa na API
    api.get(`/expenses-divided-accounts`)
      .then(({ data }) => {
        setExpenses(data.content);
        setTotal(data.content.reduce((acc, item) => acc + parseFloat(item.value), 0));
      })
      .catch(err => {
        console.error("Erro ao carregar suas dividas:", err);
        setError("Não foi possível carregar os detalhes da despesa.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center p-12 text-lg text-red-500">{error}</div>;
  }

  // Renderização da tela
  return (
    <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto">

      {/* Pagamentos Pendente */}
      <div className="bg-[#E5E7F8] rounded-xl p-6 text-center mb-6 border-[#CCCEF5] border-2 ">
        <p className="text-[#E8618C] text-xl font-bold text-left">Pagamentos Pendentes</p>
        <p className="text-sm text-gray-500 text-left">Seu resumo de débitos</p>
        <p className="text-5xl font-bold text-[#E8618C] mt-4"><FormattedValue value={total} /></p>
        <p className="text-sm text-gray-500">Total pendente em suas despesas</p>
        {/*
        <button className="mt-3 bg-pink-500 text-white py-2 px-4 rounded-lg w-full">
          Pagar Tudo Agora
        </button>
        */}
      </div>

      {/* Lista de Despesas */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium text-base">Despesas Detalhadas</h2>
      </div>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Nenhuma despesa encontrada.</p>
        ) : (
          expenses.map((exp) => (
            <div key={exp.id} className="border  bg-white rounded-lg p-4 shadow-sm flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-2 rounded-full text-[#636AE8]">
                  <GetIconType type={exp.spendingType}/>
                </div>

                <div className="flex-grow">
                  <h3 className="font-medium text-lg">{exp.spendingTitle}</h3>
                  <p className="text-gray-500 text-sm">{exp.spendingDescription}</p>
                </div>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <div className="text-right">
                  <p className="font-bold text-[#636AE8] text-2xl"><FormattedValue value={exp.value} /></p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm"><FormattedDate date={exp.spendingDate} /></p>
                </div>
              </div>

              <div className="flex justify-between pt-2 pb-2">
                <div className="flex items-center text-sm text-gray-700 space-x-2">
                  <span className='font-medium'>Participantes:</span>
                  <div className="flex items-center">
                    {exp.spendingParticipantsIds.map((id, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full bg-indigo-200 bg-cover bg-center ${index > 0 ? '-ml-2' : ''}`}
                        style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/user/profile-picture/download/${id})` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <button className="text-gray-500 text-xs font-semibold p-2.5 px-5 border rounded-lg hover:bg-pink-600 hover:text-white transition duration-300">
                  &gt; Ver Detalhes
                </button>
                <button className="bg-[#E8618C] text-white text-xs font-semibold p-3 px-5 rounded-full hover:bg-pink-600 transition duration-300">
                  Pagar
                </button>
              </div>
            </div>

          ))
        )}
      </div>
    </div >
  );
};

export default MyDebts;