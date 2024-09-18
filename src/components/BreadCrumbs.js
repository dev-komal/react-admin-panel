import { Box, Breadcrumbs, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import ROUTES_URL from '../config/routes'

function BreadCrumbs() {
  const location = useLocation()
  const pathname = location.pathname.split('/')[2]
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="none"
          to={ROUTES_URL.DASHBOARD}
          style={{
            textDecoration: 'none',
            fontFamily: 'roboto-regular',
          }}
        >
          <Typography
            color="text.primary"
            underline="none">
            Home
          </Typography>
        </Link>
        <Link
          underline="hover"
          href="/material-ui/getting-started/installation/"
          style={{
            textDecoration: 'none',
            fontFamily: 'poppins-regular',
          }}
        >
          <Typography
            color="text.primary">
            Admin
          </Typography>
        </Link>

        <Typography
          color="text.primary"
          sx={{
            textTransform: 'capitalize',
            fontFamily: 'roboto-regular',
          }}
        >
          {pathname.replace(/-/g, ' ')}
        </Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default BreadCrumbs
