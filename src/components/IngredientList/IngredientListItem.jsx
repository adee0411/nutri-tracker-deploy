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
import { useDispatch } from "react-redux";
import { removeIngredient } from "../../store/ingredientSlie";

import NutritionDetails from "../NutritionDetails";

import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { transformNutritionData } from "../../data/TESTDATA";
import { useParams } from "react-router";

const IngredientListItem = ({ ingredientData }) => {
  const { mealTitle } = useParams();
  const dispatch = useDispatch();
  const { ingredientName, unit, amount, id } = ingredientData;

  // Dropdown menu (Edit, Delete) state
  const [open, setOpen] = useState(false);

  const transformedNutritionData = transformNutritionData(ingredientData);

  const handleRemoveIngredient = (e) => {
    const ingredientID = e.target.id;

    console.log("ome");

    dispatch(
      removeIngredient({ ingredientID: ingredientID, mealName: mealTitle })
    );
  };

  return (
    <>
      <ListItem sx={{ borderRadius: "md", my: 2, p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <Stack flex={1}>
            <Stack gap={0.5}>
              <Typography level="title-md">
                {ingredientName}, {amount}
                {unit}
              </Typography>
              <NutritionDetails nutritionData={transformedNutritionData} />
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
                  id={id}
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
                  id={id}
                  onClick={handleRemoveIngredient}
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
