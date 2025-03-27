import { Typography, Stack, Switch, Sheet } from "@mui/joy";

import { useSelector } from "react-redux";

import Logo from "../../icons/logo.svg";

import { Link } from "react-router";
import EditProfileModal from "./EditProfileModal";

import Navigation from "../../UI/Navigation";

const Header = () => {
  const { isProfileModalOpen } = useSelector((state) => state.profile.UI);
  const { profileData } = useSelector((state) => state.profile);

  return (
    <>
      <header>
        <Sheet
          color="primary"
          sx={{
            p: "16px",
            height: "inherit",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {" "}
            <Link to="/" viewTransition>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <img src={Logo} alt="logo" width="32px" />
              </Stack>
            </Link>
            <Typography level="h2" textAlign="center" flex={1} flexGrow={1}>
              NutriTracker
            </Typography>
            {}
            <Stack direction="row">
              <Navigation />
            </Stack>
          </Stack>
        </Sheet>
      </header>
      {isProfileModalOpen ? (
        <EditProfileModal
          profileData={profileData}
          isProfileModalOpen={isProfileModalOpen}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
