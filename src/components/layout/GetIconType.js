import { LuDollarSign , LuCar, LuUtensils, LuLightbulb, LuHouse, LuPartyPopper, LuHeartPulse, LuShoppingCart, LuBook, LuPlane, LuEllipsis } from "react-icons/lu";

const GetIconType = ({ type }) => {
    switch (type) {
        case "COMIDA": return <LuUtensils size={20} className="text-[#636AE8]" />;
        case "TRANSPORTE": return <LuCar size={20} className="text-[#636AE8]" />;
        case "UTILITARIAS": return <LuLightbulb size={20} className="text-[#636AE8]" />;
        case "CASA": return <LuHouse size={20} className="text-[#636AE8]" />;
        case "ENTRETENIMENTO": return <LuPartyPopper size={20} className="text-[#636AE8]" />;
        case "SAUDE": return <LuHeartPulse size={20} className="text-[#636AE8]" />;
        case "SHOPPING": return <LuShoppingCart size={20} className="text-[#636AE8]" />;
        case "EDUCACAO": return <LuBook size={20} className="text-[#636AE8]" />;
        case "VIAGEM": return <LuPlane size={20} className="text-[#636AE8]" />;
        case "OUTROS": return <LuEllipsis size={20} className="text-[#636AE8]" />;
        default: return <LuDollarSign size={20} className="text-[#636AE8]" />;
    }
};

export default GetIconType;