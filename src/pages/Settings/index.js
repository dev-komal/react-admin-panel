import { Box, Grid } from "@mui/material";
import PasswordUpdate from "./passwordUpdate";
import ProfileImageUpdate from "./profileImageUpdate";
import LocalStorageService from "../../helper/localStorage-services";
import PaperComponent from "../../components/Paper";

function Settings() {
  const userId = LocalStorageService.getLoggedInUserDetails();
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#F7F8FA",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PaperComponent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <ProfileImageUpdate id={userId.id} />
            </Box>
          </PaperComponent>
        </Grid>
        <Grid item xs={6}>
          <PaperComponent>
            <PasswordUpdate id={userId.id} />
          </PaperComponent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;
