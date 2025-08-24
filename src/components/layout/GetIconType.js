import { LuDollarSign , LuCar, LuUtensils, LuLightbulb, LuHouse, LuPartyPopper, LuHeartPulse, LuShoppingCart, LuBook, LuPlane, LuEllipsis } from "react-icons/lu";

const GetIconType = ({ type, classType }) => {
    switch (type) {
        case "COMIDA": return <LuUtensils size={20} className={classType} />;
        case "TRANSPORTE": return <LuCar size={20} className={classType} />;
        case "UTILITARIAS": return <LuLightbulb size={20} className={classType} />;
        case "CASA": return <LuHouse size={20} className={classType} />;
        case "ENTRETENIMENTO": return <LuPartyPopper size={20} className={classType} />;
        case "SAUDE": return <LuHeartPulse size={20} className={classType} />;
        case "SHOPPING": return <LuShoppingCart size={20} className={classType} />;
        case "EDUCACAO": return <LuBook size={20} className={classType} />;
        case "VIAGEM": return <LuPlane size={20} className={classType} />;
        case "OUTROS": return <LuEllipsis size={20} className={classType} />;
        default: return <LuDollarSign size={20} className={classType} />;
    }
};

export default GetIconType;