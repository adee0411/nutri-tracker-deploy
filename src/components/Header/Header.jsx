import { Typography, Stack, Switch, Sheet } from "@mui/joy";

import { useSelector } from "react-redux";

import Logo from "../../icons/logo.svg";

import { Link } from "react-router";
import EditProfileModal from "./EditProfileModal";

import Navigation from "../../UI/Navigation";
import { useEffect, useState } from "react";
import MainNavigation from "./MainNavigation";

const Header = () => {
  const { isProfileModalOpen } = useSelector((state) => state.profile.UI);
  const { profileData } = useSelector((state) => state.profile);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth <= 650) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
    };
  });

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "transparent",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <MainNavigation />
        {/**
           *           <Stack
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
            {isMobile ? <Navigation /> : ""}
          </Stack>
           */}
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
