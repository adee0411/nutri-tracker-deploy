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
} from "@mui/joy";
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
            justifyContent="flex-end"
            mb={4}
          >
            <Typography
              component="label"
              htmlFor="close-icon"
              sx={{ fontSize: "sm", fontWeight: "lg", cursor: "pointer" }}
            >
              Bezár
            </Typography>
            <ModalClose id="close-icon" sx={{ position: "initial" }} />
          </Stack>

          <List>
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
                >
                  Saját alapanyagok
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
