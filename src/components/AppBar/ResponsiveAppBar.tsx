import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { authSelector, logout } from '../../redux/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

interface INavigationItem {
  name: string;
  path: string;
  visibility: 'all' | 'private';
}

const drawerWidth = 240;
const navItems: INavigationItem[] = [
  { name: 'Home', path: '/', visibility: 'all' },
  { name: 'Pantries', path: '/pantries', visibility: 'private' },
  { name: 'Login', path: '/login', visibility: 'all' },
  { name: 'logout', path: '/', visibility: 'private' },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const {
    auth: { isAuth },
  } = useSelector(authSelector);

  const listItemCreator = ({ visibility, path, name }: INavigationItem) => {
    if (!isAuth && visibility === 'all') {
      return (
        <ListItem key={name} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to={path}>
              {name}
            </Link>
          </ListItemButton>
        </ListItem>
      );
    }

    if (isAuth && visibility === 'private' && name === 'logout') {
      return (
        <ListItem key={name} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to={path}
              onClick={async (event: React.MouseEvent) => {
                // @ts-ignore
                dispatch(logout());
              }}
            >
              {name}
            </Link>
          </ListItemButton>
        </ListItem>
      );
    }
    if (isAuth && visibility === 'private') {
      return (
        <ListItem key={name} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to={path}>
              {name}
            </Link>
          </ListItemButton>
        </ListItem>
      );
    }
  };

  const linkCreator = ({ visibility, path, name }: INavigationItem) => {
    if (!isAuth && visibility === 'all') {
      return (
        <Link
          key={name}
          sx={{ color: '#fff' }}
          component={RouterLink}
          to={path}
          mr={2}
          fontSize='1.4rem'
        >
          {name}
        </Link>
      );
    }
    if (!isAuth && visibility === 'all') {
      return (
        <Link
          key={name}
          sx={{ color: '#fff' }}
          component={RouterLink}
          to={path}
          mr={2}
          fontSize='1.4rem'
        >
          {name}
        </Link>
      );
    }
    if (isAuth && visibility === 'private' && name === 'logout') {
      return (
        <Link
          key={name}
          sx={{ color: '#fff' }}
          component={RouterLink}
          to={path}
          mr={2}
          fontSize='1.4rem'
          onClick={async (event: React.MouseEvent) => {
            // @ts-ignore
            await dispatch(logout());
          }}
        >
          {name}
        </Link>
      );
    }
    if (isAuth && visibility === 'private') {
      return (
        <Link
          key={name}
          sx={{ color: '#fff' }}
          component={RouterLink}
          to={path}
          mr={2}
          fontSize='1.4rem'
        >
          {name}
        </Link>
      );
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // @ts-ignore
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', color: 'primary.main' }}
    >
      <Typography variant='h6' sx={{ my: 2 }}>
        The PantryApp
      </Typography>
      <Divider />
      <List>{navItems.map((item) => listItemCreator(item))}</List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'block', sm: 'block' },
              textAlign: {
                xs: 'center',
                sm: 'left',
                md: 'left',
              },
            }}
          >
            The PantryApp
          </Typography>
          <List
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
                md: 'block',
              },
            }}
          >
            {navItems.map((item) => {
              return linkCreator(item);
            })}
          </List>
        </Toolbar>
      </AppBar>

      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
