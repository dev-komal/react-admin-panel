import { Box, Card, CardContent, Typography } from "@mui/material";
import { Euro } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export const PriceCard = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: `${props.bgColor}`,
        color: "#fff",
        borderRadius: "16px",
        height: "168px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: `${props.iconBgColor}`,
              padding: "6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              marginRight: 1,
            }}
          >
            <Euro />
          </Box>
          <Typography
            component="div"
            variant="h6"
            sx={{ fontFamily: "poppins-medium" }}
          >
            {props.title}
          </Typography>
        </CardContent>
        <Typography
          variant="texth4"
          sx={{
            padding: "8px 16px 8px 16px",
            lineHeight: "37px",
            fontFamily: "poppins-bold",
          }}
        >
          {props.price}
        </Typography>
        <Typography
          sx={{
            padding: "0px 16px 0px 24px",
            lineHeight: "37px",
            fontFamily: "roboto-medium",
          }}
        >
          + {props.percentage}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        ></Box>
      </Box>
    </Card>
  );
};

const options = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    autoPadding: false,
  },
  plugins: {
    tooltip: {
      titleFont: {
        size: 12,
      },
      bodyFont: {
        size: 12,
      },
    },
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        boxWidth: 10,
        boxHeight: 5,
        padding: 2,
      },
    },
  },
};

export const ChartCard = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.title,
        data: props.data,
        backgroundColor: props.bgColor,
        hoverOffset: 4,
      },
    ],
  };
  return (
    <Card sx={{ borderRadius: "16px", height: "168px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", paddingBottom: "8px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="div"
              sx={{ color: "#828282", fontFamily: "roboto-medium" }}
            >
              {props.title}
            </Typography>
            <InfoIcon sx={{ fontSize: "22px", color: "#bdbdbd" }} />
          </Box>
        </CardContent>
        <Box sx={{ border: "1px solid #ECECEC" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "top",
            marginTop: "-20px",
          }}
        >
          <div>
            <Doughnut data={data} options={options} width={170} height={170} />
          </div>
        </div>
      </Box>
    </Card>
  );
};
