import { Stack, Typography } from "@mui/joy";
import { motion } from "framer-motion";

const AppInfo = ({ infos }) => {
  return (
    <Stack gap={8} sx={{ overflow: "hidden" }}>
      {infos.map((info, index) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            gap={4}
            component={motion.div}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-40px", once: true }}
            transition={{ duration: 1 }}
            key={info.title}
          >
            <Stack flex={2} gap={2} order={index % 2 === 0 ? 1 : 2}>
              <Typography level="h4">{info.title}</Typography>
              <Typography level="body-sm">{info.text}</Typography>
            </Stack>
            <Stack flex={1} order={index % 2 === 0 ? 2 : 1}>
              <img src={info.image} width="100%" alt={`info-img${index + 1}`} />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default AppInfo;
