import { Outlet } from "react-router";

import Header from "../components/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default RootLayout;
