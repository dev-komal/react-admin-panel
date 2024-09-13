import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import TextFieldInput from "../../components/TextFieldInput";
import ButtonComponent from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../middleware/auth";
import { useFormik } from "formik";
import useAuthTranslations from "../../helper/validation";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { forgotPasswordValidation } = useAuthTranslations();
  const { forgotPasswordLoading, forgotPasswordError } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = (values) => {
    dispatch(forgotPassword(values, navigate));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // validationSchema: forgotPasswordValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Grid container>
            
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Box
                sx={{
                  flexBasis: "70%",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    maxWidth: 600,
                  }}
                >
                  <Stack sx={{ mb: 3 }}>
                   

                    <Typography
                      sx={{ textAlign: "center", marginBottom: "24px" }}
                      variant="h3"
                      style={{ fontFamily: "poppins-bold" }}
                    >
                      {t("auth.forgotPassword")}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "poppins-regular",
                          fontSize: "14px",
                          color: "#869295",
                          marginBottom: "64px",
                          textAlign: "center",
                        }}
                      >
                        {t("auth.preservando")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        my: 3,
                        fontFamily: "poppins-regular",
                        fontSize: "13px",
                        color: "#869295",
                      }}
                    >
                      {t("auth.emailVerification")}
                    </Typography>
                    <Typography
                      sx={{ color: "red", fontSize: "12px", my: "10px" }}
                    >
                      {forgotPasswordError}
                    </Typography>
                    <TextFieldInput
                      sx={{
                        marginBottom: "24px",
                        fontFamily: "poppins-regular",
                      }}
                      placeholder={t("common.placeholder.email")}
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />

                    <Box sx={{ width: "100%" }}>
                      <ButtonComponent
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          marginTop: "48px",
                          padding: "16px",
                          fontFamily: "roboto-medium",
                        }}
                      >
                        {forgotPasswordLoading ? (
                          <Loading />
                        ) : (
                          t("auth.forgotPassword")
                        )}
                      </ButtonComponent>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </form>
    </Box>
  );
};
export default ForgotPassword;
