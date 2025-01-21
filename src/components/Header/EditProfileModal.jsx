import {
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

import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

import { toggleProfileModal, setProfile } from "../../store/profileSlice";

import AvatarMan from "../../icons/avatar_man.png";
import AvatarBoy from "../../icons/avatar_boy.png";
import AvatarLady from "../../icons/avatar_lady.png";
import AvatarGirl from "../../icons/avatar_girl.png";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase/firestore_config";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

const EditProfileModal = ({ profileData, isProfileModalOpen }) => {
  const dispatch = useDispatch();

  const { name, avatar, calorieGoal } = profileData;

  const [avatarRadio, setAvatarRadio] = useState(avatar);
  const nameRef = useRef();
  const calorieGoalRef = useRef();

  const handleShowModal = () => {
    dispatch(toggleProfileModal());
  };

  const handleAvatarChange = (e) => {
    const avatarValue = e.target.value;
    setAvatarRadio(avatarValue);
  };

  const submitProfileUpdate = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const calorieGoal = calorieGoalRef.current.value;

    (async function () {
      const newProfileData = {
        name,
        calorieGoal,
        avatar: avatarRadio,
      };

      await setDoc(doc(db, "profile", "data"), newProfileData);
      dispatch(setProfile(newProfileData));
      dispatch(toggleProfileModal());
    })();
  };

  return (
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
                defaultValue={name}
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
                defaultValue={calorieGoal}
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
  );
};

export default EditProfileModal;
