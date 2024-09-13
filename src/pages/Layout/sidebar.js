import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Avatar, Menu, MenuItem } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Logout } from '@mui/icons-material'
import Settings from '@mui/icons-material/Settings'
import { useState, useEffect } from 'react'
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import MenuList from './menu'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarWidth } from '../../slices/layout.slice'
import LocalStorageService from '../../helper/localStorage-services'
import { getProfileInformation, logoutLoggedUser } from '../../middleware/auth'
import { Toastify } from '../../config/toastify'
import ProfileUpdate from '../Profile'
import ROUTES_URL from '../../config/routes'
import { LOGIN_SUCCESS, roles } from '../../config/constants'
const imagePath = process.env.REACT_APP_IMAGE_URL
const drawerWidth = 320

export const roleMappings = {
  SuperAdministrator: { value: roles.SUPER_ADMIN },
  Administrator: { value: roles.ADMIN },
  User: { value: roles.USER },
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

function SideBar() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [path, setPath] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loginMessage, profileDetails } = useSelector((state) => state.auth)
  const userId = LocalStorageService.getLoggedInUserDetails()
  const user = profileDetails?.user
  const { t } = useTranslation()

  const { defaultActiveTab } = MenuList()

  useEffect(() => {
    if (userId?.id === undefined || userId?.id === null) {
      navigate(ROUTES_URL.LOGIN)
    } else {
      dispatch(getProfileInformation(userId?.id))
    }
    if (loginMessage) {
      Toastify.success(LOGIN_SUCCESS)
    }
  }, [loginMessage])

  useEffect(() => {
    if (open) {
      dispatch(sidebarWidth({ width: 200 }))
    } else {
      dispatch(sidebarWidth({ width: 0 }))
    }
  }, [open])
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSetting = () => {
    setAnchorEl(null)
    navigate(ROUTES_URL.SETTINGS)
  }

  const handleLogout = () => {
    dispatch(logoutLoggedUser(navigate))
  }

  const [isProfile, setIsProfile] = useState(false)
  const handleMyAccount = () => {
    setIsProfile(true)
  }

  const handleItemClick = (path) => {
    setPath(path)
  }

  useEffect(() => {
    setPath(location.pathname)
  }, [location, path])

  return (
    <Box>
      <ProfileUpdate
        userId={userId?.id}
        open={isProfile}
        setClose={() => setIsProfile(false)}
      />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            background: '#F7F8FA',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                display: open ? 'none' : '',
              }}
            >
              <MenuIcon sx={{ color: 'primary.main' }} />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <BreadCrumbs />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{ backgroundColor: '#231F2012', padding: '8px' }}
                >
                  <EmailIcon fontSize="inherit" sx={{ fontSize: '22px' }} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{
                    backgroundColor: '#231F2012',
                    padding: '8px',
                    marginLeft: '12px',
                  }}
                >
                  <NotificationsIcon
                    fontSize="inherit"
                    sx={{ fontSize: '22px' }}
                  />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    onClick={handleClick}
                    sx={{
                      width: 36,
                      height: 36,
                      marginLeft: '12px',
                      cursor: 'pointer',
                    }}
                    alt={user?.name}
                    src={
                      user?.profilePicture && imagePath + user?.profilePicture
                    }
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      ml: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'primary.main',
                        lineHeight: 1,
                        fontFamily: 'roboto-bold',
                      }}
                    >
                      {user?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        color: '#869295',
                        fontFamily: 'roboto-regular',
                      }}
                    >
                      {/* {user?.role} */}
                      {user?.role && roleMappings[user?.role]?.value}
                    </Typography>
                  </Box>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar
                      src={
                        user?.profilePicture && imagePath + user?.profilePicture
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          fontSize: '14px',
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        {user?.name}
                      </Box>
                      <Box sx={{ fontSize: '12px', lineHeight: 1.2 }}>
                        {user?.role && roleMappings[user?.role]?.value}
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleMyAccount}>
                    <Avatar /> {t('common.myAccount')}
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={handleSetting}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    {t('common.setting')}
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('common.logout')}
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: open ? '' : 'none',
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.3em',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c4c4c4',
                borderRadius: '16px',
              },
            }}
          >
            <DrawerHeader>
             
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <Box
              sx={{
                justifyContent: 'center',
                mt: 0,
                display: open ? '' : 'none',
              }}
            >
              <Box>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: 'auto',
                    mt: 4,
                    display: open ? '' : 'none',
                  }}
                  alt={user?.name}
                  src={user?.profilePicture && imagePath + user?.profilePicture}
                />

                <Typography
                  sx={{
                    fontSize: '20px',
                    fontFamily: 'roboto-medium',
                    fontWeight: 500,
                    color: 'primary.main',
                    textAlign: 'center',
                    mt: 1,
                    mb: 3,
                    opacity: open ? 1 : 0,
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                pl: 2,
                color: 'highlight.main',
                display: open ? '' : 'none',
                fontFamily: 'poppins-regular',
              }}
            >
              Amministrazione
            </Typography>
            <List sx={{ padding: open ? '16px' : '4px' }}>
              {defaultActiveTab.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  style={{ textDecoration: 'none', color: '#000000DE' }}
                >
                  <ListItem
                    disablePadding
                    sx={{
                      display: 'block',
                      backgroundColor:
                        path === item.path ? 'primary.main' : 'transparent',
                      color: path === item.path ? '#fff' : '',
                      borderRadius: 2,
                    }}
                  >
                    <ListItemButton
                      selected={path === item.path}
                      onClick={() => handleItemClick(item.path)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: path === item.path ? '#fff' : '',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <Typography
                        sx={{
                          opacity: open ? 1 : 0,
                          textTransform: 'capitalize',
                          fontFamily: 'poppins-regular',
                        }}
                      >
                        {item.label}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 3,
            height: 'calc(100vh - 24px)',
            background: '#F7F8FA',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
