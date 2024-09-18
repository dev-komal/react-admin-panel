import React, { useState } from 'react'
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import TextFieldInput from '../../components/TextFieldInput'
import ButtonComponent from '../../components/Button'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import useAuthTranslations from '../../helper/validation'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import ROUTES_URL from '../../config/routes'
// import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
  // const { t } = useTranslation()
  const navigate = useNavigate()
  const { resetPasswordValidation } = useAuthTranslations()
  const { resetPasswordLoading, resetPasswordError } = useSelector(
    (state) => state.auth,
  )

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (values) => {
    // dispatch(resetPassword(values, navigate))
    navigate(ROUTES_URL.LOGIN)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      verifyForgotCode: '',
      newPassword: '',
    },
    validationSchema: resetPasswordValidation,
    onSubmit: handleSubmit,
  })

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        height: '100%',
        backgroundColor: 'primary.main',
        p: 2, // Add padding for smaller screens
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '400px', // Adjust max width for responsiveness
          p: 2, // Add padding inside the card
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            sx={{
              alignItems: 'center',
              mb: 3,
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'poppins-regular',
                fontSize: { xs: '20px', sm: '24px' }, // Responsive font size
                color: 'secondary.main',
                mt: '24px',
                mb: '12px',
                textAlign: 'center',
              }}
            >
              Reset Password
            </Typography>
            <Typography
              sx={{
                fontFamily: 'poppins-regular',
                fontSize: { xs: '12px', sm: '14px' }, // Responsive font size
                color: '#869295',
                mb: '24px',
                textAlign: 'center',
              }}
            >
              Enter 6 digit code and update your password
            </Typography>
            <Typography sx={{ color: 'red', fontSize: '12px', my: '10px' }}>
              {resetPasswordError}
            </Typography>
            <TextFieldInput
              sx={{
                mb: '24px',
                fontFamily: 'poppins-regular',
                width: '100%',
              }}
              placeholder="123456"
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
                mb: '24px',
                fontFamily: 'poppins-regular',
                width: '100%',
              }}
              placeholder="example@domain.com"
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextFieldInput
              sx={{
                mb: '24px',
                fontFamily: 'roboto-regular',
                width: '100%',
              }}
              placeholder="********"
              id="newPassword"
              name="newPassword"
              label="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              type={showPassword ? 'text' : 'password'}
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
              size="large"
              fullWidth
              sx={{
                padding: '16px',
                fontFamily: 'roboto-medium',
                fontSize: { xs: '14px', sm: '16px' }, // Responsive font size
              }}
            >
              {resetPasswordLoading ? <Loading /> : 'Reset Password'}
            </ButtonComponent>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
export default ResetPassword
