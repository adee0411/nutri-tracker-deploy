import { Button, Sheet, Typography, Stack, IconButton } from "@mui/joy";

import Logo from "../icons/logo.svg";
import AthleteImg from "../img/undraw_athletes-training_koqa.svg";
import MealImg from "../img/undraw_breakfast_rgx5.svg";
import DietImg from "../img/undraw_diet_zdwe.svg";
import TrackerImg from "../img/undraw_fitness-tracker_y5q5.svg";
import NoteListImg from "../img/undraw_note-list_47ij.svg";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const AppInfo = [
  {
    text: "Placeholder text 1",
    image: MealImg,
  },
  {
    text: "Placeholder text 2",
    image: DietImg,
  },
  {
    text: "Placeholder text 3",
    image: TrackerImg,
  },
  {
    text: "Placeholder text 4",
    image: NoteListImg,
  },
];

const Welcome = ({ onCloseWelcome }) => {
  const [currentInfo, setCurrentInfo] = useState(0);
  return (
    <Sheet
      sx={{
        height: "100vh",
        p: 8,
        boxSizing: "border-box",
        overflow: "hidden",
        background: "#2948ff" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(135deg, #396afc, #2948ff)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(135deg, #396afc, #2948ff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
      color="primary"
      variant="solid"
      invertedColors
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
      <Stack
        direction="row"
        my={8}
        gap={4}
        alignItems="center"
        minHeight={300}
        justifyContent="center"
      >
        <IconButton
          sx={{ height: 30 }}
          onClick={() => setCurrentInfo(currentInfo - 1)}
          disabled={currentInfo === 0}
        >
          <FiChevronLeft />
        </IconButton>
        <Stack alignItems="center" gap={4} maxHeight={300}>
          <img src={AppInfo[currentInfo].image} width="100%" />
          <Typography
            textAlign="center"
            fontWeight={300}
            fontSize={20}
            width="80%"
          >
            {AppInfo[currentInfo].text}
          </Typography>
        </Stack>
        <IconButton
          sx={{ height: 30 }}
          onClick={() => setCurrentInfo(currentInfo + 1)}
          disabled={currentInfo === AppInfo.length - 1}
        >
          <FiChevronRight />
        </IconButton>
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
