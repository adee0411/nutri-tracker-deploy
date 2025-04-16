import { Sheet, Typography, Stack, Button } from "@mui/joy";
import ContentWrapper from "../UI/ContentWrapper";
import AppInfo from "./AppInfo";

import HeroImg from "../img/undraw_fitness-tracker_y5q5 (3).svg";
import Img1 from "../img/undraw_breakfast_rgx5 (1).svg";
import Img2 from "../img/undraw_healthy-lifestyle_8zpg.svg";
import Img3 from "../img/undraw_add-information_06qr.svg";
import Img4 from "../img/undraw_athletes-training_koqa.svg";

const appInfo = [
  {
    title: "Naplózd az étkezéseid!",
    text: "Vidd fel az alapanyagokat és kövesd nyomon a napi kalória-beviteled",
    image: Img1,
  },
  {
    title: "Nem találod az alapanyagot?",
    text: "Vegyél fel saját alapanyagokat az adatbázisba",
    image: Img2,
  },
  {
    title: "Vedd fel kedvenceid!",
    text: "Mentsd el kedvenc alapanyagaid, hogy még egyszerűbb legyen hozzáadni a napodhoz",
    image: Img3,
  },
  {
    title: "Tervezz és ments!",
    text: "Tervezz meg egy teljes napi alapanyag-szükségletet és mentsd el",
    image: Img4,
  },
];

const GuestPage = () => {
  return (
    <ContentWrapper>
      <Sheet sx={{ boxSizing: "border-box", px: 4 }}>
        <Stack justifyContent="center" gap={16} mb={20}>
          <Typography level="h1" textAlign="center" mb={4} fontSize={32}>
            Tartsd kézben a kalóriáid - érd el a céljaid könnyedén!
          </Typography>
          <Stack justifyContent="center" alignItems="center">
            <img src={HeroImg} width="100%" style={{ margin: "0 auto" }} />
          </Stack>
        </Stack>

        <AppInfo infos={appInfo} />
      </Sheet>
    </ContentWrapper>
  );
};

export default GuestPage;
