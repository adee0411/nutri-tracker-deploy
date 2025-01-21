import { Avatar, Button, Typography } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import { toggleProfileModal } from "../../store/profileSlice";

import Logo from "../../icons/logo.svg";

import { Link } from "react-router-dom";
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
      <header
        style={{
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "48px 1fr 48px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/">
          <div
            style={{
              width: "48px",
              height: "auto",
            }}
          >
            <img src={Logo} alt="logo" width="100%" />
          </div>
        </Link>

        <Typography level="h1" textAlign="center">
          NutriTracker
        </Typography>
        <Button size="lg" variant="plain" onClick={handleShowModal}>
          <Avatar src={AVATARS[avatar]}></Avatar>
        </Button>
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
