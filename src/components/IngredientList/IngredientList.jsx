import { List, Typography, Sheet, Stack, IconButton } from "@mui/joy";

import IngredientListItem from "./IngredientListItem";

import { IoIosAddCircleOutline } from "react-icons/io";

const IngredientList = () => {
  return (
    <Sheet variant="plain" sx={{ backgroundColor: "transparent" }}>
      {" "}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {" "}
        <Typography level="title-lg">Ingredient list</Typography>
        <IconButton
          size="sm"
          sx={{ fontSize: 24 }}
          variant="solid"
          color="primary"
        >
          <IoIosAddCircleOutline />
        </IconButton>
      </Stack>
      <List>
        <List
          color="primary"
          variant="plain"
          sx={{ "--ListDivider-gap": "2px" }}
        >
          <IngredientListItem />
          <IngredientListItem />
          <IngredientListItem />
          <IngredientListItem />
          <IngredientListItem />
          <IngredientListItem />
          <IngredientListItem />
        </List>
      </List>
    </Sheet>
  );
};

export default IngredientList;
