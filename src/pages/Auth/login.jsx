import React, { useEffect } from "react";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router";
import TextFieldInput from "../../components/TextFieldInput";
import ButtonComponent from "../../components/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../middleware/auth";
import useAuthTranslations from "../../helper/validation";
import { useFormik } from "formik";
import ROUTES_URL from "../../config/routes";
import { Toastify } from "../../config/toastify";
import { GENERIC_ERROR_MESSAGE, LOGOUT_SUCCESS } from "../../config/constants";
import { useTranslation } from "react-i18next";

const ExLogin = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { authValidation } = useAuthTranslations();

  const { loginError, logoutMessage, logoutError } = useSelector(
    (state) => state.auth,
  );

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (logoutMessage) {
      Toastify.success(LOGOUT_SUCCESS);
    }
    if (logoutError) {
      Toastify.error(GENERIC_ERROR_MESSAGE);
    }
  }, [logoutMessage, logoutError]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    dispatch(loginUser(values, navigate));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box sx={{
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      height: "100%",
      backgroundColor: "primary.main",
    }}>
      <form onSubmit={formik.handleSubmit}>

        <Card sx={{ maxWidth: 400 }}>
          <Box
            sx={{
              flexBasis: "100%",
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
                  sx={{ textAlign: "center", my: "14px" }}
                  variant="h6"
                  style={{ fontFamily: "poppins-bold" }}
                >
                  Login to your account
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "poppins-regular",
                      fontSize: "12px",
                      color: "#869295",
                      marginBottom: "14px",
                      textAlign: "center",
                    }}
                  >
                    Please enter your email and password to continue

                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "red", fontSize: "12px", my: "10px" }}
                >
                  {loginError}
                </Typography>
                <TextFieldInput
                  sx={{
                    marginBottom: "14px",
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
                <Link
                  to={ROUTES_URL.FORGOT_PASSWORD}
                >
                  <Typography
                    mt={1}
                    sx={{
                      fontFamily: "roboto-regular",
                      fontSize: "14px",
                      lineHeight: "21px",
                      textAlign: "right",
                      textDecoration: "underline",
                      color: "secondary.main"
                    }}
                  >

                    Forgot Password
                  </Typography>
                </Link>
                <TextFieldInput
                  sx={{
                    marginBottom: "14px",
                    fontFamily: "roboto-regular",
                  }}
                  placeholder={t("common.placeholder.password")}
                  id="password"
                  name="password"
                  label={t("user.password")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password &&
                    Boolean(formik.errors.password)
                  }
                  helperText={
                    formik.touched.password && formik.errors.password
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
                    size="medium"
                    fullWidth
                    sx={{
                      marginTop: "18px",
                      padding: "12px",
                      fontFamily: "roboto-medium",
                    }}
                  >
                    login
                  </ButtonComponent>

                  <Link
                    to={ROUTES_URL.FORGOT_PASSWORD}
                    sx={{ color: "secondary.main" }}
                  >
                    <Typography
                      mt={1}
                      sx={{
                        fontFamily: "roboto-regular",
                        fontSize: "14px",
                        lineHeight: "21px",
                        textAlign: "right",
                        textDecoration: "underline",
                        color: "secondary.main"
                      }}
                    >
                      Don't have account
                    </Typography>
                  </Link>

                </Box>
              </Stack>
            </Box>
          </Box>
        </Card>

      </form>
    </Box>
  );
};
export default ExLogin;
