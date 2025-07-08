import { NavLink } from "react-router-dom";

import { BiHomeAlt, BiWalletAlt , BiListUl, BiUser  } from "react-icons/bi";

function BottomNav() {
  const linkClass =
    "flex flex-col items-center justify-center flex-1 text-sm text-gray-600 hover:text-indigo-600";

  const activeClass = "text-indigo-600";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/home"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}
        >
          <BiHomeAlt size={24} />
          <span className="text-[10px] sm:text-xs">Dashboard</span>
        </NavLink>

        <NavLink
          to="/meus-gastos"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}
        >
          <BiWalletAlt   size={24} />
          <span className="text-[10px] sm:text-xs">Meus gastos</span>
        </NavLink>

        <NavLink
          to="/grupos"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}
        >
          <BiListUl size={24} />
          <span className="text-[10px] sm:text-xs" >Lista de grupos</span> 
        </NavLink>

        <NavLink
          to="/perfil"
          className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}
        >
          <BiUser size={24} />
          <span className="text-[10px] sm:text-xs">Minhas despesas</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNav;
