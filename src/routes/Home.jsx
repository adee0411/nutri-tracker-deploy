import { useContext } from "react";
import GuestPage from "../components/GuestPage";
import DailyOverview from "./DailyOverview";

import { AuthContext } from "../AuthProvider";

/*
const DesktopHomePage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={10}
      minHeight="100svh"
      boxSizing="border-box"
      p={0}
    >
      <Typography level="h1">NutriTracker</Typography>
      <Typography level="h3" textAlign="center" maxWidth={700}>
        Az applikáció mobil eszközökre lett optimalizálva, így a használhatóság
        érdekében olvasd be az alábbi QR kódot!
      </Typography>
      <img src={QRCodeImg} alt="qr-code" style={{ maxWidth: 200 }} />
    </Stack>
  );
};
*/

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if (!user) {
    return <GuestPage />;
  } else {
    return <DailyOverview />;
  }
};

export default Home;
