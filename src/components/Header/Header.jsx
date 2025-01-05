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

import { showProfileModal } from "../../store/profileSlice";

import Logo from "../../icons/logo.svg";
import AvatarMan from "../../icons/avatar_man.png";
import AvatarBoy from "../../icons/avatar_boy.png";
import AvatarLady from "../../icons/avatar_lady.png";
import AvatarGirl from "../../icons/avatar_girl.png";

import { IoSettingsOutline } from "react-icons/io5";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

const Header = () => {
  const dispatch = useDispatch();
  const { isProfileModalOpen } = useSelector((state) => state.profile.UI);

  const handleShowModal = () => {
    dispatch(showProfileModal());
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
          <Avatar src={AvatarBoy}></Avatar>
        </Button>
      </header>
      <Modal open={isProfileModalOpen} onClose={handleShowModal}>
        <ModalDialog>
          <ModalClose></ModalClose>
          <Typography level="title-lg" my={2}>
            Profil szerkesztése
          </Typography>
          <form style={{ padding: "24px 0" }}>
            <Stack gap={3}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ gap: 1 }}>
                  <Typography color="neutral">Név</Typography>
                </FormLabel>
                <Input sx={{ width: "100%" }} />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ gap: 1 }}>
                  <Typography color="neutral">Avatar</Typography>
                </FormLabel>
                <RadioGroup
                  orientation="horizontal"
                  sx={{ justifyContent: "space-between" }}
                >
                  {Object.entries(AVATARS).map((avatar) => {
                    const value = avatar[0];
                    const img = avatar[1];
                    return (
                      <Sheet
                        key={value}
                        sx={{ width: 46, height: 46, borderRadius: "50%" }}
                      >
                        <Radio
                          label={<img src={img} alt={value} width="100%" />}
                          overlay
                          disableIcon
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
                <Input type="number" sx={{ width: "100%" }} />
              </FormControl>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Header;
