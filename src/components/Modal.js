import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComponent from "./Button";
import PaperComponent from "./Paper";
import { H2Title } from "./Title";
import { useTranslation } from "react-i18next";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ModalComponent = (props) => {
  const modalStyle = {
    position: "absolute",
    width: "100%",
    height: props?.height ? props.height : "auto",
    boxShadow: 24,
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ margin: "20px" }}
    >
      <Box
        sx={{
          ...modalStyle,
          minWidth: props.minWidth,
          maxWidth: "100%",
          width: "auto",
          // marginTop: "-16px",
          borderRadius: "10px",
        }}
      >
        <Box className="modal-header">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ButtonComponent onClick={props.onClose}>
                  <CloseIcon sx={{ color: "white" }} />
                </ButtonComponent>
                <div
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "roboto-medium",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  {props.title}
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              {props.modalHeaderRight}
            </Grid>
          </Grid>
        </Box>
        <Box className="modal-children">{props.children}</Box>
      </Box>
    </Modal>
  );
};

export const SubModalComponent = (props) => {
  const handleCloseModal = () => {
    props.close(false);
  };

  return (
    <Modal
      open={props.open}
      close={() => handleCloseModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: "scroll" }}
    >
      <Box
        sx={{
          ...style,
          width: "auto",
          marginTop: "-16px",
          maxHeight: "100%",
        }}
      >
        <PaperComponent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <H2Title title={props.title} />
            <ButtonComponent onClick={() => handleCloseModal()}>
              <CloseIcon />
            </ButtonComponent>
          </Box>
          <Divider sx={{ marginTop: "24px" }} />
          <Box sx={{ overflowY: "auto", maxHeight: "700px" }}>
            {props.children}
          </Box>
        </PaperComponent>
      </Box>
    </Modal>
  );
};

export const DeleteModal = (props) => {
  const { t } = useTranslation();

  const handleYesDelete = () => {
    props.handleDelete();
  };
  return (
    <Modal
      open={props.open}
      onClose={() => props.close(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PaperComponent>
          <Typography style={{ fontSize: "24px", textAlign: "center" }}>
            {t("common.deleteConfirmMsg")}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <ButtonComponent
              variant="contained"
              color="secondary"
              style={{ color: "white", fontWeight: 700 }}
              onClick={() => props.close(false)}
            >
              {t("common.close")}
            </ButtonComponent>
            <ButtonComponent
              variant="contained"
              color="secondary"
              style={{ color: "white", fontWeight: 700 }}
              onClick={() => handleYesDelete()}
            >
              {t("common.yesDelete")}
            </ButtonComponent>
          </Box>
        </PaperComponent>
      </Box>
    </Modal>
  );
};

export const CustomModel = (props) => {
  const handleYes = () => {
    props.handleYes();
  };
  return (
    <Modal
      open={props.open}
      // onClose={() => props.close(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PaperComponent>
          <Typography style={{ fontSize: "24px", textAlign: "center" }}>
            {props.message}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {props.closeTitle && (
              <ButtonComponent
                variant="contained"
                color="secondary"
                style={{ color: "white", fontWeight: 700 }}
                onClick={() => props.close(false)}
              >
                {props.closeTitle}
              </ButtonComponent>
            )}
            <ButtonComponent
              variant="contained"
              color="secondary"
              style={{ color: "white", fontWeight: 700 }}
              onClick={() => handleYes()}
            >
              {props.yesTitle}
            </ButtonComponent>
          </Box>
        </PaperComponent>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
