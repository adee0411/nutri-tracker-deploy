import { Sheet, Typography } from "@mui/joy";

import EmptyListImg from "../../img/undraw_breakfast_psiw.svg";

const EmptyListPlaceholder = ({ text }) => {
  return (
    <Sheet
      sx={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        mt: 10,
        mb: 5,
      }}
    >
      <img width="50%" src={EmptyListImg} alt="no-data-img" />
      <Typography color="neutral">{text}</Typography>
    </Sheet>
  );
};

export default EmptyListPlaceholder;
