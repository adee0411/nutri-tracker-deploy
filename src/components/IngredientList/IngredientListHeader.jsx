import { Stack, Typography } from "@mui/joy";

import IngredientListActions from "./IngredientListActions";

const IngredientListHeader = ({ listTitle, listName }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {" "}
      <Typography level="title-lg">{listTitle}</Typography>
      <IngredientListActions listName={listName} />
    </Stack>
  );
};

export default IngredientListHeader;
