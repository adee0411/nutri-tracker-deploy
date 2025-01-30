import { Button, Sheet, Typography, Stack, IconButton } from "@mui/joy";

import { motion, AnimatePresence } from "framer-motion";

import Logo from "../icons/logo.svg";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";

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

const Welcome = ({ onCloseWelcome, appInfo }) => {
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
      sx={{
        height: "100vh",
        p: 8,
        boxSizing: "border-box",
        overflow: "hidden",
        /*background: "#2948ff" /* fallback for old browsers */
        /*background:
          "-webkit-linear-gradient(135deg, #396afc, #2948ff)" /* Chrome 10-25, Safari 5.1-6 */
        /*background:
          "linear-gradient(135deg, #396afc, #2948ff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }}
      color="neutral"
      variant="soft"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
        }}
      >
        <Stack
          direction="column"
          width="100%"
          justifyContent="center"
          alignItems="center"
          mt={4}
          mb={12}
        >
          {" "}
          <img src={Logo} width={100} />
          <Typography textAlign="center" fontWeight={700} fontSize={42}>
            NutriTracker
          </Typography>
          <Typography fontSize={28} textAlign="center" fontWeight={300} my={2}>
            Minden falat számít - tartsd kézben a kalóriákat!
          </Typography>
        </Stack>
      </motion.div>

      <Stack
        my={8}
        gap={4}
        alignItems="center"
        justifyContent="center"
        position="relative"
        height={300}
      >
        <AnimatePresence>
          <Stack
            alignItems="center"
            gap={4}
            component={motion.div}
            key={currentInfo}
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            position="absolute"
          >
            <img src={appInfo[currentInfo].image} width="200px" />
            <Typography
              textAlign="center"
              fontWeight={300}
              fontSize={20}
              width="80%"
            >
              {appInfo[currentInfo].text}
            </Typography>
          </Stack>
        </AnimatePresence>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <IconButton onClick={handlePrevious} disabled={currentInfo === 0}>
            <FiChevronLeft style={{ fontSize: 32 }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={currentInfo === appInfo.length - 1}
          >
            <FiChevronRight style={{ fontSize: 32 }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Button size="lg" sx={{ borderRadius: 24 }} onClick={onCloseWelcome}>
          Kezdjük!
        </Button>
      </Stack>
    </Sheet>
  );
};

export default Welcome;
