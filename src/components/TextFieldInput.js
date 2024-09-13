import { TextField } from "@mui/material";

import React from "react";

const TextFieldInput = ({ variant, placeholder, value, label, ...props }) => {
  return (
    <TextField
      sx={{
        marginTop: "16px",
        fontFamily: "poppins-regular",
      }}
      variant={variant}
      {...props}
      value={value}
      size="small"
      label={label}
      placeholder={placeholder}
    />
  );
};

export default TextFieldInput;
