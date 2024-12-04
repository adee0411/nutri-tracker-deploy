import { Typography } from "@mui/joy";

const MacroData = ({ macroName, macroUnit, macroAmount }) => {
  const macroAbbreviations = {
    carb: "CH",
    protein: "P",
    fat: "F",
    calorie: "Cal",
  };
  return (
    <Typography level="body-sm" fontSize={12}>
      {`${macroAbbreviations[macroName]}: ${macroAmount} ${macroUnit}`}
    </Typography>
  );
};

export default MacroData;
