import { Sheet } from "@mui/joy";

const CardWrapper = ({ children, color, variant }) => {
  return (
    <Sheet
      sx={{
        p: 2,
        boxShadow: "md",
        borderRadius: "md",
      }}
      color={color}
      variant={variant}
    >
      {children}
    </Sheet>
  );
};

export default CardWrapper;
