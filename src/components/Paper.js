import { Box, Paper } from "@mui/material";
import React from "react";

const PaperComponent = ({ sx = {}, ...props }) => {
  return (
    <Box>
      <Paper
        {...props}
        sx={{
          padding: "16px",
          borderRadius: "16px",
          mt: 4,
          ...sx,
        }}
      />
    </Box>
  );
};

export default PaperComponent;
