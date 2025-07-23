import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";

function TopBar({ title = "Gasto Comum" }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <h1 className="text-sm flex-1 text-center -ml-6">{title}</h1>
      <button onClick={() => navigate(-1)} className="absolute left-4 flex items-center space-x-4">
        <IoChevronBack />
      </button>
      <div className="absolute right-4 flex items-center space-x-4">
        <FiBell className="text-xl text-gray-600" />
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://i.pravatar.cc/300"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}

export default TopBar;