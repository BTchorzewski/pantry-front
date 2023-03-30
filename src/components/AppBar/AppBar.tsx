import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import { Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const pages = ['Home', 'Pantries'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // @ts-ignore
  return (
    <AppBar position='static'>
      <Grid
        container
        maxWidth='xl'
        sx={{ padding: '20px' }}
        justifyContent={'space-between'}
      >
        <Grid item lg={4} sx={{ backgroundColor: 'green' }}>
          <p>pierwszy element</p>
        </Grid>
        <Grid item lg={4} sx={{ backgroundColor: 'yellow' }}>
          <p>drugi element</p>
        </Grid>
      </Grid>
    </AppBar>
  );
}
export default ResponsiveAppBar;
