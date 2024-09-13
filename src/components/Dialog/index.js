import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", background: "#fc7540" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{
                ml: 2,
                flex: 1,
                textTransform: "capitalize",
                fontFamily: "roboto-medium",
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              {props.title}
            </Typography>
            {props.modalHeaderRight}
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: "20px" }}>{props.children}</Box>
      </Dialog>
    </React.Fragment>
  );
}
