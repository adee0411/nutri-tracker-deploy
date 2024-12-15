// Overall Tab Component for the Macro details

import { Sheet, Tabs, TabList, Tab, TabPanel, Stack } from "@mui/joy";
import { tabClasses } from "@mui/joy";

import MacroGoalDetails from "./MacroGoalDetails";

const MacroDetailTab = () => {
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
            Alacsony szénhidrát
          </Tab>
          <Tab disableIndicator variant="soft">
            Kiegyensúlyozott
          </Tab>
          <Tab disableIndicator variant="soft">
            Magas szénhidrát
          </Tab>
        </TabList>
        <TabPanel value={0}>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <MacroGoalDetails
              macroType="Szénhidrát"
              goal={300}
              current={180}
              color="primary"
            />
            <MacroGoalDetails
              macroType="Fehérje"
              goal={200}
              current={120}
              color="warning"
            />
            <MacroGoalDetails
              macroType="Zsír"
              goal={80}
              current={20}
              color="success"
            />
          </Stack>
        </TabPanel>
      </Tabs>
    </Sheet>
  );
};

export default MacroDetailTab;
