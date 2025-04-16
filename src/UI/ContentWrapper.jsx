const { Sheet } = require("@mui/joy");

const ContentWrapper = ({ children }) => {
  return (
    <Sheet
      sx={{
        p: 2,
        boxSizing: "border-box",
        minHeight: "calc(100svh - 100px)",
        pt: "100px",
      }}
    >
      {children}
    </Sheet>
  );
};

export default ContentWrapper;
