import { Box, Button } from "@mui/material";
import React from "react";

const ButtonComponent = ({ size, variant, ...props }) => {
  return (
    <Box>
      <Button variant={variant} {...props} size={size}></Button>
    </Box>
  );
};

export default ButtonComponent;
