import React, { useEffect, useState } from "react";
import TextFieldInput from "../../components/TextFieldInput";
import {
  Box,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ModalComponent from "../../components/Modal";
import ButtonComponent from "../../components/Button";
import { useFormik } from "formik";
import useAuthTranslations from "../../helper/validation";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser, userGetById } from "../../middleware/user";
import { STATUS, rolesList } from "../../config/constants";
import { resetUserAddEditRequest } from "../../slices/user.slice";
import { useTranslation } from "react-i18next";
import LocalStorageService from "../../helper/localStorage-services";

export default function AddEditUser(props) {
  const { t } = useTranslation();
  
  const { userValidationAdd, userValidationEdit } = useAuthTranslations();

  const dispatch = useDispatch();
  const { userDetails, userByIdStatus, status, updateStatus, error } =
    useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(
    userDetails?.user?.isActive === 1 ? true : false,
  );

  useEffect(() => {
    if (props.id !== null && props.id !== undefined) {
      dispatch(userGetById(props.id));
    }
  }, [props.id]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeStatus = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
      isActive: checked ? 1 : 0,
    };
    if (userByIdStatus) {
      if (Object.keys(formik.errors).length === 0) {
        dispatch(updateUser(payload, props.id));
      }
    } else {
      dispatch(createUser(payload));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userByIdStatus && userDetails ? userDetails.user.name : "",
      email: userByIdStatus && userDetails ? userDetails.user.email : "",
      role: userByIdStatus && userDetails ? userDetails.user.role : "",
      password: userByIdStatus && userDetails ? userDetails.user.role : "",
    },
    validationSchema: userByIdStatus ? userValidationEdit : userValidationAdd,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (userByIdStatus) {
      setChecked(userDetails?.user.isActive == 1 ? true : false);
      formik.setValues({
        name: userDetails ? userDetails?.user.name : "",
        email: userDetails ? userDetails?.user.email : "",
        role: userDetails ? userDetails?.user.role : "",
        password: userDetails && userDetails?.user.password,
      });
    }
  }, [userByIdStatus]);

  useEffect(() => {
    if (status) {
      formik.resetForm();
      props.setUserId(null);
      setChecked(false);
    }

    if (updateStatus) {
      formik.resetForm();
      props.setUserId(null);
      setChecked(false);
    }
  }, [status, updateStatus]);

  const handleClose = () => {
    props.onClose(true);
    formik.resetForm();
    dispatch(resetUserAddEditRequest());
    props.setUserId(null);
    setChecked(false);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <ModalComponent
          title={props.id ? t("user.editUser") : t("user.newUser")}
          open={props.open}
          onClose={handleClose}
          modalHeaderRight={
            <Box className="modal-header-right">
              <ButtonComponent
                type="submit"
                sx={{
                  color: "white",
                  fontFamily: "roboto-medium",
                  fontWeight: 500,
                }}
                onClick={() => formik.handleSubmit()}
              >
                {t("common.save")}
              </ButtonComponent>
              <ButtonComponent
                sx={{
                  color: "white",
                  fontFamily: "roboto-medium",
                  fontWeight: 500,
                }}
                onClick={() => handleClose()}
              >
                {t("common.cancel")}
              </ButtonComponent>
            </Box>
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box>
                <FormControlLabel
                  value="end"
                  control={
                    <Switch
                      color="primary"
                      checked={checked}
                      onChange={handleChangeStatus}
                    />
                  }
                  label={checked ? STATUS.ACTTIVI : STATUS.INACTTIVI}
                  labelPlacement="end"
                />
              </Box>

              <Box>
                <TextFieldInput
                  sx={{
                    marginTop: "16px",
                    fontFamily: "poppins-regular",
                    width: "700px",
                  }}
                  placeholder={t("common.placeholder.nameSurname")}
                  label={t("user.nameSurname")}
                  fullWidth
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
              <Box>
                <TextFieldInput
                  sx={{
                    marginTop: "16px",
                    fontFamily: "poppins-regular",
                  }}
                  placeholder={t("common.placeholder.email")}
                  label={t("user.email")}
                  fullWidth
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    (formik.touched.email && Boolean(formik.errors.email)) ||
                    (error === "email" && "L'utente esiste già!")
                  }
                  helperText={
                    (formik.touched.email && formik.errors.email) ||
                    (error === "email" && "L'utente esiste già!")
                  }
                />
              </Box>
              <Box>
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
              <Box>
                {props.id === null && (
                  <TextFieldInput
                    fullWidth
                    sx={{
                      marginTop: "16px",
                      fontFamily: "roboto-regular",
                      // width: "700px",
                    }}
                    placeholder={t("common.placeholder.password")}
                    id="password"
                    name="password"
                    label={t("user.password")}
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </ModalComponent>
      </form>
    </Box>
  );
}
