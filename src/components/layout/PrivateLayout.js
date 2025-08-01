import { Outlet } from "react-router-dom";

import BottomNav from "./BottomNav";
import Container from "./Container";
import TopBar from "./TopBar";

const PrivateLayout = ({title, bottomNav = true}) => {
  return (
    <>
      <TopBar title={title} />
      <Container customClass="column">
        <Outlet />
      </Container>
      {bottomNav && <BottomNav />}
    </>
  );
};

export default PrivateLayout;