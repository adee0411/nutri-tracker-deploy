const { Sheet } = require("@mui/joy");

const ContentWrapper = ({ children }) => {
  return (
    <Sheet sx={{ backgroundColor: "transparent", p: 2 }}>{children}</Sheet>
  );
};

export default ContentWrapper;
