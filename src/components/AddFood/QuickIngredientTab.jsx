import { Tabs, TabList, Tab, TabPanel, Typography } from "@mui/joy";

import { FaRegHeart } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import { tabClasses } from "@mui/joy";

import FavoriteIngredients from "./FavoriteIngredients";

const QuickIngredientTab = () => {
  return (
    <Tabs
      aria-label="Ingredient list tab"
      defaultValue={0}
      variant="outlined"
      sx={{
        borderRadius: "lg",
        boxShadow: "md",
        overflow: "auto",
      }}
    >
      <TabList
        size="sm"
        tabFlex={1}
        disableUnderline
        sx={{
          "--Tab-indicatorThickness": 0,
          [`& .${tabClasses.root}`]: {
            fontSize: "sm",
            fontWeight: "lg",
            [`&[aria-selected="true"]`]: {
              color: "primary.500",
              bgcolor: "background.surface",
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft">
          <FaRegHeart />
        </Tab>
        <Tab disableIndicator variant="soft">
          <IoRepeat />
        </Tab>
        <Tab disableIndicator variant="soft">
          <LuClock />
        </Tab>
        <Tab disableIndicator variant="soft">
          <FaRegUser />
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <FavoriteIngredients />
      </TabPanel>
      <TabPanel value={1}>
        <Typography>Gyakoriak</Typography>
      </TabPanel>
      <TabPanel value={2}>
        <Typography>Legutóbbiak</Typography>
      </TabPanel>
      <TabPanel value={3}>
        <Typography>Saját</Typography>
      </TabPanel>
    </Tabs>
  );
};

export default QuickIngredientTab;
