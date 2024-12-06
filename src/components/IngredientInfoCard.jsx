import {
  Button,
  FormControl,
  Input,
  List,
  ListDivider,
  ListItem,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";

import ChickenBreastImg from "../../src/img/chicken_breast.webp";
import BeefImg from "../../src/img/beef.png";
import PorkImg from "../../src/img/pork.webp";
import SalmonImg from "../../src/img/salmon.png";

const IngredientInfoCard = () => {
  return (
    <Sheet sx={{ p: 2, m: 2, borderRadius: "md" }}>
      <Typography level="title-lg" fontSize={24} textAlign="center">
        Chicken breast
      </Typography>
      <Typography level="body-md" textAlign="center">
        Nutrition info for 100 grams
      </Typography>
      <Stack direction="row" gap={2} my={4} alignItems="center">
        <Stack flex={1} gap={1}>
          <List orientation="horizontal">
            <ListItem sx={{ flexDirection: "column", gap: 0, flex: 1 }}>
              <Typography level="body-sm">Carbs:</Typography>
              <Typography level="body-lg" fontWeight={800} fontSize={20}>
                1 g
              </Typography>
            </ListItem>
            <ListDivider inset="gutter" />
            <ListItem sx={{ flexDirection: "column", gap: 0, flex: 1 }}>
              <Typography level="body-sm" color="primary">
                Protein:
              </Typography>
              <Typography
                color="primary"
                level="body-lg"
                fontWeight={800}
                fontSize={20}
              >
                22 g
              </Typography>
            </ListItem>
            <ListDivider inset="gutter" />{" "}
            <ListItem sx={{ flexDirection: "column", gap: 0, flex: 1 }}>
              <Typography level="body-sm">Fat:</Typography>
              <Typography level="body-lg" fontWeight={800} fontSize={20}>
                1 g
              </Typography>
            </ListItem>
          </List>
          <Sheet sx={{ p: 1, borderRadius: "md" }}>
            <Typography level="body-sm" textAlign="center">
              Energy:
            </Typography>
            <Typography
              level="body-lg"
              fontWeight={800}
              fontSize={28}
              textAlign="center"
            >
              88 cal
            </Typography>
          </Sheet>
        </Stack>

        <Stack width={120}>
          <img src={ChickenBreastImg} alt="chicken-breast" width="100%" />
        </Stack>
      </Stack>
      <Typography textAlign="center" level="body-lg">
        Rich in <Typography fontWeight={800}>protein</Typography>. You can
        replace it with the following ingredients to keep nutrition level:
      </Typography>
      <List
        orientation="horizontal"
        sx={{ justifyContent: "space-between", gap: 2, px: 0, my: 2 }}
      >
        <ListItem
          variant="outlined"
          sx={{ flex: 1, borderRadius: "md", boxShadow: "sm" }}
        >
          <Stack justifyContent="center" alignItems="center" gap={1}>
            <Typography level="title-sm">Beef</Typography>
            <img src={BeefImg} alt="beef-img" width="70%" />
          </Stack>
        </ListItem>
        <ListItem
          variant="outlined"
          sx={{ flex: 1, borderRadius: "md", boxShadow: "sm" }}
        >
          <Stack justifyContent="center" alignItems="center" gap={1}>
            <Typography level="title-sm">Pork</Typography>
            <img src={PorkImg} alt="pork-img" width="70%" />
          </Stack>
        </ListItem>
        <ListItem
          variant="outlined"
          sx={{ flex: 1, borderRadius: "md", boxShadow: "sm" }}
        >
          <Stack justifyContent="center" alignItems="center" gap={1}>
            <Typography level="title-sm">Salmon</Typography>
            <img src={SalmonImg} alt="salmon-img" width="70%" />
          </Stack>
        </ListItem>
      </List>
      <form>
        <Stack direction="row" gap={2}>
          <FormControl sx={{ flex: 2 }}>
            <Input type="number" defaultValue={100} endDecorator="g"></Input>
          </FormControl>
          <Button>Add</Button>
        </Stack>
      </form>
    </Sheet>
  );
};

export default IngredientInfoCard;
