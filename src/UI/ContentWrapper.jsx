const { Sheet } = require("@mui/joy");

const ContentWrapper = ({ children }) => {
  return (
    <Sheet sx={{ p: 2, boxSizing: "border-box", minHeight: "100vh" }}>
      {children}
    </Sheet>
  );
};

export default ContentWrapper;
