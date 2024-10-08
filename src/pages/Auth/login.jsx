import React, { useEffect } from 'react'
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TextFieldInput from '../../components/TextFieldInput'
import ButtonComponent from '../../components/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../middleware/auth'
import useAuthTranslations from '../../helper/validation'
import { useFormik } from 'formik'
import ROUTES_URL from '../../config/routes'
import { Toastify } from '../../config/toastify'
import { GENERIC_ERROR_MESSAGE, LOGOUT_SUCCESS } from '../../config/constants'
// import { useTranslation } from 'react-i18next'

const Login = () => {
  // const { t } = useTranslation()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { authValidation } = useAuthTranslations()

  const { loginError, logoutMessage, logoutError } = useSelector(
    (state) => state.auth,
  )

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (logoutMessage) {
      Toastify.success(LOGOUT_SUCCESS)
    }
    if (logoutError) {
      Toastify.error(GENERIC_ERROR_MESSAGE)
    }
  }, [logoutMessage, logoutError])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (values) => {
    dispatch(loginUser(values, navigate))
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authValidation,
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
        px: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: '100%', sm: '400px' },
          mx: { xs: 1, sm: 0 },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              px: 3,
              maxWidth: '100%',
            }}
          >
            <Stack sx={{ mb: 3 }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'poppins-regular',
                    fontSize: { xs: '20px', sm: '24px' },
                    color: 'secondary.main',
                    marginTop: '24px',
                    marginBottom: '12px',
                    textAlign: 'center',
                  }}
                >
                  Login
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'poppins-regular',
                    fontSize: { xs: '12px', sm: '14px' },
                    color: 'secondary.main',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}
                >
                  Enter email and password to continue...
                </Typography>
              </Box>
              <Typography sx={{ color: 'red', fontSize: '12px', my: '10px' }}>
                {loginError}
              </Typography>
              <TextFieldInput
                sx={{
                  marginBottom: '24px',
                  fontFamily: 'poppins-regular',
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
                  fontFamily: 'roboto-regular',
                }}
                placeholder="Enter"
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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

              <Typography
                mt={1}
                sx={{
                  fontFamily: 'roboto-regular',
                  fontSize: { xs: '12px', sm: '14px' },
                  lineHeight: '21px',
                  textAlign: 'right',
                  textDecoration: 'underline',
                  color: 'secondary.main',
                }}
              >
                <Link to={ROUTES_URL.FORGOT_PASSWORD}>
                  <span>Forgot Password? </span>
                </Link>
              </Typography>
              <Box sx={{ width: '100%' }}>
                <ButtonComponent
                  type="submit"
                  variant="contained"
                  size="medium"
                  fullWidth
                  sx={{
                    marginTop: '24px',
                    padding: '16px',
                    fontFamily: 'roboto-medium',
                  }}
                >
                  login
                </ButtonComponent>
              </Box>
              <Typography
                mt={1}
                sx={{
                  fontFamily: 'roboto-regular',
                  fontSize: { xs: '12px', sm: '14px' }, // Responsive font size
                  lineHeight: '21px',
                  marginTop: '24px',
                  textAlign: 'center',
                  color: 'secondary.main',
                }}
              >
                Don't have an account?{' '}
                <Link to={ROUTES_URL.SIGNUP}>SIGNUP</Link>
              </Typography>
            </Stack>
          </Box>
        </form>
      </Card>
    </Box>
  )
}
export default Login
