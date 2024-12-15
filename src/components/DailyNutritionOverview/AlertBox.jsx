import { Alert, Stack, Typography, List, ListItem, Sheet } from "@mui/joy";

import { IoFootsteps } from "react-icons/io5";
import { GrRun } from "react-icons/gr";
import { IoBicycleSharp } from "react-icons/io5";

const AlertBox = ({ calorieDifference }) => {
  return (
    <Alert variant="soft" color="warning" size="sm">
      <Stack gap={2}>
        <Typography textAlign="center" level="body-sm">
          A mai napon{" "}
          <Typography fontWeight={700}>{calorieDifference} cal</Typography>{" "}
          többletben vagy a célhoz képest! Az alábbi aktivitások segíthetnek a
          napi kalória-egyensúly megtartásában.
        </Typography>{" "}
        <List
          orientation="horizontal"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <IoBicycleSharp />
              <Typography fontWeight={800}>20 perc</Typography>
              <Typography>Kerékpár</Typography>
            </Sheet>
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <GrRun />
              <Typography fontWeight={800}>15 perc</Typography>
              <Typography>Futás</Typography>
            </Sheet>
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <Sheet
              variant="outlined"
              color="warning"
              sx={{ p: 1, borderRadius: 8, backgroundColor: "transparent" }}
            >
              <IoFootsteps />
              <Typography fontWeight={800}>40 perc</Typography>
              <Typography>Séta</Typography>
            </Sheet>
          </ListItem>
        </List>
      </Stack>
    </Alert>
  );
};

export default AlertBox;
