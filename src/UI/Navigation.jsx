import {
  DialogContent,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  Stack,
  Button,
  Avatar,
  ListDivider,
  ListItemButton,
  ListItemDecorator,
  ModalClose,
  Switch,
  useColorScheme,
} from "@mui/joy";
import { switchClasses } from "@mui/joy/Switch";
import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";

import { TbMenuDeep } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import AuthForm from "../components/Header/AuthForm";

import { toggleProfileModal } from "../store/profileSlice";
import { setIsMenuOpen } from "../store/appSlice";

import { FaRegUser } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import { IoSunnyOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";
import { AuthContext } from "../AuthProvider";

import AvatarMan from "../icons/avatar_man.png";
import AvatarBoy from "../icons/avatar_boy.png";
import AvatarLady from "../icons/avatar_lady.png";
import AvatarGirl from "../icons/avatar_girl.png";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

const Navigation = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const { user, signOutUser } = authContext;

  const { isMenuOpen } = useSelector((state) => state.app.UI);

  const { name, avatar } = useSelector((state) => state.profile.profileData);
  const { mode, setMode } = useColorScheme();
  const defaultMode = mode === "dark";
  const [isDark, setIsDark] = useState(defaultMode);

  const handleShowModal = () => {
    dispatch(toggleProfileModal());
  };

  const handleSignOut = () => {
    signOutUser().then(() => {});
    dispatch(setIsMenuOpen(false));
  };

  const handleOpenMenu = () => {
    dispatch(setIsMenuOpen(true));
  };

  const handleCloseMenu = () => {
    dispatch(setIsMenuOpen(false));
  };

  useEffect(() => {
    const newValue = isDark ? "dark" : "light";
    setMode(newValue);
  }, [isDark]);

  return (
    <>
      <IconButton onClick={handleOpenMenu} size="lg">
        <TbMenuDeep fontSize={24} />
      </IconButton>
      <Drawer
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchor="right"
        container={document.getElementById("root")}
        disablePortal={false}
      >
        <DialogContent sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mb={4}
          >
            <Switch
              sx={() => {
                return {
                  WebkitTapHighlightColor: "transparent",
                  [`& .${switchClasses.thumb}`]: {
                    transition: "width 0.2s, left 0.2s",
                  },
                };
              }}
              size="sm"
              color={isDark ? "primary" : "neutral"}
              slotProps={{
                input: { "aria-label": "dark mode" },
              }}
              startDecorator={<IoSunnyOutline />}
              endDecorator={<GoMoon />}
              checked={isDark}
              onChange={() => setIsDark(!isDark)}
            />
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography
                component="label"
                htmlFor="close-icon"
                sx={{ fontSize: "sm", fontWeight: "lg", cursor: "pointer" }}
              >
                Bezár
              </Typography>
              <ModalClose id="close-icon" sx={{ position: "initial" }} />
            </Stack>
          </Stack>

          {user ? (
            <>
              <List sx={{ gap: 4 }}>
                <ListItem>
                  <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography level="title-lg">{name}</Typography>
                    <Button
                      size="sm"
                      sx={{ width: "fit-content", p: 0 }}
                      variant="plain"
                      onClick={handleShowModal}
                    >
                      <Avatar size="sm" src={AVATARS[avatar]}></Avatar>
                    </Button>
                  </Stack>
                </ListItem>
                <ListDivider inset="gutter" />
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <FaRegUser />
                    </ListItemDecorator>
                    <Link
                      style={{ all: "unset" }}
                      to="/custom-ingredients"
                      viewTransition
                      onClick={handleCloseMenu}
                    >
                      Saját alapanyagok
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <GiForkKnifeSpoon />
                    </ListItemDecorator>
                    <Link
                      style={{ all: "unset" }}
                      to="/my-meals"
                      viewTransition
                    >
                      Mentett étrendjeim
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
              <Button onClick={handleSignOut}>Kijelentkezés</Button>
            </>
          ) : (
            <AuthForm />
          )}
        </DialogContent>
      </Drawer>
    </>
  );
};

export default Navigation;
