import { Typography } from "@mui/joy";

const MacroData = ({ data }) => {
  const [macroType, macroValue] = data;
  return (
    <Typography fontSize={12}>
      {macroType}: {macroValue}g
    </Typography>
  );
};

export default MacroData;
