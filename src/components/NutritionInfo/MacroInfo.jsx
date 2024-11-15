import { Sheet, Tabs, TabList, Tab, TabPanel, Stack } from "@mui/joy";
import { tabClasses } from "@mui/joy";

import MacroCard from "./MacroCard";

const MacroInfo = () => {
  return (
    <Sheet>
      <Tabs
        aria-label="Carb quantity tab"
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
            Low carb
          </Tab>
          <Tab disableIndicator variant="soft">
            Balanced
          </Tab>
          <Tab disableIndicator variant="soft">
            High carb
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <MacroCard
              macroType="Carb"
              goal={300}
              current={180}
              color="primary"
            />
            <MacroCard
              macroType="Protein"
              goal={200}
              current={120}
              color="warning"
            />
            <MacroCard macroType="Fat" goal={80} current={20} color="success" />
          </Stack>
        </TabPanel>
      </Tabs>
    </Sheet>
  );
};

export default MacroInfo;
