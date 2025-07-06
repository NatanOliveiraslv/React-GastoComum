import { Outlet } from "react-router-dom";

import NavBar from "../navbar";
import Footer from "../footer";
import Container from "../container";

const PrivateLayout = () => {
  return (
    <>
      <NavBar />
      <Container customClass="min-heigth">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default PrivateLayout;