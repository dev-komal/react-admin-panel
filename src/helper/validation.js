import { useTranslation } from "react-i18next";
import * as yup from "yup";

const useAuthTranslations = () => {
  const { t } = useTranslation();

  const authValidation = yup.object({
    email: yup
      .string()
      .email(t("authValidation.email"))
      .matches(/@[^.]*\./)
      .required(t("authValidation.required")),
    password: yup.string().required(t("authValidation.password")),
  });

  

  const userValidationAdd = yup.object({
    name: yup.string().required(t("userValidationAdd.name")),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        t("userValidationAdd.email-matches"),
      )
      .required(t("userValidationAdd.email-required")),
    role: yup.string().required(t("userValidationAdd.role")),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        t("userValidationAdd.password-matches"),
      )
      .required(t("userValidationAdd.password-required")),
  });

  const userValidationEdit = yup.object({
    name: yup.string().required(t("userValidationEdit.name")),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        t("userValidationEdit.email-matches"),
      )
      .required(t("userValidationEdit.email-required")),
    role: yup.string().required(t("userValidationEdit.role")),
    password: yup.string().required(t("userValidationEdit.password")),
  });

 

 

  // const forgotPasswordValidation = yup.object({
  //   email: yup
  //     .string()
  //     .email(t("forgotPasswordValidation.email"))
  //     .required(t("forgotPasswordValidation.email-required")),
  // });

  // const resetPasswordValidation = yup.object({
  //   email: yup
  //     .string()
  //     .email(t("resetPasswordValidation.email"))
  //     .required(t("resetPasswordValidation.email-required")),
  //   newPassword: yup
  //     .string()
  //     .required(t("resetPasswordValidation.newPassword")),
  //   verifyForgotCode: yup
  //     .string("")
  //     .required(t("resetPasswordValidation.verifyForgotCode")),
  // });

  // const updatePasswordValidation = yup.object({
  //   current_password: yup
  //     .string()
  //     .required(t("updatePasswordValidation.current-password")),
  //   new_password: yup
  //     .string()
  //     .required(t("updatePasswordValidation.new-password-required"))
  //     .min(5, t("updatePasswordValidation.new-password-min")),
  //   confirm_password: yup
  //     .string()
  //     .oneOf(
  //       [yup.ref("new_password")],
  //       t("updatePasswordValidation.confirm-password"),
  //     ),
  // });

 


  return {
    authValidation,
    userValidationAdd,
    userValidationEdit,
    // forgotPasswordValidation,
    // resetPasswordValidation,
    // updatePasswordValidation,
  };
};

export default useAuthTranslations;
