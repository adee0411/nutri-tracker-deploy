import React from "react";
import {
  Dropdown,
  MenuButton,
  Stack,
  Typography,
  Menu,
  IconButton,
  Avatar,
} from "@mui/joy";
import { Link } from "react-router";

import AuthForm from "./AuthForm";

import { AuthContext } from "../../AuthProvider";
import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleProfileModal } from "../../store/profileSlice";
import { setIsMenuOpen } from "../../store/appSlice";

import Logo from "../../icons/logo.svg";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { PiUserCircleThin } from "react-icons/pi";
import { RiLogoutCircleRLine } from "react-icons/ri";

import AvatarMan from "../../icons/avatar_man.png";
import AvatarBoy from "../../icons/avatar_boy.png";
import AvatarLady from "../../icons/avatar_lady.png";
import AvatarGirl from "../../icons/avatar_girl.png";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

const MainNavigation = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { user, signOutUser } = authContext;
  const { avatar } = useSelector((state) => state.profile.profileData);

  const handleShowModal = () => {
    dispatch(toggleProfileModal());
  };

  const handleSignOut = () => {
    signOutUser().then(() => {});
    dispatch(setIsMenuOpen(false));
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{
        background: "transparent",
      }}
    >
      <Link to="/" viewTransition style={{ all: "unset", cursor: "pointer" }}>
        <Stack direction={"row"} gap={1} alignItems="center">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <img src={Logo} alt="logo" width="24px" />
          </Stack>

          <Typography level="h3" textAlign="center" flex={1} flexGrow={1}>
            NutriTracker
          </Typography>
        </Stack>{" "}
      </Link>

      {!user ? (
        <Dropdown>
          <MenuButton variant="plain" color="neutral" size="sm">
            <PiUserCircleThin fontSize={32} />
          </MenuButton>
          <Menu
            placement="bottom-end"
            color="neutral"
            variant="soft"
            size="sm"
            sx={{ p: 2 }}
          >
            <AuthForm />
          </Menu>
        </Dropdown>
      ) : (
        <Stack direction="row" gap={4} alignItems="center">
          <IconButton
            size="sm"
            sx={{ width: "fit-content", p: 0 }}
            variant="plain"
            onClick={handleShowModal}
          >
            <Avatar size="sm" src={AVATARS[avatar]}></Avatar>
          </IconButton>
          <IconButton
            size="sm"
            sx={{ width: "fit-content", p: 0 }}
            variant="plain"
            onClick={handleSignOut}
            title="Kijelentkezés"
          >
            <RiLogoutCircleRLine fontSize={24} />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default MainNavigation;
