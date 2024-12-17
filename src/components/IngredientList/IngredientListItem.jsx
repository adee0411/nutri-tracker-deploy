import {
  ListItem,
  Stack,
  Typography,
  ListDivider,
  Modal,
  ModalClose,
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
} from "@mui/joy";
import { useState } from "react";
import { useParams } from "react-router";

import IngredientListItemContent from "./IngredientListItemContent";
import IngredientListItemActions from "./IngredientListItemActions";
const IngredientListItem = ({ ingredientData }) => {
  const { mealTitle } = useParams();

  const { ingredientName, unit, amount, id, nutritionData } = ingredientData;

  // Dropdown menu (Edit, Delete) state
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem sx={{ borderRadius: "md", p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <IngredientListItemContent
            ingredientName={ingredientName}
            amount={amount}
            unit={unit}
            nutritionData={nutritionData}
          />
          <IngredientListItemActions mealName={mealTitle} ingredientID={id} />

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
