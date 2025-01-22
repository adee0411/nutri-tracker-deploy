import { Avatar, Button, Typography, Switch, Stack } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import { toggleProfileModal } from "../../store/profileSlice";

import Logo from "../../icons/logo.svg";

import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

import AvatarMan from "../../icons/avatar_man.png";
import AvatarBoy from "../../icons/avatar_boy.png";
import AvatarLady from "../../icons/avatar_lady.png";
import AvatarGirl from "../../icons/avatar_girl.png";

import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

/*
export const profileUpdateAction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
};*/

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
      <header style={{ padding: "24px" }}>
        <Stack direction="row">
          {" "}
          <Link to="/">
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <img src={Logo} alt="logo" width="48px" />
            </Stack>
          </Link>
          <Typography level="h1" textAlign="center" flex={1}>
            NutriTracker
          </Typography>
          <Stack direction="row" sx={{ "& > *": { flex: 1 } }}>
            {/**             <Switch
              size="sm"
              startDecorator={<IoSunnyOutline />}
              endDecorator={<MdOutlineModeNight />}
              color="primary"
              variant="soft"
              slotProps={{ "aria-label": "Toggle theme" }}
            />*/}

            <Button size="sm" variant="plain" onClick={handleShowModal}>
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
