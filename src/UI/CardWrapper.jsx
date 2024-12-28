import { Sheet } from "@mui/joy";

const CardWrapper = ({ children }) => {
  return (
    <Sheet
      sx={{
        py: 2,
        px: 1,
        boxShadow: "md",
        borderRadius: "md",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </Sheet>
  );
};

export default CardWrapper;
