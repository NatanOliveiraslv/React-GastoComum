import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { useAuth } from '../../contexts/AuthContext';

function TopBar({ title = "Gasto Comum" }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const profilePictureUrl = `${process.env.REACT_APP_BASE_URL}/user/profile-picture/download/${user.id}`
  
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <h1 className="text-sm flex-1 text-center -ml-6">{title}</h1>
      <button onClick={() => navigate(-1)} className="absolute left-4 flex items-center space-x-4">
        <IoChevronBack />
      </button>
      <div className="absolute right-4 flex items-center space-x-4">
        <FiBell className="text-xl text-gray-600" />
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={profilePictureUrl}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </header>
  );
}

export default TopBar;