import { Typography, Sheet } from "@mui/joy";

import PlaceholderImg from "../img/undraw_page-not-found_6wni.svg";
import { Link } from "react-router";

import Logo from "../icons/logo.svg";

const ErrorPage = () => {
  return (
    <Sheet
      sx={{
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        gap: 8,
      }}
    >
      <img src={Logo} alt="logo" width={64} style={{ margin: "0 auto" }} />
      <Typography level="title-lg" textAlign="center" fontSize={28}>
        A keresett oldal nem található!
      </Typography>
      <Typography color="primary">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/"
          viewTransition
        >
          Vissza a főoldalra
        </Link>
      </Typography>

      <img src={PlaceholderImg} alt="" width="60%" />
    </Sheet>
  );
};

export default ErrorPage;
