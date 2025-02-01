import { Typography, Sheet } from "@mui/joy";

import PlaceholderImg from "../img/undraw_page-not-found_6wni.svg";
import { Link } from "react-router";

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
      <Typography level="title-lg" fontSize={28}>
        A keresett oldal nem található!
      </Typography>
      <Typography color="primary">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          Vissza a főoldalra
        </Link>
      </Typography>

      <img src={PlaceholderImg} alt="" width="60%" />
    </Sheet>
  );
};

export default ErrorPage;
