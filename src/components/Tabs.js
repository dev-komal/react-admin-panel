import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Badge,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const TabComponent = ({
  tabs,
  defaultTab,
  onChange,
  isBadge,
  color,
  textColor,
  isDate,
}) => {
  const [value, setValue] = useState(defaultTab || 0);
  const [date, setDate] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSelectDate = (event) => {
    setDate(event.target.value);
  };

  const badgeColor = {
    Tutti: "badge1",
    Acttivi: "badge2",
    Inacttivi: "badge3",
    Clienti: "badge1",
    Fornitori: "badge1",
  };

  return (
    <div>
      <Grid
        spacing={2}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Grid>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor={color}
            // TabIndicatorProps={color}
          >
            {tabs.map((tab, index) => (
              <Tab
                style={{ color: value === index && textColor }}
                key={index}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontFamily: "roboto-medium" }}>
                      {tab.label}
                    </span>
                    {isBadge && (
                      <Badge
                        badgeContent={tab.number}
                        color={badgeColor[tab.label]}
                        sx={{ marginLeft: "16px" }}
                      />
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>
        </Grid>
        <Grid>
          {isDate && (
            <Box>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Date</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={date}
                  label="Date"
                  onChange={handleSelectDate}
                >
                  <MenuItem>
                    <span style={{ fontFamily: "roboto-regular" }}>
                      14/07/2023
                    </span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Grid>
      </Grid>

      {tabs[value].content}
    </div>
  );
};

export default TabComponent;
