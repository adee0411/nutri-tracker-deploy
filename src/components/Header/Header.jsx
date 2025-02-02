import { Avatar, Button, Typography, Stack } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import { toggleProfileModal } from "../../store/profileSlice";

import Logo from "../../icons/logo.svg";

import { Link } from "react-router";
import EditProfileModal from "./EditProfileModal";

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

const Header = () => {
  const dispatch = useDispatch();

  const { isProfileModalOpen } = useSelector((state) => state.profile.UI);
  const { profileData } = useSelector((state) => state.profile);
  const { avatar } = profileData;

  const handleShowModal = () => {
    dispatch(toggleProfileModal());
  };

  return (
    <>
      <header style={{ padding: "16px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {" "}
          <Link to="/" viewTransition>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <img src={Logo} alt="logo" width="32px" />
            </Stack>
          </Link>
          <Typography level="h2" textAlign="center" flex={1} flexGrow={1}>
            NutriTracker
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              size="sm"
              sx={{ width: "fit-content", p: 0 }}
              variant="plain"
              onClick={handleShowModal}
            >
              <Avatar size="sm" src={AVATARS[avatar]}></Avatar>
            </Button>
          </Stack>
        </Stack>
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
