import { Stack, Typography } from "@mui/joy";

import IngredientListActions from "./IngredientListActions";

const IngredientListHeader = ({ listTitle, listName, listActions }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {" "}
      <Typography level="title-lg">{listTitle}</Typography>
      <IngredientListActions listName={listName} listActions={listActions} />
    </Stack>
  );
};

export default IngredientListHeader;
