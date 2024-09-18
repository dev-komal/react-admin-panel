import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/login'
import Home from './pages/Home'
import ForgotPassword from './pages/Auth/forgotPassword'
import Dashboard from './pages/Dashboard'
import ROUTES_URL from './config/routes'
import ResetPassword from './pages/Auth/resetPassword'
import ProtectedRoute from './helper/protectedRoute'
import PageNotFound from './pages/PageNotFound'
import SignUp from './pages/Auth/signup'
import Products from './pages/Products'
import { useSelector } from 'react-redux'

function App() {

  const { isTheme } = useSelector((state) => state.layout)

  let theme = createTheme({
    palette: {
      mode: isTheme ? "dark" : "light",
      primary: {
        main: '#1b91df',
      },
      secondary: {
        main: '#869295',
        contrastText: 'white',
      },
      grayLight: {
        main: '#E0E0E0',
      },
      black: {
        main: '#231F20',
      },
      highlight: {
        main: '#869295',
      },
      badge1: {
        main: '#86929532',
      },
      badge1Text: '#231F20',
      badge2Text: '#54B435',
      badge3Text: '#EB5353',
      badge2: {
        main: '#54B43516',
      },
      badge3: {
        main: '#EB535316',
      },
      badge4: {
        main: '#D7EDFF',
      },
      badge5: {
        main: '#F0E4F7',
      },
      gray: {
        main: 'rgba(0, 0, 0, 0.23)',
      },
    },
  
    typography: {
      // fontFamily: ['poppins'],
      h3: {
        fontSize: '48px',
        fontWeight: 700,
      },
      h5: {
        fontSize: '34px',
        fontWeight: 600,
      },
      h6: {
        fontSize: '24px',
        fontWeight: 500,
      },
      texth4: {
        fontSize: '30px',
        fontWeight: 700,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* ------------------Un-Authentication Routes-------------- */}
        <Route
          path="/"
          name="Login"
          element={
            // <ProtectedRoute>
              <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.SIGNUP}
          name="Signup"
          element={
            // <ProtectedRoute>
              <SignUp />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.LOGIN}
          name="Login"
          element={
            // <ProtectedRoute>
              <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.FORGOT_PASSWORD}
          name="Forgot Password"
          element={
            // <ProtectedRoute>
              <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_URL.RESET_PASSWORD}
          name="Reset Password"
          element={
            // <ProtectedRoute>
              <ResetPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            // <ProtectedRoute>
              <PageNotFound />
            // </ProtectedRoute>
          }
        />
        {/* -----------------Authentication routes-----------------  */}
        <Route
          name="Home"
          element={
            // <ProtectedRoute>
              <Home />
            // </ProtectedRoute>
          }
        >
          <Route
            path={ROUTES_URL.DASHBOARD}
            name="Dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES_URL.PRODUCT}
            name="products"
            element={
              // <ProtectedRoute>
                <Products />
              // </ProtectedRoute>
            }
          />
        
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
