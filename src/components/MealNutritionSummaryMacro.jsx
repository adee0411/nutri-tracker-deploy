import { Stack, Typography } from "@mui/joy";
import { useRef, useEffect } from "react";

import CountUp from "react-countup";

const macroNames = {
  carb: "Szénhidrát",
  protein: "Fehérje",
  fat: "Zsír",
  energy: "Kalória",
};

const MealNutritionSummaryMacro = ({ macroName, icon, value }) => {
  const valueRef = useRef(value);

  // Ensure that macro counter starts from the last value and not reseted to 0
  useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return (
    <Stack alignItems="center" flex={1}>
      <img src={icon} width="24px" />
      <Typography
        level="body-sm"
        fontSize={12}
        fontWeight={macroName === "energy" ? 800 : ""}
      >
        {macroNames[macroName]}:
      </Typography>
      <CountUp
        start={valueRef.current}
        end={value}
        delay={0}
        duration={1}
        suffix={macroName === "energy" ? " kcal" : " g"}
      >
        {({ countUpRef }) => (
          <Typography
            fontWeight={macroName === "energy" ? 800 : ""}
            component="span"
            fontSize={12}
            slotProps={{ root: { ref: countUpRef } }}
          ></Typography>
        )}
      </CountUp>
    </Stack>
  );
};

export default MealNutritionSummaryMacro;
