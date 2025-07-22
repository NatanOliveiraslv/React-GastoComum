const ExpenseDetailCard = ({ icon, label, children }) => {
    return (
        <div className="border rounded-xl p-4 mb-4">
            <div className="flex items-start mb-2 "> {/* Cor principal */}
                {icon && <span className="mr-2 flex items-center mt-1 text-[#636AE8]">{icon}</span>}
                <div>
                    <span className="text-sm font-medium text-[#8C8D8B]">{label}</span>
                    <div className="text-base text-gray-800">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDetailCard;