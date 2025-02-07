// Overall Tab Component for the Macro details

import { Sheet, Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import { tabClasses } from "@mui/joy";

import { useSelector } from "react-redux";
import TabContent from "./TabContent";

const MacroDetailTab = ({ totalNutritionData }) => {
  const { calorieGoal } = useSelector((state) => state.profile.profileData);
  const calculateMacros = (calorie) => {
    const macroRatios = {
      lowCarb: {
        protein: 0.4,
        fat: 0.4,
        carb: 0.2,
      },
      balanced: {
        protein: 0.3,
        fat: 0.35,
        carb: 0.35,
      },
      highCarb: {
        protein: 0.3,
        fat: 0.2,
        carb: 0.5,
      },
    };
    let calculatedMacros = Object.assign({}, macroRatios);

    for (const [key, value] of Object.entries(calculatedMacros)) {
      const current = value;
      for (const [macroType, macroValue] of Object.entries(current)) {
        if (macroType === "fat") {
          calculatedMacros[key][macroType] = Number(
            ((calorie * macroValue) / 9).toFixed(0)
          );
        } else {
          calculatedMacros[key][macroType] = Number(
            ((calorie * macroValue) / 4).toFixed(0)
          );
        }
      }
    }
    return calculatedMacros;
  };

  const calculatedMacroGoals = calculateMacros(calorieGoal);
  return (
    <Tabs
      aria-label="Carb quantity tab"
      defaultValue={0}
      variant="outlined"
      color="neutral"
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
            fontSize: "12px",
            fontWeight: "lg",
            [`&[aria-selected="true"]`]: {
              color: "primary.500",
              bgcolor: "background.surface",
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ textAlign: "center" }}>
          Alacsony szénhidrát
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ textAlign: "center" }}>
          Kiegyensúlyozott
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ textAlign: "center" }}>
          Magas szénhidrát
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <TabContent
          macroGoal={calculatedMacroGoals.lowCarb}
          currentMacro={totalNutritionData}
        />
      </TabPanel>
      <TabPanel value={1}>
        <TabContent
          macroGoal={calculatedMacroGoals.balanced}
          currentMacro={totalNutritionData}
        />
      </TabPanel>
      <TabPanel value={2}>
        <TabContent
          macroGoal={calculatedMacroGoals.highCarb}
          currentMacro={totalNutritionData}
        />
      </TabPanel>
    </Tabs>
  );
};

export default MacroDetailTab;
