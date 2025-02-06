import { Button, Sheet, Typography, Stack, IconButton } from "@mui/joy";

import { motion, AnimatePresence } from "framer-motion";

import Logo from "../icons/logo.svg";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const slideVariants = {
  hiddenRight: {
    x: "20%",
    opacity: 0,
  },
  hiddenLeft: {
    x: "-20%",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Welcome = ({ appInfo, onSetIsVisited }) => {
  const [currentInfo, setCurrentInfo] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleNext = () => {
    setDirection("right");
    setCurrentInfo(currentInfo + 1);
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentInfo(currentInfo - 1);
  };

  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{ height: "100vh", overflow: "hidden", p: 4 }}
    >
      <Stack>
        {/******* LOGO *******/}
        <Stack alignItems="center" gap={2}>
          <img src={Logo} width="100px" />
          <Typography textAlign="center" fontSize={28} level="h3">
            NutriTracker
          </Typography>
          <Typography textAlign="center" level="body-lg" color="neutral">
            Minden falat számít - tartsd kézben a kalóriákat!
          </Typography>
        </Stack>

        {/****** CAROUSEL ******/}
        <Stack direction="row">
          <Stack width="20%" alignItems="center" justifyContent="center">
            {" "}
            {currentInfo > 0 ? (
              <IconButton onClick={handlePrevious}>
                <FiChevronLeft />
              </IconButton>
            ) : (
              ""
            )}
          </Stack>
          {/****** CONTAINER ******/}
          <Stack height={300} flex={1}>
            <Stack
              height="100%"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <img src={appInfo[currentInfo].image} width="100%" />
              <Typography textAlign="center" level="body-sm">
                {appInfo[currentInfo].text}
              </Typography>
            </Stack>
          </Stack>
          <Stack width="20%" alignItems="center" justifyContent="center">
            {currentInfo !== appInfo.length - 1 ? (
              <IconButton
                onClick={handleNext}
                disabled={currentInfo === appInfo.length - 1}
              >
                <FiChevronRight />
              </IconButton>
            ) : (
              ""
            )}
          </Stack>
        </Stack>

        <Button onClick={onSetIsVisited}>Kezdjük!</Button>
      </Stack>
    </Sheet>
  );
};

export default Welcome;
