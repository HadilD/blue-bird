import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Login from './pages/Login'
import About from './pages/about'
import Admin from './pages/admin'
import { useDispatch, useSelector } from 'react-redux';
import { generalStyles } from './generalStyles';
import { Routes, Route, useNavigate } from 'react-router-dom'
import VerticalPrototype from './pages/verticalPrototype';
import { setUploadModal } from './redux/slice/uploadModal';
import MyAds from './pages/myAds';
import { Constants } from './constants/api';
import { logoutUser } from './services/auth';
import { setLoginStatus, setUserRole } from './redux/slice/user'
import ChatScreen from './pages/ChatScreen';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from './pages/home';
import Profile from './pages/profile';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: generalStyles.primaryColor }} position="fixed" open={open}>
        {
          isUserLoggedIn &&
          <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{marginTop: '3%'}}>
              {pageName}
            </Typography>
          </div>
          <Typography variant="h4" noWrap component="div">Blue Bird</Typography>
          {
            userRole === 'admin'
            ?
              <Button variant="raised" component="span" onClick={() => logoutUser()}>Logout</Button>
            :
              <div style={{width: '12%', display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                {
                  pageName === 'Home'
                  ?
                    <Button variant="raised" component="span" onClick={() => dispatch(setUploadModal(true))}>Upload</Button>
                  :
                    <Button variant="raised" component="span"></Button>
                }
                
                <IconButton 
                  aria-label="profile"
                  onClick={() => navigate('/profile')} 
                >
                  <AccountCircleOutlinedIcon fontSize="large" sx={{color: 'white'}}/>
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
          <Route path='/chat' element={isUserLoggedIn ? <ChatScreen /> : <Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={
            isUserLoggedIn 
            ? userRole === 'admin'
              ?   <Admin />
              :  <VerticalPrototype />
            : <Login />} />
        </Routes>
      </Main>
    </Box >
  );
}