import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import TextFieldInput from '../../components/TextFieldInput'
import ButtonComponent from '../../components/Button'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import useAuthTranslations from '../../helper/validation'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
// import { useTranslation } from 'react-i18next'
import ROUTES_URL from '../../config/routes'

const ForgotPassword = () => {
  // const { t } = useTranslation()
  const navigate = useNavigate()
  const { forgotPasswordValidation } = useAuthTranslations()
  const { forgotPasswordLoading, forgotPasswordError } = useSelector(
    (state) => state.auth,
  )

  const handleSubmit = (values) => {
    navigate(ROUTES_URL.RESET_PASSWORD)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidation,
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
        sx={{ width: { xs: '90%', sm: '80%', md: '400px' }, maxWidth: '600px' }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 2,
              py: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'poppins-regular',
                fontSize: { xs: '20px', sm: '24px' },
                color: 'secondary.main',
                mb: '12px',
                textAlign: 'center',
              }}
            >
              Forgot Password
            </Typography>

            <Typography
              sx={{
                my: 3,
                fontFamily: 'poppins-regular',
                fontSize: { xs: '12px', sm: '13px' },
                color: '#869295',
                textAlign: 'center',
              }}
            >
              Enter your email for the verification process. We will send the
              6-digit code to your email.
            </Typography>
            <Typography sx={{ color: 'red', fontSize: '12px', my: '10px' }}>
              {forgotPasswordError}
            </Typography>
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

            <ButtonComponent
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                padding: '16px',
                fontFamily: 'roboto-medium',
              }}
            >
              {forgotPasswordLoading ? <Loading /> : 'Forgot Password'}
            </ButtonComponent>
          </Box>
        </form>
      </Card>
    </Box>
  )
}
export default ForgotPassword
