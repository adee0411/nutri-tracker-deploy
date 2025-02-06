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
  Select,
  Option,
} from "@mui/joy";
import { switchClasses } from "@mui/joy/Switch";
import { Link, useLocation } from "react-router";
import { useState } from "react";

import { TbMenuDeep } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import { toggleProfileModal } from "../store/profileSlice";

import AvatarMan from "../icons/avatar_man.png";
import AvatarBoy from "../icons/avatar_boy.png";
import AvatarLady from "../icons/avatar_lady.png";
import AvatarGirl from "../icons/avatar_girl.png";

import { FaRegUser } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import { IoSunnyOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";

const AVATARS = {
  man: AvatarMan,
  lady: AvatarLady,
  boy: AvatarBoy,
  girl: AvatarGirl,
};

const Navigation = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { name, avatar } = useSelector((state) => state.profile.profileData);

  const { mode, setMode } = useColorScheme();
  //const [dark, setDark] = useState(false);

  const handleShowModal = () => {
    dispatch(toggleProfileModal());
  };
  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="lg">
        <TbMenuDeep fontSize={24} />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <DialogContent sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mb={4}
          >
            <Select
              variant="soft"
              value={mode}
              onChange={(event, newMode) => {
                setMode(newMode);
              }}
            >
              <Option value="system">Rendszer</Option>
              <Option value="light">Világos</Option>
              <Option value="dark">Sötét</Option>
            </Select>
            {/**
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
              color={mode ? "primary" : "neutral"}
              slotProps={{
                input: { "aria-label": "dark mode" },
              }}
              startDecorator={<IoSunnyOutline />}
              endDecorator={<GoMoon />}
              checked={dark}
              onChange={(event) => setDark(event.target.checked)}
            /> */}
            <Stack direction="row" alignItems="center">
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
                  onClick={() => setOpen(false)}
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
                <Link style={{ all: "unset" }} to="/my-meals" viewTransition>
                  Mentett étrendjeim
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Drawer>
    </>
  );
};

export default Navigation;
