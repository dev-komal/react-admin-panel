import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextFieldInput from "../../components/TextFieldInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useFormik } from "formik";
import ButtonComponent from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateLoggedUserPassword } from "../../middleware/auth";
import useAuthTranslations from "../../helper/validation";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

function PasswordUpdate({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updatePasswordValidation } = useAuthTranslations();
  const { passwordError, updatePasswordLoading } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    const payload = {
      current_password: values.current_password,
      new_password: values.new_password,
    };
    dispatch(updateLoggedUserPassword(payload, id, navigate));
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: handleSubmit,
  });

  return (
    <Box sx={{ my: "16px" }}>
      <Typography
        sx={{ fontSize: "24px", fontFamily: "roboto-bold", my: "20px" }}
      >
        Profile Image Update
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextFieldInput
          sx={{
            marginBottom: "24px",
            fontFamily: "roboto-regular",
          }}
          fullWidth
          type="password"
          placeholder={t("common.enterCurrentPassword")}
          id="current_password"
          name="current_password"
          label={t("common.currentPassword")}
          value={formik.values.current_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            (formik.touched.current_password &&
              Boolean(formik.errors.current_password)) ||
            Boolean(passwordError)
          }
          helperText={
            (formik.touched.current_password &&
              formik.errors.current_password) ||
            passwordError
          }
        />

        <TextFieldInput
          sx={{
            marginBottom: "24px",
            fontFamily: "roboto-regular",
          }}
          fullWidth
          placeholder={t("common.placeholder.password")}
          id="new_password"
          name="new_password"
          label={t("user.password")}
          value={formik.values.new_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.new_password && Boolean(formik.errors.new_password)
          }
          helperText={formik.touched.new_password && formik.errors.new_password}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextFieldInput
          sx={{
            marginBottom: "24px",
            fontFamily: "roboto-regular",
          }}
          fullWidth
          placeholder={t("common.enterConfirmPassword")}
          id="confirm_password"
          name="confirm_password"
          label={t("common.confirmPassword")}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ButtonComponent
          type="submit"
          variant="contained"
          color="secondary"
          // onClick={handleUploadProfile}
          sx={{ color: "white", my: "20px" }}
        >
          {updatePasswordLoading ? <Loading /> : t("common.update")}
        </ButtonComponent>
      </form>
    </Box>
  );
}

export default PasswordUpdate;
