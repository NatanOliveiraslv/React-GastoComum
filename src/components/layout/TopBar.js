import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function TopBar({ title = "Gasto Comum" }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <button onClick={() => navigate(-1)} className="text-xl">
        <IoChevronBack />
      </button>
      <h1 className="text-lg font-semibold flex-1 text-center -ml-6">{title}</h1>
    
    </div>
  );
}

export default TopBar;