import { Outlet } from "react-router-dom";

import BottomNav from "../bottomNav";
import Footer from "../footer";
import Container from "../container";

const PrivateLayout = () => {
  return (
    <>
      <Container customClass="min-heigth">
        <Outlet />
      </Container>
      <BottomNav />
      <Footer />
    </>
  );
};

export default PrivateLayout;