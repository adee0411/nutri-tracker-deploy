import { useContext } from "react";
import GuestPage from "../components/GuestPage";
import DailyOverview from "./DailyOverview";

import { AuthContext } from "../AuthProvider";

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
