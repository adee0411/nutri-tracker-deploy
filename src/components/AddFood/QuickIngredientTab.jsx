import { Tabs, TabList, Tab, TabPanel } from "@mui/joy";

import { FaRegHeart } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { IoRepeat } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import { tabClasses } from "@mui/joy";

import FavoriteIngredients from "./FavoriteIngredients";
import FrequentIngredients from "./FrequentIngredients";
import RecentIngredients from "./RecentIngredients";
import CustomIngredients from "./CustomIngredients";

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
        size="lg"
        tabFlex={1}
        disableUnderline
        sx={{
          "--Tab-indicatorThickness": 0,
          [`& .${tabClasses.root}`]: {
            fontSize: "lg",
            fontWeight: "lg",
            [`&[aria-selected="true"]`]: {
              color: "primary.500",
              bgcolor: "background.surface",
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft">
          <LuClock />
        </Tab>
        <Tab disableIndicator variant="soft">
          <FaRegHeart />
        </Tab>
        <Tab disableIndicator variant="soft">
          <IoRepeat />
        </Tab>

        <Tab disableIndicator variant="soft">
          <FaRegUser />
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <RecentIngredients />
      </TabPanel>
      <TabPanel value={1}>
        <FavoriteIngredients />
      </TabPanel>
      <TabPanel value={2}>
        <FrequentIngredients />
      </TabPanel>
      <TabPanel value={3}>
        <CustomIngredients />
      </TabPanel>
    </Tabs>
  );
};

export default QuickIngredientTab;
