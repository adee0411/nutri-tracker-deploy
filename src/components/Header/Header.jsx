import { Avatar, IconButton, Sheet, Typography } from "@mui/joy";

import Logo from "../../icons/logo.svg";
import AvatarImg from "../../icons/avatar.svg";

import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header
      style={{
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "48px 1fr 48px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "auto",
        }}
      >
        <img src={Logo} alt="logo" width="100%" />
      </div>
      <Typography level="h1" textAlign="center">
        NutriTracker
      </Typography>
      <IconButton size="lg" sx={{ fontSize: "30px" }}>
        <IoSettingsOutline />
      </IconButton>
    </header>
  );
};

export default Header;
