import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldInput from "../../components/TextFieldInput";
import ButtonComponent from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../middleware/auth";
import { useFormik } from "formik";
import useAuthTranslations from "../../helper/validation";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { resetPasswordValidation } = useAuthTranslations();
  const { resetPasswordLoading, resetPasswordError } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    dispatch(resetPassword(values, navigate));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      verifyForgotCode: "",
      newPassword: "",
    },
    // validationSchema: resetPasswordValidation,
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
                      sx={{ color: "red", fontSize: "12px", my: "10px" }}
                    >
                      {resetPasswordError}
                    </Typography>
                    <TextFieldInput
                      sx={{
                        marginBottom: "24px",
                        fontFamily: "poppins-regular",
                      }}
                      placeholder={t("common.placeholder.OTP")}
                      id="verifyForgotCode"
                      name="verifyForgotCode"
                      label="OTP"
                      value={formik.values.verifyForgotCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.verifyForgotCode &&
                        Boolean(formik.errors.verifyForgotCode)
                      }
                      helperText={
                        formik.touched.verifyForgotCode &&
                        formik.errors.verifyForgotCode
                      }
                    />

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

                    <TextFieldInput
                      sx={{
                        marginBottom: "24px",
                        fontFamily: "roboto-regular",
                      }}
                      placeholder={t("common.placeholder.password")}
                      id="newPassword"
                      name="newPassword"
                      label="New Password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                      helperText={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
                        {resetPasswordLoading ? (
                          <Loading />
                        ) : (
                          t("common.resetPassword")
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
export default ResetPassword;
