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
          underline="hover"
          color="inherit"
          to={ROUTES_URL.DASHBOARD}
          style={{
            textDecoration: 'none',
            color: '#00000080',
            fontFamily: 'roboto-regular',
          }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          style={{
            textDecoration: 'none',
            color: '#00000080',
            fontFamily: 'poppins-regular',
          }}
        >
          Amministrazione
        </Link>

        <Typography
          color="text.primary"
          style={{
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
