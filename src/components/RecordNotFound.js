import { Box } from "@mui/material";
import PaperComponent from "./Paper";
import { useTranslation } from "react-i18next";

const RecordNotFound = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <PaperComponent
        style={{
          height: "300px",
          fontSize: "24px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t("common.dataNotFound")}
      </PaperComponent>
    </Box>
  );
};

export default RecordNotFound;
