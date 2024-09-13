import { Box, Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 2,
        py: 3,
        backgroundColor: "#F7F8FA",
        fontFamily: "poppins-semi-bold",
      }}
    >
      <Typography variant="h5" style={{ textTransform: "capitalize" }}>
        {title}
      </Typography>
    </Box>
  );
};

export const H2Title = (props) => {
  return (
    <Typography
      sx={{
        fontSize: "24px",
        fontFamily: "roboto-bold",
        fontWeight: 700,
        textTransform: "capitalize",
        ...props,
      }}
    >
      {props.title}
    </Typography>
  );
};

export default Title;
