import { Outlet } from "react-router-dom";

import BottomNav from "./BottomNav";
import Container from "./Container";
import TopBar from "./TopBar";

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