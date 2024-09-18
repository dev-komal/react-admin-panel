import { Box, Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 2,
        py: 3,
        // backgroundColor: "#F7F8FA",
      }}
    >
      <Typography variant="h5" sx={{ textTransform: "capitalize",   fontFamily: "poppins-semi-bold", }}>
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
