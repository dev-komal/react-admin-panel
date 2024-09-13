import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES_URL from "../../config/routes";
import { useTranslation } from "react-i18next";

function PageNotFound() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            fontFamily: "roboto-bold",
          }}
        >
          404
        </Typography>
        <Typography sx={{ fontSize: "22px", fontFamily: "roboto-regular" }}>
          {t("common.pageNotFound")}
        </Typography>
        <Typography sx={{ fontSize: "18px", fontFamily: "roboto-regular" }}>
          <Link to={ROUTES_URL.DASHBOARD}> {t("common.goBackToHome")}</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default PageNotFound;
