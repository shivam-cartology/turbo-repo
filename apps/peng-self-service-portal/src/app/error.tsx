"use client";

import { Box, Button, Typography } from "@mui/material";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Box m={2} display="flex" flexDirection="column">
      <Typography variant="h3" mb={2}>
        Something went wrong!
      </Typography>
      <Button sx={{ width: "10%" }} variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  );
}
