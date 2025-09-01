import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import Loading from '../components/layout/Loading';
import FormattedValue from '../components/layout/FormattedValue';
import GetIconType from '../components/layout/GetIconType';
import FormattedDate from '../components/layout/FormattedDate';

const Home = () => {
    const [totalExpense, setTotalExpense] = useState(0);
    const [spendingLimit] = useState(1500);
    const [categoriesData, setCategoriesData] = useState([]);
    const [recentSpending, setRecentSpending] = useState([]);
    const [recentDebts, setRecentDebts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseDashboard = await api.get('/dashboard');
                setTotalExpense(responseDashboard.data.totalValueSpendings);
                setCategoriesData(responseDashboard.data.categoriesSpendings);
                const responseSpending = await api.get('/spending?sort=createdAt,desc&size=3');
                setRecentSpending(responseSpending.data.content);
                const responseDebts = await api.get('/expenses-divided-accounts?sort=createdAt,desc&size=3');
                setRecentDebts(responseDebts.data.content);
            } catch (err) {
                console.error("Erro ao carregar os dados da dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24 space-y-5">
            {/* Gasto Total do Mês */}
            <div className="bg-white border p-6 rounded-lg shadow-sm">
                <h2 className="text-gray-900 text-lg mb-5 font-semibold">Gasto Total do Mês</h2>
                <p className="text-4xl font-bold text-indigo-600 mt-1"><FormattedValue value={totalExpense} /></p>
                {/* <div className="text-sm text-gray-500 mt-2">
                    do limite de R$ {spendingLimit.toFixed(2)}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                        className="h-2 rounded-full bg-yellow-400"
                        style={{ width: `${(totalExpense / spendingLimit) * 100}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Excelente! Parece que o orçamento está sendo gerido de forma eficiente este mês.
                </p> */}
            </div>

            {/* Despesas por Categoria */}
            <div className="bg-white border p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Despesas por Categoria</h2>
                <div className="flex justify-around items-end h-52">
                    {categoriesData.map((cat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className="w-12 rounded-t"
                                style={{ height: `${(cat.amount / 4) * 200}px`, backgroundColor: "#6C63FF" }}
                            ></div>
                            <span className="text-xs text-gray-600 mt-2">{cat.type}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Minhas Despesas Recentes */}
            <div className="ml-2 pb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Meus Gastos Recentes</h2>
                {recentSpending.length > 0 ? (
                    <div className="space-y-10 mt-8">
                        {recentSpending.map((expense, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="bg-slate-50 p-2 rounded-full text-blue-500">
                                    <GetIconType type={expense.enumType} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-base">{expense.title}</h3>
                                    <p className="text-gray-500 text-sm">{expense.description}</p>
                                    <p className="text-gray-500 text-xs"><FormattedDate date={expense.dateSpending} /></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-8">Voce ainda não possui nenhum gasto cadastrado.</p>
                )}
            </div>

            {/* Despesas de Grupo Recentes */}
            <div className="ml-2 pb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Meus Débitos Recentes</h2>
                {recentDebts.length > 0 ? (
                    <div className="space-y-10 mt-8">
                        {recentDebts.map((debts) => (
                            <div key={debts.id} className="flex items-center space-x-4">
                                <div className="bg-slate-50 p-2 rounded-full text-[#A855F7]">
                                    <GetIconType type={debts.spendingType} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-base">{debts.spendingTitle}</h3>
                                    <p className="text-gray-500 text-sm">{debts.spendingDescription}</p>
                                    <p className="text-gray-500 text-xs">{debts.spendingDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-8">Voce ainda não possui nenhum gasto cadastrado.</p>
                )}
            </div>

        </div>
    );
};

export default Home;