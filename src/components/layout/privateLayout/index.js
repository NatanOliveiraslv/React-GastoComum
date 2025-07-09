import { Outlet } from "react-router-dom";

import BottomNav from "../bottomNav";
import Footer from "../footer";
import Container from "../container";
import TopBar from "../topBar";

const PrivateLayout = () => {
  return (
    <>
      <TopBar title="Adicionar despesa" />
      <Container customClass="column">
        <Outlet />
      </Container>
      <BottomNav />
    </>
  );
};

export default PrivateLayout;