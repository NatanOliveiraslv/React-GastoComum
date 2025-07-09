import { useState } from "react";
import { FiCalendar, FiUpload } from "react-icons/fi";
import { BsReceipt, BsPlus } from "react-icons/bs";
import { MdOutlineFastfood, MdOutlineDirectionsCar, MdOutlineLightbulb, MdOutlineHome, MdOutlineMusicNote, MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdOutlineSchool, MdOutlineFlight, MdMoreHoriz } from "react-icons/md";
import { LuPencilLine, LuDollarSign  } from "react-icons/lu";

const categories = [
    { label: "Food", icon: <MdOutlineFastfood /> },
    { label: "Transport", icon: <MdOutlineDirectionsCar /> },
    { label: "Utilities", icon: <MdOutlineLightbulb /> },
    { label: "Housing", icon: <MdOutlineHome /> },
    { label: "Entertainment", icon: <MdOutlineMusicNote /> },
    { label: "Health", icon: <MdOutlineFavoriteBorder /> },
    { label: "Shopping", icon: <MdOutlineShoppingCart /> },
    { label: "Education", icon: <MdOutlineSchool /> },
    { label: "Travel", icon: <MdOutlineFlight /> },
    { label: "Other", icon: <MdMoreHoriz /> }
];

export default function AddExpense() {
    const [selectedCategory, setSelectedCategory] = useState("Food");

    return (
        <div className="min-h-screen bg-white px-4 py-6">
            {/* Expense Title */}
            <div className="mb-4">
                <p className="text-lg pb-5" >Detalhes da despesa</p>
                <label className="block text-sm mb-1">Titulo da despesa</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Mantimentos, aluguel, mercado..."
                        className="w-full pl-10 pr-3 py-2 border rounded-md text-sm placeholder-gray-400"
                    />
                    <LuPencilLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Um título claro ajuda a identificar a despesa.</p>
            </div>

            {/* Value */}
            <div className="mb-4">
                <label className="block text-sm  mb-1">Valor</label>
                <div className="relative">
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-10 pr-3 py-2 border rounded-md text-sm placeholder-gray-400"
                    />
                    <LuDollarSign  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter the total amount spent.</p>
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm  mb-1">Description</label>
                <textarea
                    placeholder="Briefly describe the expense..."
                    className="w-full border rounded-md px-3 py-2"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Optional: Add more context to this expense.</p>
            </div>

            {/* Date */}
            <div className="mb-4">
                <label className="block text-sm  mb-1">Date of Expense</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                    <input type="date" className="w-full outline-none" />
                    <FiCalendar className="text-gray-400 ml-2" />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
                <label className="block text-sm  mb-2">Category</label>
                <div className="grid grid-cols-3 gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.label}
                            type="button"
                            onClick={() => setSelectedCategory(cat.label)}
                            className={`flex flex-col items-center justify-center border rounded-md p-2 text-sm text-gray-600 ${selectedCategory === cat.label ? "border-indigo-500 text-indigo-600" : ""}`}
                        >
                            <div className="text-xl">{cat.icon}</div>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Receipt Upload */}
            <div className="mb-6">
                <label className="block text-sm  mb-1">Receipt</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center text-gray-500 text-sm">
                    <BsReceipt className="mx-auto mb-2 text-xl" />
                    Drag & drop files or <span className="text-blue-500 underline cursor-pointer">Browse</span>
                    <p className="text-xs mt-1">Supported formats: JPG, PNG, PDF (max 5MB)</p>
                </div>
            </div>

            {/* Add Participants */}
            <button className="w-full border border-gray-300 text-sm flex items-center justify-center gap-2 py-2 rounded-md mb-4">
                <BsPlus /> Add Participants
            </button>

            {/* Add Expense Button */}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full ">
                Add Expense
            </button>
        </div >

    );
}
