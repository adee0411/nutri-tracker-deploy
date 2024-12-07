import {
  ListItem,
  Stack,
  Typography,
  IconButton,
  ListDivider,
  Modal,
  ModalClose,
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from "@mui/joy";
import { useState } from "react";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

const IngredientListItem = ({ ingredientData }) => {
  const { ingredientName, unit, unitage, amount, nutritionData } =
    ingredientData;

  // Dropdown menu (Edit, Delete) state
  const [open, setOpen] = useState(false);

  const calcIngredientMacros = (ingredientData) => {
    const modifiedNutritionData = { ...ingredientData.nutritionData };
    for (const [key, value] of Object.entries(modifiedNutritionData)) {
      modifiedNutritionData[key] = Number(
        (
          (value.amount * ingredientData.amount) /
          ingredientData.unitage
        ).toFixed(0)
      );
    }

    return modifiedNutritionData;
  };

  const modifiedNutritionData = calcIngredientMacros(ingredientData);
  return (
    <>
      <ListItem sx={{ borderRadius: "md", my: 0.5, p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <Stack flex={1}>
            <Stack gap={0.5}>
              <Typography level="title-sm">
                {ingredientName}, {amount}
                {unit}
              </Typography>
              <Stack direction="row" gap={2}>
                <Typography level="body-sm" fontSize={12}>
                  CH: {modifiedNutritionData.carb}g
                </Typography>
                <Typography level="body-sm" fontSize={12}>
                  P: {modifiedNutritionData.protein}g
                </Typography>
                <Typography level="body-sm" fontSize={12}>
                  F: {modifiedNutritionData.fat}g
                </Typography>
                <Typography level="body-sm" fontSize={12}>
                  C: {modifiedNutritionData.energy}cal
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: "plain", color: "neutral" } }}
            >
              <HiDotsVertical />
            </MenuButton>
            <Menu
              placement="bottom-start"
              size="sm"
              sx={{ minWidth: "120px" }}
              color="neutral"
            >
              <MenuItem>
                <IconButton
                  size="sm"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="span" color="neutral">
                    Edit
                  </Typography>
                  <Typography component="span" color="neutral">
                    <CiEdit />
                  </Typography>
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton
                  size="sm"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="span" color="danger">
                    Delete
                  </Typography>
                  <Typography component="span" color="danger">
                    <MdOutlineDelete />
                  </Typography>
                </IconButton>
              </MenuItem>
            </Menu>
          </Dropdown>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                minWidth: 300,
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose></ModalClose>
              <Stack>
                <Typography>Edit ingredient</Typography>
              </Stack>

              <form>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                >
                  <FormControl orientation="horizontal" sx={{ gap: 1, my: 2 }}>
                    <FormLabel>Cereals</FormLabel>
                    <Input type="number" defaultValue={200}></Input>
                  </FormControl>
                  <FormControl>
                    <Select defaultValue="g">
                      <Option value="g">g</Option>
                      <Option value="pcs">pcs</Option>
                    </Select>
                  </FormControl>
                </Stack>
              </form>
            </Sheet>
          </Modal>
        </Stack>
      </ListItem>
      <ListDivider></ListDivider>
    </>
  );
};

export default IngredientListItem;
