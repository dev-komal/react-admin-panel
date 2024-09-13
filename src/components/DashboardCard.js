import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { formatCurrency } from "../helper/Format/PriceFormat";

const DashboardCard = ({
  width,
  amount,
  label,
  chartPrice,
  amountColor,
  chartColor,
}) => {
  return (
    <Card
      sx={{
        width: width,
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#007bff",
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: "23px",
              color: amountColor,
              textTransform: "capitalize",
              marginTop: "8px",
            }}
          >
            € {formatCurrency(parseFloat(amount), "EUR")}
          </Typography>
        </Box>
        {chartPrice && (
          <Box>
            <Gauge
              width={100}
              height={100}
              value={chartPrice}
              outerRadius={50}
              innerRadius={43}
              text={({ value }) => `${value}%`}
              sx={() => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 20,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: chartColor,
                },
              })}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default DashboardCard;
