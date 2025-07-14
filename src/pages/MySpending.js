import { GoCheckCircleFill } from "react-icons/go";
import { FaCircleChevronRight } from "react-icons/fa6";


import axios from '../services/api'
import { useState, useEffect } from 'react';
import { getToken } from "../services/auth";
import Loading from '../components/layout/Loading';
import { Link } from "react-router-dom";


const MySpending = () => {

    const [removeLoading, setRemoveLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    /*
    category: "Alimentação",
        value: "R$ 75.00",
        title: "Family Budget",
        description: "Monthly expenses for the household including groceries and utilities.",
        participants: "3/5"
     */

    useEffect(() => {
        axios
            .get("/spending", {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(({ data }) => {
                setExpenses(data);    // ← dados já prontos
            })
            .catch((err) => {
                console.error("Erro ao buscar despesas:", err);
            })
            .finally(() => setRemoveLoading(true));
    }, []);

    console.log(expenses)

    return (
        <div className="min-h-screen flex flex-col bg-white pb-12">

            {/* Content */}
            {expenses.length > 0 && (
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {expenses.map((exp, index) => (
                        <div
                            key={index}
                            className="border rounded-xl px-4 py-3 shadow-sm bg-white"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xs px-2 py-0.5 bg-yellow-400 text-white rounded-full font-medium">
                                    {exp.type}
                                </span>
                                <span className="text-indigo-600 font-semibold">R$ {exp.value}</span>
                            </div>
                            <div className="mt-2">
                                <h2 className="font-semibold text-sm">{exp.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3">

                                <div className="flex items-center gap-1 text-green-600 text-sm">
                                    {exp.totalParticipants > 0 && (
                                        <>
                                            <GoCheckCircleFill className="text-lg" />
                                            <span>{exp.totalParticipants}</span>
                                        </>
                                    )
                                    }
                                </div>

                                <FaCircleChevronRight className="text-indigo-500 text-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Action Button */}
            <div className="p-4">
                <button
                    className="fixed bottom-20 right-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-5 rounded-full shadow-lg z-50 flex items-center gap-2"
                >
                    <Link to={"/addExpense"}>
                        <span className="text-xl">＋</span>
                        Cadastrar Gasto
                    </Link>
                </button>
            </div>


            {!removeLoading && <Loading />}
            {removeLoading && expenses.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}

        </div>
    );
}

export default MySpending