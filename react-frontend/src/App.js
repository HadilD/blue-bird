import * as React from 'react';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { setAllUsers, setLoginStatus, setUserRole } from './redux/slice/user'
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import About from './pages/about'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Admin from './pages/admin'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChatScreen from './pages/ChatScreen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Constants } from './constants/api';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Login from './pages/Login'
import MailIcon from '@mui/icons-material/Mail';
import MuiAppBar from '@mui/material/AppBar';
import MyAds from './pages/myAds';
import MyOrders from './pages/myOrders';
import Profile from './pages/profile';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VerticalPrototype from './pages/verticalPrototype';
import { generalStyles } from './generalStyles';
import jwt_decode from "jwt-decode";
import { logoutUser } from './services/auth';
import { setUploadModal } from './redux/slice/uploadModal';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const pageName = useSelector(state => state.pageName.pageName)
  const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const userRole = useSelector(state => state.user.userRole)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  React.useEffect(() => {
    let accessToken = localStorage.getItem(Constants.STORAGE_ITEM_ACCESS_TOKEN)
    let userRole = localStorage.getItem(Constants.STORAGE_ITEM_USER_ROLE)
    if (accessToken) {
      let decoded = jwt_decode(accessToken);
      dispatch(setAllUsers({id: decoded.user_id, email: decoded.email, first_name: '', last_name: ''}))
      dispatch(setLoginStatus(true))
      dispatch(setUserRole(userRole))
    }
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log({width: window.innerWidth})
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: generalStyles.primaryColor }} position="fixed" open={open}>
        {
          isUserLoggedIn &&
          <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
               { !(window.innerWidth < 600) && <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h6" noWrap component="div" sx={{ marginTop: '3%' }}>
                  {pageName}
                </Typography>
                </div>
            }
            <Typography onClick={() => navigate('/')} style={{ cursor: "pointer", fontSize: (window.innerWidth < 600) ? '1.125rem' : '2.125rem' }} noWrap component="div">Blue Bird</Typography>
            {
              userRole === 'admin'
                ?
                <Button variant="raised" component="span" onClick={() => logoutUser()}>Logout</Button>
                :
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', minWidth: '13%' }}>
                  <Button
                    onClick={() => dispatch(setUploadModal(true))}
                    sx={{
                      textTransform: "none",
                      fontFamily: "Open Sans",
                      paddingRight: '2%',
                      color: 'white',
                      fontWeight: '600',
                      margin: 0,
                      fontSize: '1rem'
                    }}
                    style={{width: '130px'}}
                  >
                    Upload Media
                  </Button>
                  <IconButton
                    aria-label="profile"
                    onClick={() => navigate('/profile')}
                  >
                    <AccountCircleOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
                  </IconButton>
                </div>
            }

          </Toolbar>}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Chat'].map((text, index) => (
            <ListItem key={text} disablePadding onClick={() => { if (text === 'Chat') navigate('/chat') }}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path='/myads' element={<MyAds />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/chat' element={isUserLoggedIn ? <ChatScreen /> : <Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={
            isUserLoggedIn
              ? userRole === 'admin'
                ? <Admin />
                : <VerticalPrototype />
              : <Login />} />
        </Routes>
      </Main>
    </Box >
  );
}