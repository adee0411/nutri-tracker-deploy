import { Sheet } from "@mui/joy";

const CardWrapper = ({ children, color, variant }) => {
  return (
    <Sheet
      sx={{
        py: 2,
        px: 1,
        boxShadow: "md",
        borderRadius: "md",
      }}
      color={color}
      variant={variant}
      invertedColors
    >
      {children}
    </Sheet>
  );
};

export default CardWrapper;
