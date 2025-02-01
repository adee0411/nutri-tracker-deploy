const { Sheet } = require("@mui/joy");

const ContentWrapper = ({ children }) => {
  return (
    <Sheet sx={{ backgroundColor: "transparent", py: 2, px: 3 }}>
      {children}
    </Sheet>
  );
};

export default ContentWrapper;
