import {
  Avatar,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio,
} from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";

import {
  showProfileModal,
  setProfileInput,
  setProfileData,
} from "../../store/profileSlice";

import Logo from "../../icons/logo.svg";
import AvatarMan from "../../icons/avatar_man.png";
import AvatarBoy from "../../icons/avatar_boy.png";
import AvatarLady from "../../icons/avatar_lady.png";
import AvatarGirl from "../../icons/avatar_girl.png";

import { IoSettingsOutline } from "react-icons/io5";
import { useRef, useState } from "react";

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
  const nameRef = useRef();
  const calorieGoalRef = useRef();

  const [avatarRadio, setAvatarRadio] = useState("man");

  const { isProfileModalOpen, profileInput } = useSelector(
    (state) => state.profile.UI
  );
  const { profileData } = useSelector((state) => state.profile);

  const handleShowModal = () => {
    dispatch(showProfileModal());
    if (!isProfileModalOpen) {
      for (const [key, value] of Object.entries(profileData)) {
        dispatch(setProfileInput({ inputName: key, inputValue: value }));
      }
    }
  };

  const submitProfileUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const calorieGoal = calorieGoalRef.current.value;

    dispatch(setProfileData({ inputName: "name", inputValue: name }));
    dispatch(
      setProfileData({ inputName: "calorieGoal", inputValue: calorieGoal })
    );
    dispatch(setProfileData({ inputName: "avatar", inputValue: avatarRadio }));
    dispatch(showProfileModal());
  };

  const handleAvatarChange = (e) => {
    const avatarValue = e.target.value;
    setAvatarRadio(avatarValue);
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
        <Button size="lg" variant="plain" onClick={handleShowModal}>
          <Avatar src={AVATARS[profileData.avatar]}></Avatar>
        </Button>
      </header>
      <Modal open={isProfileModalOpen} onClose={handleShowModal}>
        <ModalDialog>
          <ModalClose></ModalClose>
          <Typography level="title-lg" my={2}>
            Profil szerkesztése
          </Typography>
          <form style={{ padding: "24px 0" }} onSubmit={submitProfileUpdate}>
            <Stack gap={3}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ gap: 1 }}>
                  <Typography color="neutral">Név</Typography>
                </FormLabel>
                <Input
                  sx={{ width: "100%" }}
                  defaultValue={profileInput.name}
                  name="name"
                  slotProps={{
                    input: {
                      ref: nameRef,
                    },
                  }}
                />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ gap: 1 }}>
                  <Typography color="neutral">Avatar</Typography>
                </FormLabel>
                <RadioGroup
                  orientation="horizontal"
                  sx={{ justifyContent: "space-between" }}
                  value={avatarRadio}
                  name="avatar"
                  onChange={handleAvatarChange}
                >
                  {Object.entries(AVATARS).map((avatar) => {
                    const value = avatar[0];
                    const img = avatar[1];
                    return (
                      <Sheet
                        key={value}
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          opacity: `${value === avatarRadio ? "1" : "0.5"}`,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Radio
                          label={<img src={img} alt={value} width="100%" />}
                          overlay
                          disableIcon
                          value={value}
                        />
                      </Sheet>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ gap: 1 }}>
                  <Typography color="neutral">Napi kalóriacél</Typography>
                </FormLabel>
                <Input
                  type="number"
                  sx={{ width: "100%" }}
                  defaultValue={profileInput.calorieGoal}
                  endDecorator="kcal"
                  name="calorieGoal"
                  slotProps={{
                    input: {
                      ref: calorieGoalRef,
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <Button type="submit">Módosít</Button>
              </FormControl>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Header;
