import { IconButton, Typography } from "@mui/joy";
import { Link } from "react-router";

import { IoHomeOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const NAV_HEIGHT = 80;

const LINK_STYLE = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 3,
  fontSize: 18,
  textDecoration: "none",
  color: "inherit",
};
const BottomNavigation = () => {
  return (
    <nav
      style={{
        position: "fixed",
        height: `${NAV_HEIGHT}px`,
        width: "100%",
        background: "",
        top: `calc(100% - ${NAV_HEIGHT}px)`,
        backgroundColor: "rgba(58, 145, 245, 0.2)",
        backdropFilter: "blur(8px)",
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%)",
      }}
    >
      <menu
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        <li style={{ flex: 1 }}>
          <Link to="/profile" style={LINK_STYLE} viewTransition>
            <CgProfile />
            <Typography component="span" fontSize={12}>
              Profil
            </Typography>
          </Link>
        </li>
        <li style={{ flex: 1 }}>
          <Link to="/" style={LINK_STYLE} viewTransition>
            <IoHomeOutline />
            <Typography component="span" fontSize={12}>
              Főoldal
            </Typography>
          </Link>
        </li>
        <li style={{ flex: 1 }}>
          <Link to="/custom-ingredients" style={LINK_STYLE} viewTransition>
            <RiUserSettingsLine />
            <Typography component="span" fontSize={12}>
              Saját alapanyagok
            </Typography>
          </Link>
        </li>
      </menu>
    </nav>
  );
};

export default BottomNavigation;
