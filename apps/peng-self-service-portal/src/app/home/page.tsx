"use client";

import { Box, TextField } from "@mui/material";
import { Heading } from "./page.styles";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" m={3}>
      <Heading variant="h3" color="black" mb={2}>
        This is homepage with a TextField
      </Heading>

      <TextField />
    </Box>
  );
};

export default Home;
