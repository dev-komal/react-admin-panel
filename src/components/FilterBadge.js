import { Badge, Box, Typography } from "@mui/material";
import React from "react";

const FilterBadgeComponent = ({
  badgeTextColor,
  bgColorBadge,
  content,
  ...props
}) => {
  return (
    <Box>
      <Badge
        {...props}
        sx={{
          mx: 1,
          display: "flex",
          paddingX: "6px",
          borderRadius: "6px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColorBadge,
          ...props,
        }}
      >
        <Typography sx={{ color: badgeTextColor, fontSize: "14px" }}>
          {content}
        </Typography>
      </Badge>
    </Box>
  );
};

export default FilterBadgeComponent;
