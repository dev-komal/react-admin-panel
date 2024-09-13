import React, { Fragment, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, DialogTitle, MenuItem } from "@mui/material";
import ButtonComponent from "../../components/Button";
import TextFieldInput from "../../components/TextFieldInput";
import { useFormik } from "formik";
import { rolesList } from "../../config/constants";
import { useDispatch, useSelector } from "react-redux";
import { Toastify } from "../../config/toastify";
import { useTranslation } from "react-i18next";
import {
  getProfileInformation,
  updateProfileInformation,
} from "../../middleware/auth";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ProfileUpdate({ open, setClose, userId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { profileStatus, error } = useSelector((state) => state.auth);
  const { profileDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profileStatus) {
      setClose(true);
      Toastify.success("Il tuo profilo è stato aggiornato!");
      dispatch(getProfileInformation(userId));
    }
    if (error) {
      Toastify.error(error);
    }
  }, [profileStatus, error]);

  const handleClose = () => {
    setClose(false);
  };

  const handleSubmit = (values) => {
    dispatch(updateProfileInformation(values, userId));
  };

  const formik = useFormik({
    initialValues: {
      name: profileDetails
        ? profileDetails?.user && profileDetails?.user?.name
        : "",
      email: profileDetails
        ? profileDetails?.user && profileDetails?.user?.email
        : "",
      role: profileDetails
        ? profileDetails?.user && profileDetails?.user?.role
        : "",
    },
    // validationSchema: userValidation,
    onSubmit: handleSubmit,
  });

  // error is here
  useEffect(() => {
    if (userId && profileDetails?.user) {
      formik.setValues({
        name: profileDetails
          ? profileDetails?.user && profileDetails?.user.name
          : "",
        email: profileDetails
          ? profileDetails?.user && profileDetails?.user.email
          : "",
        role: profileDetails
          ? profileDetails?.user && profileDetails?.user.role
          : "",
      });
    }
  }, [userId, profileDetails?.user]);

  return (
    <Fragment>
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {profileDetails?.user?.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <Box>
              <TextFieldInput
                sx={{
                  marginTop: "16px",
                  fontFamily: "poppins-regular",
                }}
                placeholder={t("common.enterName&Surname")}
                label={t("common.name&Surname")}
                fullWidth
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextFieldInput
                sx={{
                  marginTop: "16px",
                  fontFamily: "poppins-regular",
                }}
                placeholder={t("common.placeholder.email")}
                label="Email"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextFieldInput
                sx={{
                  marginTop: "16px",
                  fontFamily: "poppins-regular",
                }}
                id="outlined-select-currency"
                select
                fullWidth
                name="role"
                value={formik.values.role}
                label={t("common.role")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                {rolesList.map((o, i) => {
                  return (
                    <MenuItem key={i} value={o.value}>
                      <span style={{ fontFamily: "roboto-regular" }}>
                        {o.title}
                      </span>
                    </MenuItem>
                  );
                })}
              </TextFieldInput>
            </Box>
          </DialogContent>
          <DialogActions>
            <ButtonComponent
              autoFocus
              type="submit"
              sx={{
                textTransform: "uppercase",
                color: "white",
                fontFamily: "roboto-bold",
              }}
              color="secondary"
              variant="contained"
            >
              {t("common.save")}
            </ButtonComponent>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Fragment>
  );
}
