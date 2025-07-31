import { GoCheckCircleFill } from "react-icons/go";
import { FaCircleChevronRight } from "react-icons/fa6";

import api from '../services/Api'
import { useState, useEffect } from 'react';
import Loading from '../components/layout/Loading';
import { Link } from "react-router-dom";
//import { useAuth } from '../contexts/AuthContext'; 

import styles from './MySpending.module.css'
import FormattedValue from "../components/layout/FormattedValue";


const MySpending = () => {

    const [removeLoading, setRemoveLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    //const { user } = useAuth();

    useEffect(() => {
        api
            .get("/spending?sort=createdAt,desc")
            .then(({ data }) => {
                setExpenses(data.content);    // ← dados já prontos
            })
            .catch((err) => {
                console.error("Erro ao buscar despesas:", err);
            })
            .finally(() => setRemoveLoading(true));
    }, []);

    return (
        <div className="min-h-screen bg-white px-1 py-4 overflow-y-auto pb-24">

            {/* Content */}
            {expenses.length > 0 && (
                <div className="space-y-4">
                    {expenses.map((exp, index) => (
                        <div
                            key={index}
                            className="border rounded-xl px-4 py-3 shadow-sm bg-white"
                        >
                            <Link to={`/expense/${exp.id}`}>
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[exp.type]}`}>
                                        {exp.type}
                                    </span>
                                    <span className="text-indigo-600 font-semibold"><FormattedValue value={exp.value} /></span>
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
                                                <span>{exp.totalParticipants}/{exp.totalPayingCustomers}</span>
                                            </>
                                        )
                                        }
                                    </div>

                                    <FaCircleChevronRight className="text-indigo-500 text-xl" />
                                </div>
                            </Link>
                        </div>
                        // </Link>
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