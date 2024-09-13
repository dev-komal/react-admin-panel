import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    padding: "12px 11px",
    fontSize: "13px",
    fontFamily: "roboto-regular",
  },
}));

const StatusBadgeComponent = ({
  backgroundColor,
  textColor,
  content,
  ...props
}) => {
  return (
    <Box>
      <StyledBadge
        {...props}
        sx={{
          mx: 2,
          padding: "8px 16px",
          borderRadius: "24px",
          backgroundColor: backgroundColor,
          color: textColor,
          ...props,
        }}
      >
        <Typography sx={{ fontSize: "16px" }}>{content}</Typography>
      </StyledBadge>
    </Box>
  );
};

export default StatusBadgeComponent;
