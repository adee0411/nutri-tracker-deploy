import { Sheet } from "@mui/joy";

const CardWrapper = ({ children, backgroundImg, color, variant }) => {
  return (
    <Sheet
      sx={{
        py: 2,
        px: 1,
        boxShadow: "md",
        borderRadius: "md",

        "&:after": {
          content: '""',
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          backgroundSize: "30%",
          zIndex: "-1",
          opacity: 0.4,
        },
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
